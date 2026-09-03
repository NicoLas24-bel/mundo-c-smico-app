import { useState, useEffect, useCallback } from 'react';
import { levels } from '../../game/data/levels';

interface LevelObject {
  id: string;
  word: string;
  translation: string;
  top: number;
  left: number;
  width: number;
  height: number;
}

interface HangmanState {
  word: string;
  translation: string;
  image: any;
  guessedLetters: Set<string>;
  mistakes: number;
  maxMistakes: number;
  status: 'playing' | 'won' | 'lost';
}

export function useHangmanGame() {
  const [gameState, setGameState] = useState<HangmanState | null>(null);

  const startNewGame = useCallback(() => {
    // Escoger un nivel aleatorio
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];
    // Escoger un objeto aleatorio dentro del nivel
    const randomObject = randomLevel.objects[Math.floor(Math.random() * randomLevel.objects.length)];

    setGameState({
      word: randomObject.word.toUpperCase(),
      translation: randomObject.translation.toUpperCase(),
      image: randomLevel.image, // Se podría mostrar la imagen entera como pista de contexto
      guessedLetters: new Set<string>(),
      mistakes: 0,
      maxMistakes: 6,
      status: 'playing',
    });
  }, []);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const resetCurrentGame = useCallback(() => {
    setGameState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        guessedLetters: new Set<string>(),
        mistakes: 0,
        status: 'playing',
      };
    });
  }, []);

  const guessLetter = useCallback((letter: string) => {
    if (!gameState || gameState.status !== 'playing') return;

    const upperLetter = letter.toUpperCase();

    // Si ya la intentó, no hacer nada
    if (gameState.guessedLetters.has(upperLetter)) return;

    setGameState((prev) => {
      if (!prev) return prev;

      const newGuessedLetters = new Set(prev.guessedLetters);
      newGuessedLetters.add(upperLetter);

      const isCorrect = prev.word.includes(upperLetter);
      const newMistakes = isCorrect ? prev.mistakes : prev.mistakes + 1;

      // Check win condition
      const isWon = prev.word.split('').every((char) => char === ' ' || newGuessedLetters.has(char));
      const isLost = newMistakes >= prev.maxMistakes;

      let newStatus = prev.status;
      if (isWon) newStatus = 'won';
      else if (isLost) newStatus = 'lost';

      return {
        ...prev,
        guessedLetters: newGuessedLetters,
        mistakes: newMistakes,
        status: newStatus,
      };
    });
  }, [gameState]);

  return {
    gameState,
    guessLetter,
    startNewGame,
    resetCurrentGame,
  };
}

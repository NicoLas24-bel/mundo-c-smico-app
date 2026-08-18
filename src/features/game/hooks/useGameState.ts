import { useState, useEffect, useCallback } from 'react';
import { levels } from '../data/levels';
import { saveProgress, loadProgress, clearProgress } from '../utils/storage';
import { useSound } from './useSound';

export const useGameState = () => {
  const { playSelectCorrect, playLevelComplete, playError, playGameOver, playWin } = useSound();

  const [currentLevelIndex, setCurrentLevelIndex] = useState(() => {
    const saved = loadProgress();
    return saved?.currentLevelIndex ?? 0;
  });

  const [errors, setErrors] = useState(() => {
    const saved = loadProgress();
    return saved?.errors ?? 0;
  });

  const [foundObjects, setFoundObjects] = useState<string[]>(() => {
    const saved = loadProgress();
    return saved?.foundObjects ?? [];
  });

  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  // Auto-dismiss feedback after a few seconds
  useEffect(() => {
    if (!feedback.message) return;
    const timer = setTimeout(() => {
      setFeedback({ message: '', type: '' });
    }, 2500);
    return () => clearTimeout(timer);
  }, [feedback.message]);

  // Timer and Play state
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentLevel = levels[currentLevelIndex];

  // Derived state to avoid effect
  const isLevelComplete = currentLevel && foundObjects.length === currentLevel.objects.length;
  const isGameComplete = isLevelComplete && currentLevelIndex === levels.length - 1;

  // Save state on change
  useEffect(() => {
    saveProgress({
      currentLevelIndex,
      errors,
      foundObjects,
    });
  }, [currentLevelIndex, errors, foundObjects]);

  const restartLevel = useCallback(() => {
    setErrors(0);
    setFoundObjects([]);
    setSelectedWord(null);
    setTimeLeft(60);
  }, []);

  // Timer logic
  useEffect(() => {
    if (!isPlaying || isLevelComplete || isGameComplete || isGameOver) return;

    if (timeLeft <= 0) {
      // Time's up: Game Over
      playGameOver();
      clearProgress();
      setIsGameOver(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isPlaying, isLevelComplete, isGameComplete, isGameOver, errors, restartLevel, playGameOver]);

  const startGame = () => {
    setIsPlaying(true);
  };

  const handleWordSelect = (wordId: string) => {
    if (isLevelComplete || isGameComplete) return;
    if (foundObjects.includes(wordId)) return;
    setSelectedWord(wordId);
    setFeedback({ message: '', type: '' });
  };

  const handleObjectSelect = (objectId: string) => {
    if (isLevelComplete || isGameComplete) return;
    if (!selectedWord) {
      setFeedback({ message: 'Select a word first!', type: 'info' });
      return;
    }

    if (foundObjects.includes(objectId)) return;

    if (selectedWord === objectId) {
      // Correct!
      const nextFound = [...foundObjects, objectId];
      setFoundObjects(nextFound);

      if (nextFound.length === currentLevel.objects.length) {
        // Last object of the LAST level → game complete (You Win)
        if (currentLevelIndex === levels.length - 1) {
          playWin();
        } else {
          playLevelComplete();
        }
        setFeedback({ message: '', type: '' });
        setSelectedWord(null);
      } else {
        playSelectCorrect();
        setFeedback({ message: 'Correct!', type: 'success' });
        setSelectedWord(null);
      }
    } else {
      // Incorrect!
      playError();
      const newErrors = errors + 1;
      setErrors(newErrors);
      setFeedback({ message: '¡Inténtalo de nuevo!', type: 'error' });

      if (newErrors >= 3) {
        playGameOver();
        clearProgress();
        setIsGameOver(true);
      }
    }
  };

  const nextLevel = () => {
    if (currentLevelIndex < levels.length - 1) {
      setCurrentLevelIndex((prev: number) => prev + 1);
      setErrors(0);
      setFoundObjects([]);
      setSelectedWord(null);
      setFeedback({ message: '', type: '' });
      setTimeLeft(60); // Reset timer for next level
    }
  };

  const restartGame = () => {
    clearProgress();
    setCurrentLevelIndex(0);
    setErrors(0);
    setFoundObjects([]);
    setSelectedWord(null);
    setFeedback({ message: '', type: '' });
    setTimeLeft(60);
    setIsPlaying(false);
    setIsGameOver(false);
  };

  return {
    currentLevel,
    currentLevelIndex,
    totalLevels: levels.length,
    errors,
    foundObjects,
    selectedWord,
    feedback,
    isLevelComplete,
    isGameComplete,
    isGameOver,
    timeLeft,
    isPlaying,
    startGame,
    handleWordSelect,
    handleObjectSelect,
    nextLevel,
    restartLevel,
    restartGame
  };
};

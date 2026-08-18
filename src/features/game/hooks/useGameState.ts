import { useState, useEffect, useCallback } from 'react';
import { levels } from '../data/levels';
import { saveProgress, loadProgress, clearProgress } from '../utils/storage';
import { useSound } from './useSound';

export const useGameState = () => {
  const { playSelectCorrect, playLevelComplete, playError, playGameOver, playWin } = useSound();

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [unlockedLevelIndex, setUnlockedLevelIndex] = useState(0);
  const [errors, setErrors] = useState(0);
  const [foundObjects, setFoundObjects] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Restore progress from persistent storage when the game mounts
  useEffect(() => {
    let active = true;
    loadProgress().then((saved) => {
      if (!active) return;
      if (saved) {
        setCurrentLevelIndex(saved.currentLevelIndex ?? 0);
        setUnlockedLevelIndex(saved.unlockedLevelIndex ?? 0);
        setErrors(saved.errors ?? 0);
        setFoundObjects(saved.foundObjects ?? []);
      }
      setHydrated(true);
    });
    return () => {
      active = false;
    };
  }, []);

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

  // Save state on change (after hydration, so it never overwrites saved progress)
  useEffect(() => {
    if (!hydrated) return;
    saveProgress({
      currentLevelIndex,
      errors,
      foundObjects,
      unlockedLevelIndex,
    });
  }, [currentLevelIndex, errors, foundObjects, unlockedLevelIndex, hydrated]);

  const restartLevel = useCallback(() => {
    setErrors(0);
    setFoundObjects([]);
    setSelectedWord(null);
    setFeedback({ message: '', type: '' });
    setTimeLeft(60);
    setIsGameOver(false);
  }, []);

  // Timer logic
  useEffect(() => {
    if (!isPlaying || isLevelComplete || isGameComplete || isGameOver) return;

    if (timeLeft <= 0) {
      // Time's up: Game Over (unlock progress is kept)
      playGameOver();
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
          // Unlock the next level sequentially
          setUnlockedLevelIndex((prev: number) => Math.max(prev, currentLevelIndex + 1));
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
    setUnlockedLevelIndex(0);
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
    unlockedLevelIndex,
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

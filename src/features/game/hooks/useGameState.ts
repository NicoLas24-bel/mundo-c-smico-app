import { useState, useEffect, useCallback } from 'react';
import { levels } from '../data/levels';
import { saveProgress, loadProgress, clearProgress } from '../utils/storage';
import { loadSettings } from '../../settings/utils/settings';
import { useSound } from './useSound';
import { useGameTimer } from './useGameTimer';

export const useGameState = (paused = false) => {
  const { playSelectCorrect, playError, playGameOver } = useSound();

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentLevel = levels[currentLevelIndex];

  // Derived state to avoid effect
  const isLevelComplete = currentLevel && foundObjects.length === currentLevel.objects.length;
  const isGameComplete = isLevelComplete && currentLevelIndex === levels.length - 1;

  // Timer preference from settings (enabled by default)
  const [timerEnabled, setTimerEnabled] = useState(true);
  useEffect(() => {
    let active = true;
    loadSettings().then((settings) => {
      if (active) setTimerEnabled(settings.timerEnabled);
    });
    return () => {
      active = false;
    };
  }, []);

  // Optional countdown timer (isolated in useGameTimer for reusability)
  const { timeLeft, reset: resetTimer } = useGameTimer({
    enabled: timerEnabled,
    isRunning: isPlaying && !paused && !isLevelComplete && !isGameComplete && !isGameOver,
    onTimeUp: () => {
      playGameOver();
      setIsGameOver(true);
    },
  });

  // Save state on change (after hydration, so it never overwrites saved progress)
  useEffect(() => {
    if (!hydrated) return;
    saveProgress({
      currentLevelIndex,
      unlockedLevelIndex,
    });
  }, [currentLevelIndex, unlockedLevelIndex, hydrated]);

  const restartLevel = useCallback(() => {
    setErrors(0);
    setFoundObjects([]);
    setSelectedWord(null);
    setFeedback({ message: '', type: '' });
    resetTimer();
    setIsGameOver(false);
  }, [resetTimer]);

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
        // Unlock the next level sequentially (win sound plays with the overlay)
        if (currentLevelIndex < levels.length - 1) {
          setUnlockedLevelIndex((prev: number) => Math.max(prev, currentLevelIndex + 1));
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
      resetTimer(); // Reset timer for next level
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
    resetTimer();
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
    timerEnabled,
    startGame,
    handleWordSelect,
    handleObjectSelect,
    nextLevel,
    restartLevel,
    restartGame
  };
};

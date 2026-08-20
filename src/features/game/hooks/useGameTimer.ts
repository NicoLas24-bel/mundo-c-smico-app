import { useCallback, useEffect, useRef, useState } from 'react';

export type UseGameTimerOptions = {
  enabled?: boolean;
  isRunning: boolean;
  initialTime?: number;
  onTimeUp?: () => void;
};

export const useGameTimer = ({
  enabled = true,
  isRunning,
  initialTime = 60,
  onTimeUp,
}: UseGameTimerOptions) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const onTimeUpRef = useRef(onTimeUp);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  const reset = useCallback(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (!enabled || !isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [enabled, isRunning, initialTime]);

  useEffect(() => {
    if (enabled && isRunning && timeLeft === 0) {
      onTimeUpRef.current?.();
    }
  }, [enabled, isRunning, timeLeft]);

  return { timeLeft, reset };
};
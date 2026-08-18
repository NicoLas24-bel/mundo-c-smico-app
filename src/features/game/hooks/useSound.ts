import { useAudioPlayer } from 'expo-audio';

import { getSettings } from '../../settings/utils/settings';

// Importar audios
const soundLevelComplete = require('../../../../assets/audio/siguiente-nivel.mp3');
const soundSelectCorrect = require('../../../../assets/audio/seleccion-correcta.mp3');
const soundError    = require('../../../../assets/audio/equivocado.mp3');
const soundGameOver = require('../../../../assets/audio/juego-finalizado-perdido.mp3');
const soundWin      = require('../../../../assets/audio/juego-finalizado-ganado.mp3');
const soundAplausos = require('../../../../assets/audio/aplausos.mp3');
const soundButton   = require('../../../../assets/audio/botones.mp3');

/**
 * Hook que proporciona efectos de sonido para el juego.
 * Usa expo-audio SDK 57 (useAudioPlayer).
 */
export const useSound = () => {
  const levelCompletePlayer = useAudioPlayer(soundLevelComplete);
  const selectCorrectPlayer = useAudioPlayer(soundSelectCorrect);
  const errorPlayer         = useAudioPlayer(soundError);
  const gameOverPlayer      = useAudioPlayer(soundGameOver);
  const winPlayer           = useAudioPlayer(soundWin);
  const aplausosPlayer      = useAudioPlayer(soundAplausos);
  const buttonPlayer        = useAudioPlayer(soundButton);

  const isSoundEnabled = () => getSettings().soundEnabled;

  const playLevelComplete = () => {
    if (!isSoundEnabled()) return;
    try {
      levelCompletePlayer.volume = 0.7;
      levelCompletePlayer.seekTo(0);
      levelCompletePlayer.play();
    } catch (e) {}
  };

  const playSelectCorrect = () => {
    if (!isSoundEnabled()) return;
    try {
      selectCorrectPlayer.volume = 0.7;
      selectCorrectPlayer.seekTo(0);
      selectCorrectPlayer.play();
    } catch (e) {}
  };

  const playError = () => {
    if (!isSoundEnabled()) return;
    try {
      errorPlayer.volume = 0.6;
      errorPlayer.seekTo(0);
      errorPlayer.play();
    } catch (e) {}
  };

  const playGameOver = () => {
    if (!isSoundEnabled()) return;
    try {
      gameOverPlayer.volume = 0.7;
      gameOverPlayer.seekTo(0);
      gameOverPlayer.play();
    } catch (e) {}
  };

  const playWin = () => {
    if (!isSoundEnabled()) return;
    try {
      winPlayer.volume = 0.8;
      winPlayer.seekTo(0);
      winPlayer.play();

      // Después de 3 segundos, parar el sonido de victoria y poner aplausos
      setTimeout(() => {
        try {
          winPlayer.pause();
          aplausosPlayer.volume = 0.75;
          aplausosPlayer.seekTo(0);
          aplausosPlayer.play();
        } catch (e) {}
      }, 3000);
    } catch (e) {}
  };

  const playButton = () => {
    if (!isSoundEnabled()) return;
    try {
      buttonPlayer.volume = 0.5;
      buttonPlayer.seekTo(0);
      buttonPlayer.play();
    } catch (e) {}
  };

  return {
    playLevelComplete,
    playSelectCorrect,
    playError,
    playGameOver,
    playWin,
    playButton,
  };
};
import { createAudioPlayer } from 'expo-audio';

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
 * Reproductores de efectos de sonido.
 *
 * Se crean una sola vez a nivel de módulo (createAudioPlayer) para que
 * persistan durante toda la vida de la app, evitando recrear decenas de
 * reproductores por pantalla y eliminando el riesgo de usar un player
 * liberado tras desmontar una vista.
 */
const levelCompletePlayer = createAudioPlayer(soundLevelComplete);
const selectCorrectPlayer = createAudioPlayer(soundSelectCorrect);
const errorPlayer         = createAudioPlayer(soundError);
const gameOverPlayer      = createAudioPlayer(soundGameOver);
const winPlayer           = createAudioPlayer(soundWin);
const aplausosPlayer      = createAudioPlayer(soundAplausos);
const buttonPlayer        = createAudioPlayer(soundButton);

const isSoundEnabled = () => getSettings().soundEnabled;

/**
 * Efectos de sonido del juego (singleton).
 * Consume la configuración global de sonido en cada reproducción.
 */
export const useSound = () => {
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
      // Detener aplausos previos si seguían sonando
      aplausosPlayer.pause();
      winPlayer.seekTo(0);
      winPlayer.play();

      // Al terminar (o después de 1.5s) el sonido de victoria, encadenar los aplausos
      setTimeout(() => {
        try {
          winPlayer.pause();
          aplausosPlayer.volume = 0.75;
          aplausosPlayer.seekTo(0);
          aplausosPlayer.play();
        } catch (e) {}
      }, 1500);
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
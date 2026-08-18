import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { navigate } from '@/router';

import { useGameState } from '../../game/hooks/useGameState';
import { useSound } from '../../game/hooks/useSound';
import { GameBoard } from '../../game/components/GameBoard';
import { WordList } from '../../game/components/WordList';
import { GameStatus } from '../../game/components/GameStatus';
import { GameFeedback } from '../../game/components/GameFeedback';
import { GameTimer } from '../../game/components/GameTimer';
import { InstructionsModal } from '../../game/components/InstructionsModal';
import { RotateCcw, ArrowRight, Home as HomeIcon, Trophy, Star, Frown, ArrowLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

function AnimatedStars() {
  const anims = useRef([0, 1, 2].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(
      180,
      anims.map((a) =>
        Animated.spring(a, {
          toValue: 1,
          friction: 4,
          tension: 60,
          useNativeDriver: true,
        })
      )
    ).start();
  }, [anims]);

  return (
    <View style={styles.starsRow}>
      {anims.map((a, i) => (
        <Animated.View
          key={i}
          style={{
            opacity: a,
            transform: [{ scale: a }],
          }}
        >
          <Star color="#fbbf24" fill="#fbbf24" size={40} />
        </Animated.View>
      ))}
    </View>
  );
}

export function DashboardScreen() {
  const { playButton } = useSound();
  const [showNextLevelBtn, setShowNextLevelBtn] = useState(false);
  const {
    currentLevel,
    currentLevelIndex,
    totalLevels,
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
  } = useGameState();

  const handleBack = () => {
    playButton();
    navigate.toMenu();
  };

  useEffect(() => {
    if (isLevelComplete && !isGameComplete) {
      const timer = setTimeout(() => {
        setShowNextLevelBtn(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowNextLevelBtn(false);
    }
  }, [isLevelComplete, isGameComplete]);

  if (!currentLevel) return null;

  const progress = (foundObjects.length / currentLevel.objects.length) * 100;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>

        {/* Scrollable container for smaller screens if needed */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          <GameStatus
            levelName={currentLevel.name}
            levelIndex={currentLevelIndex}
            totalLevels={totalLevels}
            errors={errors}
            progress={progress}
            difficulty={currentLevel.difficulty}
          />

          <View style={styles.gameLayout}>
            <View style={styles.boardContainer}>
              <GameTimer timeLeft={timeLeft} maxTime={60} />

              <GameBoard
                level={currentLevel}
                foundObjects={foundObjects}
                selectedWord={selectedWord}
                onObjectSelect={handleObjectSelect}
              />
            </View>

            <View style={styles.wordsContainer}>
              <WordList
                words={currentLevel.objects}
                foundObjects={foundObjects}
                selectedWord={selectedWord}
                onWordSelect={handleWordSelect}
              />
            </View>
          </View>

        </ScrollView>

        <GameFeedback feedback={feedback} />

        {/* Level Complete Overlay */}
        {isLevelComplete && !isGameComplete && (
          <View style={styles.overlay}>
            <AnimatedStars />
            <Text style={styles.overlayTitle}>¡Congratulations!</Text>
            <Text style={styles.overlaySubtitle}>Felicidades! has completado el nivel.</Text>

            {showNextLevelBtn && (
              <View style={styles.overlayActions}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => { playButton(); nextLevel(); }}
                >
                  <LinearGradient
                    colors={['#6366f1', '#a855f7']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.actionButton}
                  >
                    <Text style={styles.actionButtonText}>Continuar</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleBack} activeOpacity={0.7} style={styles.backButton}>
                  <Text style={styles.backButtonText}>Volver al menú</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* Game Complete Overlay */}
        {isGameComplete && (
          <View style={styles.overlay}>
            <LinearGradient
              colors={['#f59e0b', '#fbbf24']}
              style={styles.trophyContainer}
            >
              <Trophy color="white" size={48} />
            </LinearGradient>

            <Text style={styles.overlayTitle}>You Won! 🏆</Text>
            <Text style={styles.overlaySubtitle}>Amazing! You completed all {totalLevels} levels!</Text>
            <Text style={styles.overlayText}>You are an English vocabulary champion.</Text>

            <View style={styles.buttonsRow}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => { playButton(); restartGame(); }}>
                <LinearGradient colors={['#6366f1', '#a855f7']} style={styles.actionButtonSm}>
                  <RotateCcw color="white" size={20} />
                  <Text style={styles.actionButtonTextSm}>Play Again</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.outlineButton}
                onPress={() => { playButton(); navigate.back(); }}
              >
                <HomeIcon color="#e2e8f0" size={20} />
                <Text style={styles.outlineButtonText}>Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Game Over Overlay */}
        {isGameOver && (
          <View style={styles.overlay}>
            <LinearGradient
              colors={['#ef4444', '#b91c1c']}
              style={styles.frownContainer}
            >
              <Frown color="white" size={48} />
            </LinearGradient>

            <Text style={styles.overlayTitle}>Juego Terminado</Text>
            <Text style={styles.overlaySubtitle}>
              {errors >= 3 ? 'Has perdido todas tus vidas.' : '¡Se agotó el tiempo!'}
            </Text>

            <View style={styles.buttonsRow}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => { playButton(); restartLevel(); }}>
                <LinearGradient colors={['#6366f1', '#a855f7']} style={styles.actionButtonSm}>
                  <RotateCcw color="white" size={20} />
                  <Text style={styles.actionButtonTextSm}>Reintentar</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.outlineButton}
                onPress={() => { playButton(); navigate.back(); }}
              >
                <HomeIcon color="#e2e8f0" size={20} />
                <Text style={styles.outlineButtonText}>Salir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Instructions Modal at the very beginning */}
        {!isPlaying && (
          <InstructionsModal onStart={startGame} />
        )}

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
  },
  gameLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  },
  boardContainer: {
    flex: 1,
    minWidth: 300,
    maxWidth: 600,
    alignItems: 'center',
  },
  wordsContainer: {
    width: '100%',
    maxWidth: 300,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.91)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    zIndex: 20,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  overlayTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  overlaySubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#cbd5e1',
    marginBottom: 32,
    textAlign: 'center',
  },
  overlayText: {
    color: '#64748b',
    fontSize: 14,
    marginBottom: 32,
    textAlign: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 20,
    gap: 12,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
  },
  overlayActions: {
    width: '100%',
    alignItems: 'center',
    gap: 14,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
  },
  backButtonText: {
    color: '#cbd5e1',
    fontSize: 16,
    fontWeight: '700',
  },
  trophyContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  frownContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  actionButtonSm: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonTextSm: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  outlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
  },
  outlineButtonText: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

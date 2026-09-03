import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Heart, RefreshCw, Eye } from 'lucide-react-native';
import { navigate } from '@/router';
import { useSound } from '../../game/hooks/useSound';
import { useHangmanGame } from '../hooks/useHangmanGame';
import { HangmanKeyboard } from '../components/HangmanKeyboard';
import { HangmanFigure } from '../components/HangmanFigure';

export function HangmanScreen() {
    const { playButton } = useSound();
    const { gameState, guessLetter, startNewGame, resetCurrentGame } = useHangmanGame();
    const [showHint, setShowHint] = useState(false);
    const [showActionBtn, setShowActionBtn] = useState(false);

    useEffect(() => {
        // Manejar el retardo del botón de continuar/reintentar
        if (gameState?.status && gameState.status !== 'playing') {
            const timer = setTimeout(() => {
                setShowActionBtn(true);
            }, 1500);
            return () => clearTimeout(timer);
        } else {
            setShowActionBtn(false);
        }
    }, [gameState?.status]);

    useEffect(() => {
        // Reset hint when word changes
        if (gameState?.word) {
            setShowHint(false);
        }
    }, [gameState?.word]);

    const handleBack = () => {
        playButton();
        navigate.back();
    };

    if (!gameState) {
        return <View style={styles.container} />;
    }

    const { word, translation, guessedLetters, mistakes, maxMistakes, status } = gameState;
    const livesLeft = maxMistakes - mistakes;

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#08011f', '#110535', '#0b1533']}
                locations={[0, 0.5, 1]}
                style={StyleSheet.absoluteFill}
            />

            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack} activeOpacity={0.7} style={styles.backButton}>
                        <ChevronLeft color="white" size={28} />
                    </TouchableOpacity>
                    <View style={styles.livesContainer}>
                        {[...Array(maxMistakes)].map((_, i) => (
                            <Heart 
                                key={i} 
                                color={i < livesLeft ? "#f43f5e" : "#334155"} 
                                fill={i < livesLeft ? "#f43f5e" : "transparent"}
                                size={20} 
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.content}>
                    
                    {/* Figura del Ahorcado */}
                    <HangmanFigure mistakes={mistakes} />

                    {/* Pista (Translation) */}
                    <View style={styles.hintContainer}>
                        {!showHint ? (
                            <TouchableOpacity 
                                activeOpacity={0.7} 
                                style={styles.showHintBtn}
                                onPress={() => setShowHint(true)}
                            >
                                <Eye color="#c4b5fd" size={20} />
                                <Text style={styles.showHintText}>Ver pista</Text>
                            </TouchableOpacity>
                        ) : (
                            <Text style={styles.hintText}>{translation}</Text>
                        )}
                    </View>

                    {/* Palabra Oculta */}
                    <View style={styles.wordContainer}>
                        {word.split('').map((char, index) => {
                            if (char === ' ') {
                                return <View key={`space-${index}`} style={styles.space} />;
                            }
                            
                            const isGuessed = guessedLetters.has(char);

                            return (
                                <View key={`char-${index}`} style={styles.letterBox}>
                                    <Text style={styles.letter}>
                                        {isGuessed ? char : ''}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>

                    <View style={{ flex: 1 }} />

                    {/* Teclado */}
                    <HangmanKeyboard 
                        guessedLetters={guessedLetters}
                        onGuess={guessLetter}
                        disabled={status !== 'playing'}
                    />
                </View>
            </SafeAreaView>

            {/* Modal de Victoria / Derrota */}
            <Modal
                visible={status !== 'playing'}
                transparent
                animationType="fade"
            >
                <Pressable style={styles.modalOverlay}>
                    <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
                        <LinearGradient
                            colors={['#1e1b4b', '#312e81']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.modalGradient}
                        >
                            {/* Label superior */}
                            <Text style={styles.modalLabel}>
                                {status === 'won' ? 'NIVEL COMPLETADO' : 'JUEGO TERMINADO'}
                            </Text>

                            {/* Título grande */}
                            <Text style={[styles.modalTitle, { color: status === 'won' ? '#4ade80' : '#f87171' }]}>
                                {status === 'won' ? '¡Excelente!' : 'Game Over'}
                            </Text>

                            <View style={styles.modalDivider} />

                            {/* Botón de acción (Aparece con retardo) */}
                            {showActionBtn && (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={status === 'won' ? startNewGame : resetCurrentGame}
                                    style={styles.nextButton}
                                >
                                    <LinearGradient
                                        colors={['#6366f1', '#a855f7']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={styles.nextButtonGradient}
                                    >
                                        <RefreshCw color="white" size={18} />
                                        <Text style={styles.nextButtonText}>
                                            {status === 'won' ? 'Siguiente Palabra' : 'Reintentar'}
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            )}
                        </LinearGradient>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#08011f',
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 20,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    livesContainer: {
        flexDirection: 'row',
        gap: 6,
        paddingRight: 16,
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    hintContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        height: 40,
        justifyContent: 'center',
    },
    showHintBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: 'rgba(124,58,237,0.15)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(168,85,247,0.4)',
    },
    showHintText: {
        color: '#c4b5fd',
        fontSize: 14,
        fontWeight: '700',
    },
    hintLabel: {
        color: '#c4b5fd',
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 4,
    },
    hintText: {
        color: 'white',
        fontSize: 24,
        fontWeight: '900',
        textAlign: 'center',
    },
    wordContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
        paddingHorizontal: 10,
    },
    letterBox: {
        width: 40,
        height: 48,
        borderBottomWidth: 3,
        borderColor: '#a855f7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    letterBoxMissed: {
        borderColor: '#f43f5e',
    },
    letter: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
    },
    letterMissed: {
        color: '#f43f5e',
    },
    space: {
        width: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '85%',
        maxWidth: 400,
        borderRadius: 20,
        overflow: 'hidden',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    modalGradient: {
        padding: 28,
        alignItems: 'center',
    },
    modalLabel: {
        color: '#bec9d8',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        marginBottom: 12,
    },
    modalTitle: {
        fontSize: 36,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 16,
    },
    modalDivider: {
        width: 40,
        height: 4,
        backgroundColor: '#6366f1',
        borderRadius: 2,
        marginBottom: 28,
    },
    nextButton: {
        borderRadius: 16,
        overflow: 'hidden',
        width: '100%',
    },
    nextButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
        gap: 12,
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
});

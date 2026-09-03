import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Heart, RefreshCw } from 'lucide-react-native';
import { navigate } from '@/router';
import { useSound } from '../../game/hooks/useSound';
import { useHangmanGame } from '../hooks/useHangmanGame';
import { HangmanKeyboard } from '../components/HangmanKeyboard';

export function HangmanScreen() {
    const { playButton } = useSound();
    const { gameState, guessLetter, startNewGame } = useHangmanGame();

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
                    
                    {/* Pista (Translation) */}
                    <View style={styles.hintContainer}>
                        <Text style={styles.hintLabel}>Pista</Text>
                        <Text style={styles.hintText}>{translation}</Text>
                    </View>

                    {/* Palabra Oculta */}
                    <View style={styles.wordContainer}>
                        {word.split('').map((char, index) => {
                            if (char === ' ') {
                                return <View key={`space-${index}`} style={styles.space} />;
                            }
                            
                            const isGuessed = guessedLetters.has(char);
                            const showChar = isGuessed || status === 'lost';
                            const isMissed = !isGuessed && status === 'lost';

                            return (
                                <View key={`char-${index}`} style={[styles.letterBox, isMissed && styles.letterBoxMissed]}>
                                    <Text style={[styles.letter, isMissed && styles.letterMissed]}>
                                        {showChar ? char : ''}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>

                    {/* Estado de Victoria/Derrota */}
                    {status !== 'playing' && (
                        <View style={styles.resultContainer}>
                            <Text style={[styles.resultText, { color: status === 'won' ? '#4ade80' : '#f87171' }]}>
                                {status === 'won' ? '¡Excelente!' : 'Game Over'}
                            </Text>
                            <TouchableOpacity activeOpacity={0.8} onPress={startNewGame} style={styles.nextButton}>
                                <LinearGradient
                                    colors={['#db2777', '#f43f5e']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.nextButtonGradient}
                                >
                                    <RefreshCw color="white" size={20} />
                                    <Text style={styles.nextButtonText}>Siguiente Palabra</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    )}

                    <View style={{ flex: 1 }} />

                    {/* Teclado */}
                    <HangmanKeyboard 
                        guessedLetters={guessedLetters}
                        onGuess={guessLetter}
                        disabled={status !== 'playing'}
                    />
                </View>
            </SafeAreaView>
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
        marginTop: 20,
        marginBottom: 40,
    },
    hintLabel: {
        color: '#c4b5fd',
        fontSize: 14,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 8,
    },
    hintText: {
        color: 'white',
        fontSize: 28,
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
    resultContainer: {
        alignItems: 'center',
        marginTop: 40,
        gap: 16,
    },
    resultText: {
        fontSize: 32,
        fontWeight: '900',
    },
    nextButton: {
        borderRadius: 16,
        overflow: 'hidden',
    },
    nextButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 24,
        gap: 12,
    },
    nextButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800',
    },
});

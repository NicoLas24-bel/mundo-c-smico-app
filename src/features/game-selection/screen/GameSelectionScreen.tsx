import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Search, Baseline } from 'lucide-react-native';
import { navigate } from '@/router';
import { useSound } from '../../game/hooks/useSound';

export function GameSelectionScreen() {
    const { playButton } = useSound();

    const handleBack = () => {
        playButton();
        navigate.toWelcome();
    };

    const handleFindObjects = () => {
        playButton();
        navigate.toMenu();
    };

    const handleHangman = () => {
        playButton();
        navigate.toHangman();
    };

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
                    <View style={styles.headerCenter}>
                        <Text style={styles.title}>Selecciona un Juego</Text>
                    </View>
                    <View style={styles.headerSpacer} />
                </View>

                {/* Cards */}
                <View style={styles.content}>

                    <Text style={styles.instructionText}>
                        Elige tu modalidad favorita y comienza a aprender.
                    </Text>

                    {/* Tarjeta 1: Encuentra el Objeto */}
                    <TouchableOpacity activeOpacity={0.85} onPress={handleFindObjects} style={styles.cardWrapper}>
                        <LinearGradient
                            colors={['rgba(99,102,241,0.2)', 'rgba(168,85,247,0.1)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.card}
                        >
                            <View style={styles.cardBorder}>
                                <LinearGradient colors={['#6366f1', '#a855f7']} style={StyleSheet.absoluteFill} />
                            </View>
                            <View style={[styles.iconContainer, { backgroundColor: '#6366f1' }]}>
                                <Search color="white" size={26} strokeWidth={2.5} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.cardTitle}>Encuentra el Objeto</Text>
                                <Text style={styles.cardDescription}>Busca las palabras ocultas en escenarios interactivos llenos de color.</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Tarjeta 2: Ahorcado */}
                    <TouchableOpacity activeOpacity={0.85} onPress={handleHangman} style={styles.cardWrapper}>
                        <LinearGradient
                            colors={['rgba(219,39,119,0.2)', 'rgba(244,63,94,0.1)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.card}
                        >
                            <View style={styles.cardBorder}>
                                <LinearGradient colors={['#db2777', '#f43f5e']} style={StyleSheet.absoluteFill} />
                            </View>
                            <View style={[styles.iconContainer, { backgroundColor: '#f43f5e' }]}>
                                <Baseline color="white" size={26} strokeWidth={2.5} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.cardTitle}>El Ahorcado</Text>
                                <Text style={styles.cardDescription}>Descubre la palabra letra por letra antes de que se acaben tus vidas.</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
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
    headerCenter: {
        flex: 1,
        alignItems: 'center',
    },
    headerSpacer: {
        width: 44,
    },
    title: {
        color: 'white',
        fontSize: 22,
        fontWeight: '900',
        letterSpacing: 1,
        textAlign: 'center',
    },
    instructionText: {
        color: '#94a3b8',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 32,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
        gap: 20,
    },
    cardWrapper: {
        borderRadius: 20,
        overflow: 'hidden',
    },
    cardBorder: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 2,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24,
        borderRadius: 20,
        gap: 18,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '900',
        marginBottom: 6,
    },
    cardDescription: {
        color: '#cbd5e1',
        fontSize: 13,
        lineHeight: 18,
        fontWeight: '500',
    },
});

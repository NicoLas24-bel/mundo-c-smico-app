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
                    {/* Tarjeta 1: Encuentra el Objeto */}
                    <TouchableOpacity activeOpacity={0.85} onPress={handleFindObjects} style={styles.cardWrapper}>
                        <LinearGradient
                            colors={['#6d28d9', '#a855f7']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.card}
                        >
                            <View style={styles.iconContainer}>
                                <Search color="white" size={32} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.cardTitle}>Encuentra el Objeto</Text>
                                <Text style={styles.cardDescription}>Busca las palabras en los escenarios interactivos.</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Tarjeta 2: Ahorcado */}
                    <TouchableOpacity activeOpacity={0.85} onPress={handleHangman} style={styles.cardWrapper}>
                        <LinearGradient
                            colors={['#db2777', '#f43f5e']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.card}
                        >
                            <View style={styles.iconContainer}>
                                <Baseline color="white" size={32} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.cardTitle}>El Ahorcado</Text>
                                <Text style={styles.cardDescription}>Adivina las palabras letra por letra antes de perder las vidas.</Text>
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
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
        gap: 20,
    },
    cardWrapper: {
        borderRadius: 24,
        elevation: 8,
        shadowColor: '#a855f7',
        shadowOpacity: 0.3,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 4 },
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24,
        borderRadius: 24,
        gap: 20,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: '900',
        marginBottom: 6,
    },
    cardDescription: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500',
    },
});

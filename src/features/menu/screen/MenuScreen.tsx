import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Lock, Play, CheckCircle2, ChevronLeft, MapPin } from 'lucide-react-native';
import { useFocusEffect } from 'expo-router';
import { levels } from '../../game/data/levels';
import { loadProgress, saveProgress } from '../../game/utils/storage';
import { navigate } from '@/router';
import { useSound } from '../../game/hooks/useSound';

const DIFFICULTY: any = {
    easy: { color: '#4ade80', bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.4)', label: 'Easy' },
    medium: { color: '#fbbf24', bg: 'rgba(251,191,36,0.15)', border: 'rgba(251,191,36,0.4)', label: 'Medium' },
    hard: { color: '#f87171', bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.4)', label: 'Hard' },
};

export function MenuScreen() {
    const { playButton } = useSound();
    const [unlockedLevelIndex, setUnlockedLevelIndex] = useState(0);

    // Refrescar el progreso cada vez que el menú vuelve a tener foco (ej. al volver de un nivel)
    useFocusEffect(
        useCallback(() => {
            let active = true;
            loadProgress().then((saved) => {
                if (active) {
                    setUnlockedLevelIndex(saved?.unlockedLevelIndex ?? 0);
                }
            });
            return () => {
                active = false;
            };
        }, [])
    );

    const handleSelectLevel = (levelIndex: number) => {
        playButton();
        saveProgress({
            currentLevelIndex: levelIndex,
            errors: 0,
            foundObjects: [],
            unlockedLevelIndex,
        });
        navigate.toDashboard();
    };

    const handleBack = () => {
        playButton();
        navigate.toWelcome();
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack} activeOpacity={0.7} style={styles.backButton}>
                        <ChevronLeft color="white" size={24} />
                    </TouchableOpacity>
                    <View style={styles.headerCenter}>
                        <Text style={styles.title}> Elige un nivel</Text>
                        <Text style={styles.subtitle}>
                            {unlockedLevelIndex} de {levels.length} niveles superados
                        </Text>
                    </View>
                    <View style={styles.headerSpacer} />
                </View>

                {/* Levels list */}
                <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
                    {levels.map((level, index) => {
                        const isUnlocked = index <= unlockedLevelIndex;
                        const isCompleted = index < unlockedLevelIndex;
                        const diff = DIFFICULTY[level.difficulty] || DIFFICULTY.easy;

                        return (
                            <TouchableOpacity
                                key={level.id}
                                activeOpacity={0.8}
                                disabled={!isUnlocked}
                                onPress={() => handleSelectLevel(index)}
                                style={[styles.card, !isUnlocked && styles.cardLocked]}
                            >
                                <LinearGradient
                                    colors={isUnlocked ? ['#6366f1', '#a855f7'] : ['#334155', '#1e293b']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.levelBadge}
                                >
                                    <Text style={[styles.levelBadgeText, !isUnlocked && styles.levelBadgeTextLocked]}>
                                        {level.id}
                                    </Text>
                                </LinearGradient>

                                <View style={styles.cardInfo}>
                                    <View style={styles.cardNameRow}>
                                        <MapPin color={isUnlocked ? '#c084fc' : '#475569'} size={14} />
                                        <Text style={[styles.cardName, !isUnlocked && styles.cardNameLocked]}>
                                            {level.name}
                                        </Text>
                                    </View>

                                    <View style={[styles.diffBadge, { backgroundColor: diff.bg, borderColor: diff.border }]}>
                                        <Text style={[styles.diffText, { color: isUnlocked ? diff.color : '#64748b' }]}>
                                            {diff.label}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.cardRight}>
                                    {isUnlocked ? (
                                        isCompleted ? (
                                            <CheckCircle2 color="#4ade80" size={26} />
                                        ) : (
                                            <LinearGradient
                                                colors={['#6366f1', '#a855f7']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                                style={styles.playCircle}
                                            >
                                                <Play color="white" size={16} fill="white" />
                                            </LinearGradient>
                                        )
                                    ) : (
                                        <Lock color="#475569" size={24} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 16,
        gap: 12,
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
        fontSize: 20,
        fontWeight: '900',
        letterSpacing: 1,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    subtitle: {
        color: '#94a3b8',
        fontSize: 13,
        fontWeight: '600',
        marginTop: 4,
    },
    list: {
        paddingHorizontal: 16,
        paddingBottom: 32,
        gap: 12,
        paddingTop: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        padding: 12,
        borderRadius: 16,
        borderColor: 'rgba(169, 19, 228, 0.33)',
        borderWidth: 1,
    },
    cardLocked: {
        opacity: 0.55,
        borderColor: 'rgba(255, 255, 255, 0.04)',

    },
    levelBadge: {
        width: 52,
        height: 52,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    levelBadgeText: {
        color: 'white',
        fontSize: 22,
        fontWeight: '900',
    },
    levelBadgeTextLocked: {
        color: '#64748b',
    },
    cardInfo: {
        flex: 1,
        gap: 8,
        minWidth: 0,
    },
    cardNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    cardName: {
        color: 'white',
        fontSize: 17,
        fontWeight: '900',
        flexShrink: 1,
    },
    cardNameLocked: {
        color: '#64748b',
    },
    diffBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 8,
        borderWidth: 1,
    },
    diffText: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    cardRight: {
        width: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    playCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const DIFFICULTY_COLORS: any = {
  easy: { bg: 'rgba(34,197,94,0.2)', border: 'rgba(34,197,94,0.5)', text: '#4ade80', label: 'Easy' },
  medium: { bg: 'rgba(251,191,36,0.2)', border: 'rgba(251,191,36,0.5)', text: '#fbbf24', label: 'Medium' },
  hard: { bg: 'rgba(239,68,68,0.2)', border: 'rgba(239,68,68,0.5)', text: '#f87171', label: 'Hard' },
};

export const GameStatus = ({ levelName, levelIndex, totalLevels, errors, progress, difficulty }: any) => {
  const maxErrors = 3;
  const remainingHearts = maxErrors - errors;
  const diff = DIFFICULTY_COLORS[difficulty] || DIFFICULTY_COLORS.easy;

  return (
    <View style={styles.container}>

      {/* Row 1: Level info (title truncates, difficulty pinned on the right) */}
      <View style={styles.headerRow}>
        <View style={styles.levelGroup}>
          <LinearGradient
            colors={['rgba(99,102,241,0.3)', 'rgba(168,85,247,0.3)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.levelBadge}
          >
            <Text style={styles.levelBadgeTextLabel}>LEVEL</Text>
            <Text style={styles.levelBadgeTextVal}>{levelIndex + 1}</Text>
            <Text style={styles.levelBadgeTextTotal}>/ {totalLevels}</Text>
          </LinearGradient>

          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.levelName}
          >
            {levelName}
          </Text>
        </View>

        <View style={[styles.diffBadge, { backgroundColor: diff.bg, borderColor: diff.border }]}>
          <Text style={[styles.diffText, { color: diff.text }]}>{diff.label}</Text>
        </View>
      </View>

      {/* Row 2: Status (LIVES + divider + PROGRESS) */}
      <View style={styles.statusRow}>

        <View style={styles.heartsContainer}>
          <Text style={styles.labelText}>LIVES</Text>
          <View style={styles.heartsRow}>
            {[...Array(maxErrors)].map((_, i) => (
              <Heart
                key={i}
                size={24}
                color={i < remainingHearts ? '#f43f5e' : '#334155'}
                fill={i < remainingHearts ? '#f43f5e' : '#334155'}
                style={styles.heartIcon}
              />
            ))}
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.labelText}>PROGRESS</Text>
            <Text style={styles.progressVal}>{Math.round(progress)}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <LinearGradient
              colors={['#6366f1', '#a855f7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressBarFill, { width: `${progress}%` }]}
            />
          </View>
        </View>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    padding: 14,
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    marginBottom: 15,
    width: '100%',
    alignSelf: 'stretch',
    overflow: 'hidden',
    gap: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  levelGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minWidth: 0,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderColor: 'rgba(99,102,241,0.4)',
    borderWidth: 1,
  },
  levelBadgeTextLabel: {
    color: '#a5b4fc',
    fontSize: 12,
    fontWeight: '900',
  },
  levelBadgeTextVal: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
    paddingHorizontal: 5,
  },
  levelBadgeTextTotal: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
  },
  levelName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '900',
    flex: 1,
    minWidth: 0,
    left: 29
  },
  diffBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    flexShrink: 0,
  },
  diffText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 24,
  },
  heartsContainer: {
    alignItems: 'center',
    gap: 6,
    flexShrink: 0,
  },
  heartsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  heartIcon: {
    marginHorizontal: 2,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.15)',
    flexShrink: 0,
  },
  progressContainer: {
    flex: 1,
    gap: 8,
    minWidth: 0,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelText: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  progressVal: {
    color: '#818cf8',
    fontSize: 12,
    fontWeight: '900',
  },
  progressBarBg: {
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  }
});

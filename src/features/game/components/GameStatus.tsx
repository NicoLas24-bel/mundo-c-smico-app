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
      <View style={styles.row}>
        
        {/* Left: Level info */}
        <View style={styles.leftInfo}>
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

          <Text style={styles.levelName}>{levelName}</Text>

          <View style={[styles.diffBadge, { backgroundColor: diff.bg, borderColor: diff.border }]}>
            <Text style={[styles.diffText, { color: diff.text }]}>{diff.label}</Text>
          </View>
        </View>

        {/* Right: Hearts + Progress */}
        <View style={styles.rightInfo}>
          
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 12,
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  leftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
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
  },
  levelBadgeTextTotal: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
  },
  levelName: {
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
  },
  diffBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  diffText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  rightInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  heartsContainer: {
    alignItems: 'center',
    gap: 4,
  },
  heartsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  heartIcon: {
    marginHorizontal: 2,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  progressContainer: {
    minWidth: 120,
    gap: 6,
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

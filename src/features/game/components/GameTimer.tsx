import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Timer } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const GameTimer = ({ timeLeft, maxTime = 60 }: any) => {
  const percentage = (timeLeft / maxTime) * 100;
  const isDanger = timeLeft <= 10;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Timer color={isDanger ? "#ef4444" : "white"} size={20} />
        <Text style={[styles.timeText, isDanger && styles.dangerText]}>
          {timeLeft}s
        </Text>
      </View>
      <View style={styles.barBg}>
        <LinearGradient
          colors={isDanger ? ['#ef4444', '#b91c1c'] : ['#3b82f6', '#8b5cf6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.barFill, { width: `${Math.max(0, percentage)}%` }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dangerText: {
    color: '#f87171',
  },
  barBg: {
    width: '100%',
    height: 12,
    backgroundColor: '#1f2937',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4b5563',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 6,
  }
});

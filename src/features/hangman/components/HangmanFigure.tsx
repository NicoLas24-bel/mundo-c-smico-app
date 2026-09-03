import React from 'react';
import { View, StyleSheet } from 'react-native';

interface HangmanFigureProps {
  mistakes: number;
}

export function HangmanFigure({ mistakes }: HangmanFigureProps) {
  // mistakes go from 0 to 6
  return (
    <View style={styles.container}>
      {/* Base and pole */}
      <View style={styles.base} />
      <View style={styles.pole} />
      <View style={styles.topBar} />
      <View style={styles.rope} />

      {/* Body parts based on mistakes */}
      <View style={styles.figureContainer}>
        {mistakes > 0 && <View style={styles.head} />}
        {mistakes > 1 && <View style={styles.body} />}
        {mistakes > 2 && <View style={styles.leftArm} />}
        {mistakes > 3 && <View style={styles.rightArm} />}
        {mistakes > 4 && <View style={styles.leftLeg} />}
        {mistakes > 5 && <View style={styles.rightLeg} />}

        {/* If lost (6 mistakes), maybe add X eyes (simulated with crossed lines in head) */}
        {mistakes >= 6 && (
          <>
            <View style={[styles.eye, styles.leftEye]}><View style={styles.eyeCross1} /><View style={styles.eyeCross2} /></View>
            <View style={[styles.eye, styles.rightEye]}><View style={styles.eyeCross1} /><View style={styles.eyeCross2} /></View>
            <View style={styles.sadMouth} />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 160,
    width: 120,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 50,
    alignSelf: 'center',
  },
  base: {
    width: 100,
    height: 4,
    backgroundColor: '#94a3b8',
    borderRadius: 2,
  },
  pole: {
    position: 'absolute',
    left: 20,
    bottom: 0,
    width: 4,
    height: 160,
    backgroundColor: '#94a3b8',
    borderRadius: 2,
  },
  topBar: {
    position: 'absolute',
    left: 20,
    top: 0,
    width: 60,
    height: 4,
    backgroundColor: '#94a3b8',
    borderRadius: 2,
  },
  rope: {
    position: 'absolute',
    left: 76,
    top: 0,
    width: 2,
    height: 20,
    backgroundColor: '#cbd5e1',
  },
  figureContainer: {
    position: 'absolute',
    left: 77,
    top: 20,
    alignItems: 'center',
  },
  head: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: 'white',
    marginLeft: -16,
  },
  body: {
    width: 3,
    height: 33,
    backgroundColor: 'white',
    right: 8
  },
  leftArm: {
    position: 'absolute',
    top: 38,
    left: -20,
    width: 20,
    height: 3,
    backgroundColor: 'white',
    transform: [{ rotate: '30deg' }],
  },
  rightArm: {
    position: 'absolute',
    top: 38,
    left: -3,
    width: 20,
    height: 3,
    backgroundColor: 'white',
    transform: [{ rotate: '-30deg' }],
  },
  leftLeg: {
    position: 'absolute',
    top: 70,
    left: -15,
    width: 18,
    height: 3,
    backgroundColor: 'white',
    transform: [{ rotate: '-60deg' }],
  },
  rightLeg: {
    position: 'absolute',
    top: 70,
    left: -3,
    width: 18,
    height: 3,
    backgroundColor: 'white',
    transform: [{ rotate: '60deg' }],
  },
  eye: {
    position: 'absolute',
    width: 8,
    height: 8,
  },
  leftEye: { top: 10, left: -10 },
  rightEye: { top: 10, left: 2 },
  eyeCross1: { position: 'absolute', width: 8, height: 1.5, backgroundColor: '#f43f5e', transform: [{ rotate: '45deg' }], top: 3 },
  eyeCross2: { position: 'absolute', width: 8, height: 1.5, backgroundColor: '#f43f5e', transform: [{ rotate: '-45deg' }], top: 3 },
  sadMouth: {
    position: 'absolute',
    top: 22,
    left: -6,
    width: 12,
    height: 2,
    backgroundColor: 'white',
  },
});

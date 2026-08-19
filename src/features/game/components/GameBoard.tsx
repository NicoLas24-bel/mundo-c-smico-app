import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckCircle2 } from 'lucide-react-native';

export const GameBoard = ({ level, foundObjects, selectedWord, onObjectSelect }: any) => {
  if (!level) return null;

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={level.image}
        style={styles.image}
        contentFit="cover"
      />

      {/* Top Overlay Gradient */}
      <LinearGradient
        colors={['rgba(0,0,0,0.4)', 'transparent']}
        style={styles.topGradient}
        pointerEvents="none"
      />

      {/* Bottom Overlay Gradient */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.4)']}
        style={styles.bottomGradient}
        pointerEvents="none"
      />

      {/* Scene Label */}
      <View style={styles.sceneLabel}>
        <Text style={styles.sceneLabelText}>📍 {level.name}</Text>
      </View>

      {/* Word indicator */}
      {selectedWord && (
        <LinearGradient
          colors={['rgba(99,102,241,0.8)', 'rgba(168,85,247,0.8)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.wordIndicator}
        >
          <Text style={styles.wordIndicatorText}>Find: {selectedWord.toUpperCase()} →</Text>
        </LinearGradient>
      )}

      {/* Hotspots */}
      {level.objects.map((obj: any) => {
        const isFound = foundObjects.includes(obj.id);
        const w = obj.width || 12;
        const h = obj.height || 12;

        return (
          <TouchableOpacity
            key={obj.id}
            activeOpacity={0.8}
            disabled={isFound}
            onPress={() => onObjectSelect(obj.id)}
            style={[
              styles.hotspot,
              {
                top: `${obj.top - h / 2}%` as any,
                left: `${obj.left - w / 2}%` as any,
                width: `${w}%` as any,
                height: `${h}%` as any,
              }
            ]}
          >
            {isFound ? (
              <View style={styles.foundIndicator}>
                <CheckCircle2 color="white" size={28} />
              </View>
            ) : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
    borderColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    backgroundColor: '#1a1a2e',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 64,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
  },
  sceneLabel: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
  },
  sceneLabelText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '900',
  },
  wordIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderColor: 'rgba(99,102,241,0.5)',
    borderWidth: 1,
  },
  wordIndicatorText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '900',
  },
  hotspot: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  foundIndicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(34,197,94,0.9)',
    borderColor: 'rgba(255,255,255,0.8)',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 5,
  }
});

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Star } from 'lucide-react-native';

export const StarRating = ({ stars, size = 40, gap = 8, style }: any) => {
  const [anims] = useState(() => [0, 1, 2].map(() => new Animated.Value(0)));

  useEffect(() => {
    Animated.stagger(
      180,
      anims.map((a) =>
        Animated.spring(a, {
          toValue: 1,
          friction: 4,
          tension: 60,
          useNativeDriver: true,
        })
      )
    ).start();
  }, [anims]);

  return (
    <View style={[styles.row, { gap }, style]}>
      {[1, 2, 3].map((i) => {
        const earned = i <= stars;
        return (
          <Animated.View
            key={i}
            style={{
              opacity: earned ? anims[i - 1] : 0.25,
              transform: [{ scale: earned ? anims[i - 1] : 1 }],
            }}
          >
            <Star
              color={earned ? '#fbbf24' : '#475569'}
              fill={earned ? '#fbbf24' : 'transparent'}
              size={size}
            />
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
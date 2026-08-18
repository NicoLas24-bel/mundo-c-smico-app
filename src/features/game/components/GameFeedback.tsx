import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { CheckCircle, XCircle, Info, PartyPopper } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CONFIG: any = {
  success: {
    icon: CheckCircle,
    colors: ['rgba(22,163,74,0.95)', 'rgba(16,185,129,0.95)'],
    borderColor: 'rgba(74,222,128,0.4)',
    shadowColor: 'rgba(34,197,94,0.4)',
  },
  error: {
    icon: XCircle,
    colors: ['rgba(190,18,60,0.95)', 'rgba(239,68,68,0.95)'],
    borderColor: 'rgba(248,113,113,0.4)',
    shadowColor: 'rgba(244,63,94,0.4)',
  },
  info: {
    icon: Info,
    colors: ['rgba(37,99,235,0.95)', 'rgba(99,102,241,0.95)'],
    borderColor: 'rgba(165,180,252,0.4)',
    shadowColor: 'rgba(99,102,241,0.4)',
  },
  celebrate: {
    icon: PartyPopper,
    colors: ['rgba(124,58,237,0.95)', 'rgba(168,85,247,0.95)'],
    borderColor: 'rgba(196,181,253,0.4)',
    shadowColor: 'rgba(168,85,247,0.4)',
  },
};

export const GameFeedback = ({ feedback }: any) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (feedback.message) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          friction: 6,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      opacity.setValue(0);
      translateY.setValue(20);
    }
  }, [feedback.message]);

  if (!feedback.message) return null;

  const conf = CONFIG[feedback.type] || CONFIG.info;
  const Icon = conf.icon;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [{ translateY }],
          shadowColor: conf.shadowColor,
        }
      ]}
    >
      <LinearGradient
        colors={conf.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, { borderColor: conf.borderColor }]}
      >
        <Icon color="white" size={24} />
        <Text style={styles.text}>{feedback.message}</Text>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    zIndex: 50,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    gap: 8,
    minWidth: 180,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

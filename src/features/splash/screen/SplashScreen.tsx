import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { navigate } from '@/router';

const SPLASH_DURATION = 2800;

export function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate.toWelcome();
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1e1b4b', '#0f172a', '#0f172a']}
        locations={[0, 0.5, 1]}
        style={styles.background}
      />

      <SafeAreaView style={styles.safeArea}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <LinearGradient
            colors={['#1e1b4b', '#0f172a', '#0f172a']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoCircle}
          >
            <Animated.Image
              source={require('../../../../assets/images/icon/icon-remove.png')}
              style={[
                styles.logoImage,
                {
                  transform: [{ scale: 1 }],
                },
              ]}
              resizeMode="contain"
            />
          </LinearGradient>
        </View>

        <Text style={styles.logoTitle}>
          Mundo
        </Text>
        <Text style={styles.logoAccent}>Cosmico</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  background: {
    ...StyleSheet.absoluteFill,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoEmoji: {
    fontSize: 96,
    marginBottom: 24,
  },
  logoTitle: {
    fontSize: 42,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 1,
    textAlign: 'center',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 16,
  },
  logoAccent: {
    fontSize: 42,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 1,
    textAlign: 'center',
    textShadowColor: 'rgba(168,85,247,0.6)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 16,

  },
  logoContainer: {
    marginBottom: 20,
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.45,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  logoImage: {
    width: 150,
    height: 150,
  },
});
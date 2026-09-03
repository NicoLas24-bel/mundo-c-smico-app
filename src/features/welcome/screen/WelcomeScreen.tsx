import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler, Platform, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { PlayCircle, Settings, LogOut } from 'lucide-react-native';
import { navigate } from '@/router';
import { useSound } from '../../game/hooks/useSound';

export function WelcomeScreen() {
  const { playButton } = useSound();
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const heartbeat = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.18,
          duration: 220,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 220,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.delay(550),
        Animated.timing(pulse, {
          toValue: 1.08,
          duration: 180,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 180,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.delay(700),
      ])
    );
    heartbeat.start();
    return () => heartbeat.stop();
  }, [pulse]);

  const handleStart = () => {
    playButton();
    navigate.toMenu();
  };

  const handleSettings = () => {
    playButton();
    navigate.toSettings();
  };

  const handleExit = () => {
    playButton();
    if (Platform.OS !== 'web') {
      BackHandler.exitApp();
    }
  };

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
            colors={['#6366f1', '#a855f7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoCircle}
          >
            <Animated.Image
              source={require('../../../../assets/images/icon/icon-remove.png')}
              style={[
                styles.logoImage,
                {
                  transform: [{ scale: pulse }],
                },
              ]}
              resizeMode="contain"
            />
          </LinearGradient>
        </View>

        {/* Company badge */}
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>MundoCosmico.cl</Text>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Aprendo Inglés Jugando</Text>
          <Text style={styles.subtitle}>Juego educativo para todos</Text>
        </View>

        <Text style={styles.description}>
          Selecciona una palabra y toca la imagen para encontrar el objeto correcto.
        </Text>

        {/* Menu buttons */}
        <View style={styles.menu}>

          <TouchableOpacity activeOpacity={0.8} onPress={handleStart} style={styles.buttonWrapper}>
            <LinearGradient
              colors={['#6366f1', '#a855f7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <PlayCircle color="white" size={26} />
              <Text style={styles.buttonText}>COMENZAR</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSettings}
            style={[styles.buttonWrapper, styles.outlineButton]}
          >
            <Settings color="#c4b5fd" size={24} />
            <Text style={styles.outlineButtonText}>CONFIGURACIONES</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleExit}
            style={[styles.buttonWrapper, styles.exitButton]}
          >
            <LogOut color="#f87171" size={24} />
            <Text style={styles.exitButtonText}>SALIR</Text>
          </TouchableOpacity>

        </View>

        <Text style={styles.footerText}>© MundoMagico · Juego gratuito</Text>

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
  logoContainer: {
    marginBottom: 20,
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#a855f7',
    shadowOpacity: 0.45,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  logoImage: {
    width: 56,
    height: 56,
  },
  badgeContainer: {
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(168,85,247,0.12)',
    borderColor: 'rgba(168,85,247,0.4)',
    borderWidth: 1,
    marginBottom: 20,
  },
  badgeText: {
    color: '#e9d5ff',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 38,
    fontWeight: '900',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#a855f7',
    marginTop: 8,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    color: '#cbd5e1',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 40,
    maxWidth: 320,
  },
  menu: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    gap: 14,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 20,
    gap: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
  },
  outlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 20,
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(196,181,253,0.35)',
    borderWidth: 1,
  },
  outlineButtonText: {
    color: '#c4b5fd',
    fontSize: 18,
    fontWeight: '800',
  },
  exitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 20,
    gap: 12,
    backgroundColor: 'rgba(239,68,68,0.08)',
    borderColor: 'rgba(239,68,68,0.35)',
    borderWidth: 1,
  },
  exitButtonText: {
    color: '#f87171',
    fontSize: 18,
    fontWeight: '800',
  },
  footerText: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 12,
    marginTop: 40,
    fontWeight: '600',
  },
});
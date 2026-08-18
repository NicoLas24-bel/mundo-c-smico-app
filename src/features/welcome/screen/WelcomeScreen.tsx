import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { navigate } from '@/router';
import { useSound } from '../../game/hooks/useSound';
import { LinearGradient } from 'expo-linear-gradient';
import { PlayCircle, BookOpen, Star, Zap, Target } from 'lucide-react-native';

const FEATURES = [
  { icon: BookOpen, label: 'Many levels', desc: 'Progressive difficulty' },
  { icon: Target, label: 'Visual Match', desc: 'Click on the scene' },
  { icon: Zap, label: 'Instant Feedback', desc: 'Learn from mistakes' },
];

export function WelcomeScreen() {
  const { playButton } = useSound();

  const handleStart = () => {
    playButton();
    navigate.toMenu();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>

        {/* Hero Card */}
        <View>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.emoji}>🌍</Text>
            <Text style={styles.title}>Aprende Inglés Jugando</Text>
            <Text style={styles.subtitle}>Juego Educativo para Todos</Text>
          </View>

          <Text style={styles.description}>
            Selecciona una palabra, luego toca la imagen para encontrar el objeto correcto.
          </Text>

          {/* Start Button */}
          <TouchableOpacity activeOpacity={0.8} onPress={handleStart} style={styles.buttonWrapper}>
            <LinearGradient
              colors={['#6366f1', '#a855f7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <PlayCircle color="white" size={28} />
              <Text style={styles.buttonText}>COMENZAR</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Free to play
          </Text>

        </View>

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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  badgeContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderColor: 'rgba(99,102,241,0.5)',
    borderWidth: 1,
    gap: 8,
  },
  badgeText: {
    color: '#a5b4fc',
    fontSize: 14,
    fontWeight: 'bold',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 8,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#a855f7',
    marginTop: 8,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    color: '#cbd5e1',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 12,
  },
  featureLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  featureDesc: {
    color: '#94a3b8',
    fontSize: 12,
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 20,
    gap: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
  },
  footerText: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 12,
    marginTop: 24,
    fontWeight: '600',
  }
});

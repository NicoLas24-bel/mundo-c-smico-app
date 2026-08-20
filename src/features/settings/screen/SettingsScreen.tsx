import React, { useCallback, useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { ChevronLeft, Volume2, VolumeX, Timer } from 'lucide-react-native';
import { navigate } from '@/router';
import { loadSettings, saveSettings } from '../utils/settings';
import { useSound } from '../../game/hooks/useSound';

export function SettingsScreen() {
  const { playButton } = useSound();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [timerEnabled, setTimerEnabled] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      loadSettings().then((settings) => {
        if (active) {
          setSoundEnabled(settings.soundEnabled);
          setTimerEnabled(settings.timerEnabled);
        }
      });
      return () => {
        active = false;
      };
    }, [])
  );

  const handleToggleSound = (value: boolean) => {
    setSoundEnabled(value);
    saveSettings({ soundEnabled: value, timerEnabled });
    if (value) {
      playButton();
    }
  };

  const handleToggleTimer = (value: boolean) => {
    setTimerEnabled(value);
    saveSettings({ soundEnabled, timerEnabled: value });
    playButton();
  };

  const handleBack = () => {
    playButton();
    navigate.toWelcome();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} activeOpacity={0.7} style={styles.backButton}>
            <ChevronLeft color="white" size={24} />
          </TouchableOpacity>
          <Text style={styles.title}>Configuraciones</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Settings list */}
        <View style={styles.list}>
          <TouchableOpacity activeOpacity={0.9} style={styles.row} onPress={() => handleToggleSound(!soundEnabled)}>
            <View style={[styles.iconCircle, soundEnabled ? styles.iconCircleOn : styles.iconCircleOff]}>
              {soundEnabled ? (
                <Volume2 color="#a855f7" size={22} />
              ) : (
                <VolumeX color="#64748b" size={22} />
              )}
            </View>
            <View style={styles.rowInfo}>
              <Text style={styles.rowLabel}>Efectos de sonido</Text>
              <Text style={styles.rowDesc}>Sonidos del juego y botones</Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={handleToggleSound}
              trackColor={{ false: '#475569', true: '#a855f7' }}
              thumbColor="white"
            />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} style={styles.row} onPress={() => handleToggleTimer(!timerEnabled)}>
            <View style={[styles.iconCircle, timerEnabled ? styles.iconCircleOn : styles.iconCircleOff]}>
              <Timer color={timerEnabled ? '#a855f7' : '#64748b'} size={22} />
            </View>
            <View style={styles.rowInfo}>
              <Text style={styles.rowLabel}>Temporizador</Text>
              <Text style={styles.rowDesc}>Cuenta regresiva en el juego</Text>
            </View>
            <Switch
              value={timerEnabled}
              onValueChange={handleToggleTimer}
              trackColor={{ false: '#475569', true: '#a855f7' }}
              thumbColor="white"
            />
          </TouchableOpacity>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    gap: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSpacer: {
    width: 44,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  list: {
    paddingHorizontal: 16,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleOn: {
    backgroundColor: 'rgba(168,85,247,0.15)',
  },
  iconCircleOff: {
    backgroundColor: 'rgba(100,116,139,0.15)',
  },
  rowInfo: {
    flex: 1,
    gap: 2,
  },
  rowLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
  },
  rowDesc: {
    color: '#94a3b8',
    fontSize: 13,
  },
});
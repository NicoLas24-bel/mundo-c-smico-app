import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { navigate } from '@/router';

import { useColorScheme } from '@/shared/hooks/useColorScheme';
import { AppText } from '@/shared/components/ui/AppText';
import { Spacing } from '@/shared/theme';

export function DashboardScreen() {
  const { colors } = useColorScheme();


  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header con botón volver */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Pressable
            onPress={navigate.back}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <AppText style={[styles.backArrow, { color: colors.primary }]}>←</AppText>
            <AppText style={[styles.backLabel, { color: colors.primary }]}>Volver</AppText>
          </Pressable>
        </View>

        {/* Contenido principal */}
        <View style={styles.content}>
          <AppText variant="display" style={styles.title}>
            Hola
          </AppText>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  pressed: {
    opacity: 0.5,
  },
  backArrow: {
    fontSize: 22,
    fontWeight: '600',
  },
  backLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
});

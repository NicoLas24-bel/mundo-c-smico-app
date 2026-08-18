import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { navigate } from '@/router';

import { useColorScheme } from '@/shared/hooks/useColorScheme';
import { AppText } from '@/shared/components/ui/AppText';
import { dashboardStyles as styles } from '../style/dashboard.style';


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


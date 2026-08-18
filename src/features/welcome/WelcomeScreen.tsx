import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useColorScheme } from '@/shared/hooks/useColorScheme';
import { AppText } from '@/shared/components/ui/AppText';

import { WelcomeButton } from './components/WelcomeButton';
import { welcomeStyles as styles } from './welcome.styles';

export function WelcomeScreen() {
  const { colors } = useColorScheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        {/* Badge */}
        <View
          style={[
            styles.badge,
            { backgroundColor: colors.primaryLight, borderColor: colors.primary },
          ]}
        >
          <AppText
            style={[styles.badgeText, { color: colors.primary }]}
          >
            Mi App
          </AppText>
        </View>

        {/* Headline */}
        <AppText variant="display" style={styles.title}>
          Bienvenido 👋
        </AppText>

        {/* Subtitle */}
        <AppText
          variant="subtitle"
          style={styles.subtitle}
          color={colors.textSecondary}
        >
          Tu punto de partida. Limpio, escalable y listo para crecer.
        </AppText>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <WelcomeButton label="Comenzar" variant="primary" />
          <WelcomeButton label="Saber más" variant="secondary" />
        </View>
      </SafeAreaView>

      {/* Footer */}
      <AppText variant="caption" style={styles.footer} color={colors.textSecondary}>
        v1.0.0
      </AppText>
    </View>
  );
}

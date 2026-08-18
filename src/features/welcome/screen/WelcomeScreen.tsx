import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { navigate } from '@/router';

import { useColorScheme } from '@/shared/hooks/useColorScheme';
import { AppText } from '@/shared/components/ui/AppText';

import { WelcomeButton } from '../components/WelcomeButton';
import { welcomeStyles as styles } from '../style/welcome.styles';

export function WelcomeScreen() {
  const { colors } = useColorScheme();


  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <View
          style={[
            styles.badge,
            { backgroundColor: colors.primaryLight, borderColor: colors.primary },
          ]}
        >
          <AppText
            style={[styles.badgeText, { color: colors.primary }]}
          >
            GO app
          </AppText>
        </View>

        <AppText variant="display" style={styles.title}>
          Bienvenido
        </AppText>

        <AppText
          variant="subtitle"
          style={styles.subtitle}
          color={colors.textSecondary}
        >
          Tu punto de partida hacia una nueva experiencia
        </AppText>

        <View style={styles.actionsContainer}>
          <WelcomeButton
            label="Comenzar"
            variant="primary"
            onPress={navigate.toDashboard}
          />
        </View>
      </SafeAreaView>

      <AppText variant="caption" style={styles.footer} color={colors.textSecondary}>
        v1.0.0
      </AppText>
    </View>
  );
}

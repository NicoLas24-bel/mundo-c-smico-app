import React from 'react';
import {
  Pressable,
  StyleSheet,
  type PressableProps,
  type ViewStyle,
} from 'react-native';

import { useColorScheme } from '@/shared/hooks/useColorScheme';
import { AppText } from '@/shared/components/ui/AppText';
import { Spacing, Radius, FontSize, FontWeight } from '@/shared/theme';

interface WelcomeButtonProps extends PressableProps {
  label: string;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
}

export function WelcomeButton({
  label,
  variant = 'primary',
  style,
  ...props
}: WelcomeButtonProps) {
  const { colors } = useColorScheme();

  const isPrimary = variant === 'primary';

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        isPrimary
          ? { backgroundColor: colors.primary }
          : {
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: colors.border,
            },
        pressed && styles.pressed,
        style,
      ]}
      {...props}
    >
      <AppText
        style={[
          styles.label,
          {
            color: isPrimary ? '#FFFFFF' : colors.text,
          },
        ]}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  label: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
  },
});

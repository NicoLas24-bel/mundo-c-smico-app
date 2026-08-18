import React from 'react';
import { Text, type TextProps, StyleSheet } from 'react-native';

import { useColorScheme } from '@/shared/hooks/useColorScheme';
import { FontSize, FontWeight } from '@/shared/theme';

type Variant = 'display' | 'title' | 'subtitle' | 'body' | 'caption' | 'code';

interface AppTextProps extends TextProps {
  variant?: Variant;
  color?: string;
  bold?: boolean;
}

export function AppText({
  variant = 'body',
  color,
  bold,
  style,
  ...props
}: AppTextProps) {
  const { colors } = useColorScheme();

  return (
    <Text
      style={[
        styles.base,
        variantStyles[variant],
        bold && styles.bold,
        { color: color ?? colors.text },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    fontWeight: FontWeight.regular,
  },
  bold: {
    fontWeight: FontWeight.bold,
  },
});

const variantStyles = StyleSheet.create({
  display: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.extrabold,
    letterSpacing: -0.5,
    lineHeight: 46,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    letterSpacing: -0.3,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.medium,
    lineHeight: 28,
  },
  body: {
    fontSize: FontSize.base,
    lineHeight: 22,
  },
  caption: {
    fontSize: FontSize.sm,
    lineHeight: 18,
  },
  code: {
    fontSize: FontSize.sm,
    fontFamily: 'monospace',
  },
});

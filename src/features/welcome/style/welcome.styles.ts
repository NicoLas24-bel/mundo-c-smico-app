import { StyleSheet } from 'react-native';

import { Spacing, Radius, FontSize, FontWeight,  } from '@/shared/theme';

export const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  badgeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.65,
    maxWidth: 280,
  },
  actionsContainer: {
    marginTop: Spacing.lg,
    borderRadius: Radius.full,
    alignSelf: 'stretch',
    alignItems: 'center',

  },
  footer: {
    position: 'absolute',
    bottom: Spacing.lg,
    opacity: 0.4,
  },
});

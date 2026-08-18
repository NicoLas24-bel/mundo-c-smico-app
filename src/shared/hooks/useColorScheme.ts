import { useColorScheme as useRNColorScheme } from 'react-native';

import { Colors, type ColorScheme, type ThemeColor } from '@/shared/theme';

/**
 * Returns the current color scheme ('light' | 'dark') and a helper
 * to resolve the right color token for the active theme.
 */
export function useColorScheme() {
  const scheme = (useRNColorScheme() ?? 'light') as ColorScheme;
  const isDark = scheme === 'dark';

  function color(token: ThemeColor): string {
    return Colors[scheme][token];
  }

  return { scheme, isDark, color, colors: Colors[scheme] };
}

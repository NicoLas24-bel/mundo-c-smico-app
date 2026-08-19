export const Routes = {
  splash: '/' as const,
  welcome: '/welcome' as const,
  dashboard: '/dashboard' as const,
  menu: '/menu' as const,
  settings: '/settings' as const,
} satisfies Record<string, string>;

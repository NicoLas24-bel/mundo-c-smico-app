export const Routes = {
  welcome: '/' as const,
  dashboard: '/dashboard' as const,
} satisfies Record<string, string>;

export const Routes = {
  welcome: '/' as const,
  dashboard: '/dashboard' as const,
  menu: '/menu' as const,
} satisfies Record<string, string>;

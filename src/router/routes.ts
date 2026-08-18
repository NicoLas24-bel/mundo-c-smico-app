/**
 * Centralized route definitions.
 * All route paths are defined here to avoid magic strings across the app.
 */
export const Routes = {
  welcome: '/' as const,
  dashboard: '/dashboard' as const,
} satisfies Record<string, string>;

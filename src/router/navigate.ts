import { router } from 'expo-router';

import { Routes } from './routes';

export const navigate = {
  toDashboard: () => router.push(Routes.dashboard),
  toWelcome: () => router.replace(Routes.welcome),
  back: () => router.back(),
};

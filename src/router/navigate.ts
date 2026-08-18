import { router } from 'expo-router';

import { Routes } from './routes';

export const navigate = {
  toDashboard: () => router.push(Routes.dashboard),
  toWelcome: () => router.replace(Routes.welcome),
  toMenu: () => router.push(Routes.menu),
  toSettings: () => router.push(Routes.settings),
  back: () => router.back(),
};

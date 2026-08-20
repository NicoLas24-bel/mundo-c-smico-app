import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_KEY = 'app_settings';

export type AppSettings = {
  soundEnabled: boolean;
  timerEnabled: boolean;
};

const DEFAULT_SETTINGS: AppSettings = { soundEnabled: true, timerEnabled: true };

let cached: AppSettings = { ...DEFAULT_SETTINGS };

export const loadSettings = async (): Promise<AppSettings> => {
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_KEY);
    cached = raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : { ...DEFAULT_SETTINGS };
  } catch {
    cached = { ...DEFAULT_SETTINGS };
  }
  return cached;
};

export const getSettings = (): AppSettings => cached;

export const saveSettings = async (settings: AppSettings): Promise<void> => {
  cached = settings;
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // Ignore persistence errors, keep in-memory value.
  }
};
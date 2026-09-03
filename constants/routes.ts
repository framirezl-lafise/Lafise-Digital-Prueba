import type { Href } from 'expo-router';

export const appRoutes = {
  home: '/(tabs)' as Href,
  transfer: '/transfer' as Href,
  confirm: '/transfer/confirm' as Href,
  success: '/transfer/success' as Href,
};

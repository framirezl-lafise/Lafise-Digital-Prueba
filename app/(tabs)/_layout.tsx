import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LocalImage } from '@/components/ui/local-image';
import { images } from '@/constants/images';
import { palette } from '@/constants/theme';
import { tabBarHeight } from '@/utils/safe-area';

const TAB_BAR_CONTENT_HEIGHT = 56;

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 0);

  return (
    <Tabs
      safeAreaInsets={{ bottom: 0 }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: palette.primary,
        tabBarInactiveTintColor: palette.textMuted,
        tabBarLabelStyle: styles.label,
        tabBarStyle: [
          styles.bar,
          {
            height: tabBarHeight(bottomInset, TAB_BAR_CONTENT_HEIGHT),
            paddingBottom: bottomInset,
          },
        ],
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ focused }) => (
            <LocalImage source={images.homeTab} style={[styles.icon, !focused && styles.dim]} />
          ),
        }}
      />
      <Tabs.Screen
        name="operaciones"
        options={{
          title: 'Operaciones',
          tabBarIcon: ({ focused }) => (
            <LocalImage source={images.operationsTab} style={[styles.icon, !focused && styles.dim]} />
          ),
        }}
      />
      <Tabs.Screen
        name="productos"
        options={{
          title: 'Productos',
          tabBarIcon: ({ focused }) => (
            <LocalImage source={images.productsTab} style={[styles.icon, !focused && styles.dim]} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    paddingTop: 8,
    backgroundColor: palette.surface,
    borderTopColor: palette.border,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
  icon: {
    width: 22,
    height: 22,
  },
  dim: {
    opacity: 0.45,
  },
});

import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

import { LocalImage } from '@/components/ui/local-image';
import { images } from '@/constants/images';
import { palette } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: palette.primary,
        tabBarInactiveTintColor: palette.textMuted,
        tabBarLabelStyle: styles.label,
        tabBarStyle: styles.bar,
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
    height: 68,
    paddingTop: 8,
    paddingBottom: 10,
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

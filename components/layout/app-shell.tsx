import { StatusBar } from 'expo-status-bar';
import { type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { layout, palette } from '@/constants/theme';

type AppShellProps = {
  children: ReactNode;
  backgroundColor?: string;
  statusBarStyle?: 'light' | 'dark' | 'auto';
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  contentStyle?: StyleProp<ViewStyle>;
};

export function AppShell({
  children,
  backgroundColor = palette.background,
  statusBarStyle = 'dark',
  edges = ['top', 'left', 'right'],
  contentStyle,
}: AppShellProps) {
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor }]} edges={edges}>
      <StatusBar style={statusBarStyle} />
      <View style={[styles.frame, contentStyle]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    alignItems: 'center',
  },
  frame: {
    flex: 1,
    width: '100%',
    maxWidth: layout.maxWidth,
    alignSelf: 'center',
  },
});

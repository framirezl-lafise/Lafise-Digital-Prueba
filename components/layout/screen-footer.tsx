import { type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing } from '@/constants/theme';
import { bottomContentPadding } from '@/utils/safe-area';

type ScreenFooterProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function ScreenFooter({ children, style }: ScreenFooterProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.footer,
        { paddingBottom: bottomContentPadding(insets.bottom, spacing.xl) },
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
  },
});

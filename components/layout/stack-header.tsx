import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { palette, spacing } from '@/constants/theme';

type StackHeaderProps = {
  title: string;
  onBack: () => void;
};

export function StackHeader({ title, onBack }: StackHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable
        onPress={onBack}
        hitSlop={12}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        style={styles.back}>
        <Ionicons name="chevron-back" size={24} color={palette.text} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.back} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  back: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: palette.text,
  },
});

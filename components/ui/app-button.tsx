import { Pressable, StyleSheet, Text, type PressableProps } from 'react-native';

import { palette, radius, spacing } from '@/constants/theme';

type AppButtonProps = PressableProps & {
  label: string;
  disabled?: boolean;
};

export function AppButton({ label, disabled, style, ...props }: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: Boolean(disabled) }}
      disabled={disabled}
      style={(state) => [
        styles.base,
        disabled ? styles.disabled : styles.enabled,
        state.pressed && !disabled ? styles.pressed : null,
        typeof style === 'function' ? style(state) : style,
      ]}
      {...props}>
      <Text style={[styles.label, disabled ? styles.labelDisabled : styles.labelEnabled]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 56,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  enabled: {
    backgroundColor: palette.primary,
  },
  disabled: {
    backgroundColor: palette.disabled,
  },
  pressed: {
    opacity: 0.88,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
  labelEnabled: {
    color: palette.textOnPrimary,
  },
  labelDisabled: {
    color: palette.disabledText,
  },
});

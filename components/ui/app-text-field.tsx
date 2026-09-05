import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { LocalImage } from '@/components/ui/local-image';
import { images } from '@/constants/images';
import { palette, radius, spacing } from '@/constants/theme';

type AppTextFieldProps = TextInputProps & {
  showEditIcon?: boolean;
  error?: boolean;
};

export function AppTextField({ showEditIcon, error, style, ...props }: AppTextFieldProps) {
  return (
    <View style={styles.wrap}>
      <TextInput
        placeholderTextColor={palette.textMuted}
        style={[
          styles.input,
          showEditIcon ? styles.inputWithIcon : null,
          error ? styles.inputError : null,
          style,
        ]}
        {...props}
      />
      {showEditIcon ? (
        <View style={styles.icon} pointerEvents="none">
          <LocalImage source={images.edit} style={styles.edit} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    fontSize: 16,
    color: palette.text,
    backgroundColor: palette.surface,
  },
  inputWithIcon: {
    paddingRight: 44,
  },
  inputError: {
    borderColor: palette.danger,
  },
  icon: {
    position: 'absolute',
    right: spacing.md,
    height: '100%',
    justifyContent: 'center',
  },
  edit: {
    width: 16,
    height: 16,
  },
});

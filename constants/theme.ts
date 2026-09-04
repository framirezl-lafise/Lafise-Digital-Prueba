export const palette = {
  primary: '#018765',
  primaryDark: '#015C45',
  primaryMuted: '#33BA75',
  primarySoft: '#E7F6F0',
  homeStart: '#017A5C',
  homeEnd: '#015C45',
  text: '#1C1C1C',
  textSecondary: '#5F5F5F',
  textMuted: '#8D8D8D',
  textOnPrimary: '#FFFFFF',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  border: '#E3E3E3',
  danger: '#D32F2F',
  disabled: '#E8E8E8',
  disabledText: '#A3A3A3',
  confirmIconBg: '#D7ECFA',
  confirmIcon: '#4AA3D9',
  actionTransferBg: '#D9F3EA',
  actionPayBg: '#FBE8D4',
  actionTopupBg: '#DCEBFA',
  actionWithdrawBg: '#E8DFF8',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
} as const;

export const layout = {
  maxWidth: 480,
  hitSlop: 8,
} as const;

export const Colors = {
  light: {
    text: palette.text,
    background: palette.background,
    tint: palette.primary,
    icon: palette.textMuted,
    tabIconDefault: palette.textMuted,
    tabIconSelected: palette.primary,
  },
  dark: {
    text: palette.textOnPrimary,
    background: palette.homeEnd,
    tint: palette.primaryMuted,
    icon: palette.textMuted,
    tabIconDefault: palette.textMuted,
    tabIconSelected: palette.primaryMuted,
  },
} as const;

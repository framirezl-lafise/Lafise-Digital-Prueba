import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Redirect, useRouter } from 'expo-router';
import { AccessibilityInfo, StyleSheet, Text, View } from 'react-native';

import { AppShell } from '@/components/layout/app-shell';
import { ScreenFooter } from '@/components/layout/screen-footer';
import { StackHeader } from '@/components/layout/stack-header';
import { AppButton } from '@/components/ui/app-button';
import { appRoutes } from '@/constants/routes';
import { palette, spacing } from '@/constants/theme';
import { useSuccessTransitionStore } from '@/features/transfer/success-transition';
import { useTransferStore } from '@/store/transfer-store';
import { formatCordobas } from '@/utils/currency';

export function TransferConfirmScreen() {
  const router = useRouter();
  const draft = useTransferStore((state) => state.draft);
  const markCompleted = useTransferStore((state) => state.markCompleted);
  const startTransition = useSuccessTransitionStore((state) => state.start);
  const isTransitioning = useSuccessTransitionStore((state) => state.status === 'playing');

  if (!draft) {
    return <Redirect href={appRoutes.transfer} />;
  }

  async function onConfirm() {
    markCompleted();
    const reduceMotion = await AccessibilityInfo.isReduceMotionEnabled();
    if (!reduceMotion) {
      startTransition();
    }
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
    router.push(appRoutes.success);
  }

  return (
    <AppShell>
      <StackHeader title="Confirma tu envío" onBack={() => router.back()} />
      <View style={styles.body}>
        <View style={styles.iconWrap}>
          <Ionicons name="phone-portrait-outline" size={42} color={palette.confirmIcon} />
        </View>
        <Text style={styles.totalLabel}>Total a enviar</Text>
        <Text style={styles.amount}>{formatCordobas(draft.amount)}</Text>

        <View style={styles.details}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Al número de cuenta</Text>
            <Text style={styles.rowValue}>{draft.destinationAccount}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Cuenta a utilizar para el envío</Text>
            <Text style={styles.rowValue}>{draft.originAccount}</Text>
          </View>
        </View>
      </View>
      <ScreenFooter>
        <AppButton label="Confirmar el envío" onPress={onConfirm} disabled={isTransitioning} />
      </ScreenFooter>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    paddingTop: spacing.xxl,
  },
  iconWrap: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: palette.confirmIconBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  totalLabel: {
    color: palette.textMuted,
    fontSize: 14,
  },
  amount: {
    marginTop: spacing.sm,
    fontSize: 36,
    fontWeight: '700',
    color: palette.text,
  },
  details: {
    width: '100%',
    marginTop: spacing.xxl,
    gap: spacing.lg,
  },
  row: {
    gap: spacing.xs,
  },
  rowLabel: {
    color: palette.textMuted,
    fontSize: 14,
  },
  rowValue: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: palette.border,
  },
});

import { Redirect, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppShell } from '@/components/layout/app-shell';
import { ScreenFooter } from '@/components/layout/screen-footer';
import { AppButton } from '@/components/ui/app-button';
import { LocalImage } from '@/components/ui/local-image';
import { images } from '@/constants/images';
import { appRoutes } from '@/constants/routes';
import { palette, spacing } from '@/constants/theme';
import { useTransferStore } from '@/store/transfer-store';
import { formatCordobas } from '@/utils/currency';
import { formatTransferTimestamp } from '@/utils/datetime';

export function TransferSuccessScreen() {
  const router = useRouter();
  const draft = useTransferStore((state) => state.draft);
  const completedAt = useTransferStore((state) => state.completedAt);
  const reset = useTransferStore((state) => state.reset);

  if (!draft || !completedAt) {
    return <Redirect href={appRoutes.home} />;
  }

  function goHome() {
    reset();
    router.replace(appRoutes.home);
  }

  return (
    <AppShell edges={['left', 'right']}>
      <View style={styles.hero}>
        <LocalImage source={images.homeBackground} style={styles.heroArt} contentFit="cover" />
        <LocalImage source={images.successCheck} style={styles.check} />
        <Text style={styles.title}>Envío con éxito</Text>
        <Text style={styles.timestamp}>{formatTransferTimestamp(completedAt)}</Text>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Resumen de tu envío</Text>
        <SummaryRow label="Total enviado" value={formatCordobas(draft.amount)} />
        <SummaryRow label="Al número de cuenta" value={draft.destinationAccount} />
        <SummaryRow label="Cuenta utilizada para el envío" value={draft.originAccount} />
      </View>

      <ScreenFooter>
        <AppButton label="Volver al inicio" onPress={goHome} />
      </ScreenFooter>
    </AppShell>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: palette.primarySoft,
    alignItems: 'center',
    paddingTop: 72,
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.xl,
    overflow: 'hidden',
  },
  heroArt: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.18,
  },
  check: {
    width: 72,
    height: 72,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: palette.text,
  },
  timestamp: {
    marginTop: spacing.sm,
    color: palette.textMuted,
  },
  summary: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    gap: spacing.lg,
  },
  summaryTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
    marginBottom: spacing.sm,
  },
  row: {
    gap: spacing.xs,
  },
  rowLabel: {
    color: palette.textMuted,
  },
  rowValue: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '600',
  },
});

import { Redirect, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppShell } from "@/components/layout/app-shell";
import { ScreenFooter } from "@/components/layout/screen-footer";
import { AppButton } from "@/components/ui/app-button";
import { LocalImage } from "@/components/ui/local-image";
import { images } from "@/constants/images";
import { appRoutes } from "@/constants/routes";
import { palette, spacing } from "@/constants/theme";
import { useTransferStore } from "@/store/transfer-store";
import { formatCordobas } from "@/utils/currency";
import { formatTransferTimestamp } from "@/utils/datetime";

export function TransferSuccessScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
    <AppShell backgroundColor={palette.background} edges={["left", "right"]}>
      <View style={styles.hero}>
        <LocalImage
          source={images.successGlow}
          style={styles.glow}
          contentFit="cover"
        />
        <View
          style={[styles.heroContent, { paddingTop: insets.top + spacing.xl }]}
        >
          <View style={styles.iconStage}>
            <View style={[styles.spark, styles.sparkArcLeft]} />
            <View style={[styles.spark, styles.sparkArcRight]} />
            <View style={[styles.sparkDot, { top: 8, left: 28 }]} />
            <View style={[styles.sparkSquare, { top: 18, right: 22 }]} />
            <View style={[styles.sparkDot, { bottom: 28, left: 18 }]} />
            <View style={[styles.sparkSquare, { bottom: 22, right: 32 }]} />
            <View style={styles.ring}>
              <LocalImage source={images.successCheck} style={styles.check} />
            </View>
          </View>
          <Text style={styles.title}>Envío con éxito</Text>
          <Text style={styles.timestamp}>
            {formatTransferTimestamp(completedAt)}
          </Text>
        </View>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Resumen de tu envío</Text>
        <SummaryRow
          label="Total enviado"
          value={formatCordobas(draft.amount)}
        />
        <SummaryRow
          label="Al número de cuenta"
          value={draft.destinationAccount}
        />
        <SummaryRow
          label="Cuenta utilizada para el envío"
          value={draft.originAccount}
        />
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

const ACCENT = palette.primaryMuted;

const styles = StyleSheet.create({
  hero: {
    backgroundColor: palette.background,
    overflow: "hidden",
  },
  glow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 195,
    width: "100%",
  },
  heroContent: {
    alignItems: "center",
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
  iconStage: {
    width: 168,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  ring: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: palette.surface,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#018765",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  check: {
    width: 71,
    height: 71,
  },
  spark: {
    position: "absolute",
    borderColor: ACCENT,
    borderWidth: 2,
  },
  sparkArcLeft: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    top: 10,
    left: 8,
    transform: [{ rotate: "-20deg" }],
  },
  sparkArcRight: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderLeftColor: "transparent",
    borderTopColor: "transparent",
    top: 6,
    right: 10,
    transform: [{ rotate: "25deg" }],
  },
  sparkDot: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: ACCENT,
  },
  sparkSquare: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 1,
    backgroundColor: ACCENT,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: palette.text,
    textAlign: "center",
    paddingTop: 26,
  },
  timestamp: {
    marginTop: spacing.sm,
    color: palette.textMuted,
    textAlign: "center",
  },
  summary: {
    flex: 1,
    width: "100%",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    gap: spacing.lg,
    alignItems: "center",
  },
  summaryTitle: {
    alignSelf: "stretch",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: palette.text,
    marginBottom: spacing.sm,
  },
  row: {
    alignSelf: "stretch",
    gap: spacing.xs,
    alignItems: "center",
  },
  rowLabel: {
    alignSelf: "stretch",
    textAlign: "center",
    color: palette.textMuted,
  },
  rowValue: {
    alignSelf: "stretch",
    textAlign: "center",
    color: palette.text,
    fontSize: 16,
    fontWeight: "600",
  },
});

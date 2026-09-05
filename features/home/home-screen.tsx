import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppShell } from '@/components/layout/app-shell';
import { LocalImage } from '@/components/ui/local-image';
import { CURRENT_USER, PAYROLL, SAVINGS_ACCOUNT } from '@/constants/accounts';
import { images } from '@/constants/images';
import { appRoutes } from '@/constants/routes';
import { palette, radius, spacing } from '@/constants/theme';
import { useTransferStore } from '@/store/transfer-store';
import { formatCordobas, formatNio } from '@/utils/currency';

const QUICK_ACTIONS = [
  { key: 'transfer', label: 'Transferir Dinero', background: palette.actionTransferBg, image: images.transfer },
  { key: 'pay', label: 'Pagar Servicio', background: palette.actionPayBg, image: images.payService },
  { key: 'topup', label: 'Recargar celular', background: palette.actionTopupBg, image: null },
  { key: 'withdraw', label: 'Retiro sin tarjeta', background: palette.actionWithdrawBg, image: images.withdraw },
] as const;

export function HomeScreen() {
  const router = useRouter();
  const reset = useTransferStore((state) => state.reset);

  function openTransfer() {
    reset();
    router.push(appRoutes.transfer);
  }

  function openComingSoon() {
    router.push(appRoutes.comingSoon);
  }

  return (
    <View style={styles.root}>
      <LinearGradient colors={[palette.homeStart, palette.homeEnd]} style={StyleSheet.absoluteFill} />
      <LocalImage source={images.homeBackground} style={styles.bgArt} contentFit="cover" />
      <AppShell backgroundColor="transparent" statusBarStyle="light" contentStyle={styles.shell}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.greetingRow}>
            <View style={styles.greetingLeft}>
              <LocalImage source={images.logo} style={styles.logo} />
              <Text style={styles.hello}>Hola, {CURRENT_USER.firstName}</Text>
            </View>
            <LocalImage source={images.avatar} style={styles.avatar} />
          </View>

          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitleLight}>Mis productos</Text>
            <Ionicons name="search" size={18} color={palette.textOnPrimary} />
          </View>

          <View style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.flex}>
                <Text style={styles.productName}>{SAVINGS_ACCOUNT.label}</Text>
                <Text style={styles.productNumber}>{SAVINGS_ACCOUNT.number}</Text>
              </View>
              <Pressable onPress={openTransfer} accessibilityLabel="Transfer from this account">
                <LocalImage source={images.send} style={styles.sendIcon} />
              </Pressable>
            </View>
            <Text style={styles.balanceLabel}>Saldo disponible</Text>
            <Text style={styles.balance}>{formatNio(SAVINGS_ACCOUNT.balance)}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitleDark}>Operaciones rápidas</Text>
            <View style={styles.actions}>
              {QUICK_ACTIONS.map((action) => (
                <Pressable
                  key={action.key}
                  style={styles.action}
                  onPress={action.key === 'transfer' ? openTransfer : openComingSoon}
                  accessibilityRole="button"
                  accessibilityLabel={action.label}>
                  <View style={[styles.actionIcon, { backgroundColor: action.background }]}>
                    {action.image ? (
                      <LocalImage source={action.image} style={styles.actionImage} />
                    ) : (
                      <Ionicons name="phone-portrait-outline" size={22} color="#2563EB" />
                    )}
                  </View>
                  <Text style={styles.actionLabel}>{action.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={[styles.card, styles.payroll]}>
            <View style={styles.payrollLeft}>
              <View style={styles.payrollIcon}>
                <LocalImage source={images.payroll} style={styles.payrollImage} />
              </View>
              <Text style={styles.payrollLabel}>{PAYROLL.label}</Text>
            </View>
            <Text style={styles.payrollAmount}>{formatCordobas(PAYROLL.amount)}</Text>
          </View>
        </ScrollView>
      </AppShell>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.homeEnd,
  },
  bgArt: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.22,
  },
  shell: {
    backgroundColor: 'transparent',
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  greetingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  logo: {
    width: 32,
    height: 32,
  },
  hello: {
    color: palette.textOnPrimary,
    fontSize: 22,
    fontWeight: '700',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitleLight: {
    color: palette.textOnPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  sectionTitleDark: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  flex: {
    flex: 1,
  },
  productName: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '600',
  },
  productNumber: {
    color: palette.textMuted,
    marginTop: 2,
  },
  sendIcon: {
    width: 22,
    height: 19,
  },
  balanceLabel: {
    color: palette.textMuted,
    fontSize: 14,
  },
  balance: {
    color: palette.text,
    fontSize: 28,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  action: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.sm,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionImage: {
    width: 24,
    height: 24,
  },
  actionLabel: {
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 14,
    color: palette.text,
    fontWeight: '600',
  },
  payroll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  payrollLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  payrollIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payrollImage: {
    width: 14,
    height: 14,
  },
  payrollLabel: {
    flex: 1,
    color: palette.text,
    fontWeight: '600',
  },
  payrollAmount: {
    color: palette.text,
    fontWeight: '700',
  },
});

import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';

import { AppShell } from '@/components/layout/app-shell';
import { StackHeader } from '@/components/layout/stack-header';
import { AppButton } from '@/components/ui/app-button';
import { AppTextField } from '@/components/ui/app-text-field';
import { appRoutes } from '@/constants/routes';
import { palette, spacing } from '@/constants/theme';
import { useTransferStore } from '@/store/transfer-store';
import { normalizeAccountNumber } from '@/utils/account-number';
import { formatAmountInput, parseCordobaAmount } from '@/utils/currency';
import { canSubmitTransfer } from '@/utils/transfer';

export function TransferFormScreen() {
  const router = useRouter();
  const draft = useTransferStore((state) => state.draft);
  const saveDraft = useTransferStore((state) => state.saveDraft);

  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (!draft) {
      return;
    }

    setAccountNumber(draft.destinationAccount);
    setAmount(formatAmountInput(String(draft.amount)));
  }, [draft]);

  const canSubmit = canSubmitTransfer(accountNumber, amount);

  function onSubmit() {
    const parsedAmount = parseCordobaAmount(amount);
    if (!parsedAmount) {
      return;
    }

    saveDraft({
      destinationAccount: normalizeAccountNumber(accountNumber),
      amount: parsedAmount,
    });
    router.push(appRoutes.confirm);
  }

  return (
    <AppShell>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <StackHeader title="Transferir dinero" onBack={() => router.back()} />
        <View style={styles.body}>
          <Text style={styles.question}>¿A quién le enviarás dinero hoy?</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Ingresa el número de cuenta</Text>
            <AppTextField
              value={accountNumber}
              onChangeText={(value) => setAccountNumber(normalizeAccountNumber(value))}
              placeholder="N. de cuenta"
              keyboardType="number-pad"
              showEditIcon={accountNumber.length > 0}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>¿Cuánto dinero le enviarás?</Text>
            <AppTextField
              value={amount}
              onChangeText={(value) => setAmount(formatAmountInput(value))}
              placeholder="C$0"
              keyboardType="number-pad"
              showEditIcon={amount.length > 0}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <AppButton label="Enviar" disabled={!canSubmit} onPress={onSubmit} />
        </View>
      </KeyboardAvoidingView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    gap: spacing.xl,
  },
  question: {
    fontSize: 22,
    fontWeight: '700',
    color: palette.text,
  },
  field: {
    gap: spacing.sm,
  },
  label: {
    fontSize: 14,
    color: palette.textSecondary,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
});

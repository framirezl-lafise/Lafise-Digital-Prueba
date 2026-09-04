import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';

import { AppShell } from '@/components/layout/app-shell';
import { ScreenFooter } from '@/components/layout/screen-footer';
import { StackHeader } from '@/components/layout/stack-header';
import { AppButton } from '@/components/ui/app-button';
import { AppTextField } from '@/components/ui/app-text-field';
import { SAVINGS_ACCOUNT } from '@/constants/accounts';
import { appRoutes } from '@/constants/routes';
import { palette, spacing } from '@/constants/theme';
import { useTransferStore } from '@/store/transfer-store';
import { ACCOUNT_MAX_DIGITS, isValidAccountNumber, limitAccountDigits } from '@/utils/account-number';
import { formatAmountInput, parseCordobaAmount } from '@/utils/currency';
import { canSubmitTransfer, exceedsAvailableBalance } from '@/utils/transfer';

export function TransferFormScreen() {
  const router = useRouter();
  const draft = useTransferStore((state) => state.draft);
  const saveDraft = useTransferStore((state) => state.saveDraft);

  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [accountTouched, setAccountTouched] = useState(false);

  useEffect(() => {
    if (!draft) {
      return;
    }

    setAccountNumber(draft.destinationAccount);
    setAmount(formatAmountInput(String(draft.amount)));
  }, [draft]);

  const showAccountError = accountTouched && !isValidAccountNumber(accountNumber);
  const showAmountError = exceedsAvailableBalance(amount, SAVINGS_ACCOUNT.balance);
  const canSubmit = canSubmitTransfer(accountNumber, amount, SAVINGS_ACCOUNT.balance);

  function onSubmit() {
    setAccountTouched(true);
    const parsedAmount = parseCordobaAmount(amount);
    if (!canSubmit || !parsedAmount) {
      return;
    }

    saveDraft({
      destinationAccount: accountNumber,
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
              onChangeText={(value) => {
                setAccountTouched(true);
                setAccountNumber(limitAccountDigits(value));
              }}
              onBlur={() => setAccountTouched(true)}
              placeholder="N. de cuenta"
              keyboardType="number-pad"
              maxLength={ACCOUNT_MAX_DIGITS}
              showEditIcon={accountNumber.length > 0}
              error={showAccountError}
            />
            {showAccountError ? (
              <Text style={styles.error}>Tiene que ingresar un numero de Cuenta valido</Text>
            ) : null}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>¿Cuánto dinero le enviarás?</Text>
            <AppTextField
              value={amount}
              onChangeText={(value) => setAmount(formatAmountInput(value))}
              placeholder="C$0"
              keyboardType="number-pad"
              showEditIcon={amount.length > 0}
              error={showAmountError}
            />
            {showAmountError ? (
              <Text style={styles.error}>Monto enviar mayor que el saldo disponible</Text>
            ) : null}
          </View>
        </View>
        <ScreenFooter>
          <AppButton label="Enviar" disabled={!canSubmit} onPress={onSubmit} />
        </ScreenFooter>
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
  error: {
    color: palette.danger,
    fontSize: 13,
    marginTop: spacing.xs,
  },
});

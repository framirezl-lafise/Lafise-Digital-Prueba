import { isValidAccountNumber } from '@/utils/account-number';
import { parseCordobaAmount } from '@/utils/currency';

export function exceedsAvailableBalance(amountInput: string, availableBalance: number): boolean {
  const amount = parseCordobaAmount(amountInput);
  return amount !== null && amount > availableBalance;
}

export function canSubmitTransfer(
  accountNumber: string,
  amountInput: string,
  availableBalance: number,
): boolean {
  const amount = parseCordobaAmount(amountInput);
  return (
    isValidAccountNumber(accountNumber) &&
    amount !== null &&
    !exceedsAvailableBalance(amountInput, availableBalance)
  );
}

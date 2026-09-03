import { isValidAccountNumber } from '@/utils/account-number';
import { parseCordobaAmount } from '@/utils/currency';

export function canSubmitTransfer(accountNumber: string, amountInput: string): boolean {
  const amount = parseCordobaAmount(amountInput);
  return isValidAccountNumber(accountNumber) && amount !== null;
}

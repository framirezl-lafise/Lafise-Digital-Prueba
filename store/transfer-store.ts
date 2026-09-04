import { create } from 'zustand';

import { ORIGIN_ACCOUNT_NUMBER, SAVINGS_ACCOUNT } from '@/constants/accounts';
import type { TransferDraft } from '@/types/banking';
import { isValidAccountNumber, normalizeAccountNumber } from '@/utils/account-number';

type TransferState = {
  draft: TransferDraft | null;
  completedAt: Date | null;
  saveDraft: (input: { destinationAccount: string; amount: number }) => void;
  markCompleted: (at?: Date) => void;
  reset: () => void;
};

export const useTransferStore = create<TransferState>((set) => ({
  draft: null,
  completedAt: null,
  saveDraft: ({ destinationAccount, amount }) => {
    if (
      !isValidAccountNumber(destinationAccount) ||
      amount <= 0 ||
      amount > SAVINGS_ACCOUNT.balance
    ) {
      return;
    }

    set({
      draft: {
        destinationAccount: normalizeAccountNumber(destinationAccount),
        amount,
        originAccount: ORIGIN_ACCOUNT_NUMBER,
      },
      completedAt: null,
    });
  },
  markCompleted: (at = new Date()) =>
    set((state) => (state.draft ? { completedAt: at } : state)),
  reset: () => set({ draft: null, completedAt: null }),
}));

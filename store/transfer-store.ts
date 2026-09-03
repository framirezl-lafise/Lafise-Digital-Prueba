import { create } from 'zustand';

import { ORIGIN_ACCOUNT_NUMBER } from '@/constants/accounts';
import type { TransferDraft } from '@/types/banking';
import { isValidAccountNumber } from '@/utils/account-number';

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
    if (!isValidAccountNumber(destinationAccount) || amount <= 0) {
      return;
    }

    set({
      draft: {
        destinationAccount,
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

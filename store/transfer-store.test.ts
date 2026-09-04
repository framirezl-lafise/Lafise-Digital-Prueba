import { ORIGIN_ACCOUNT_NUMBER } from '@/constants/accounts';
import { useTransferStore } from '@/store/transfer-store';

describe('transfer store', () => {
  beforeEach(() => {
    useTransferStore.getState().reset();
  });

  it('saves a valid draft with the origin account', () => {
    useTransferStore.getState().saveDraft({
      destinationAccount: '130492890',
      amount: 1000,
    });

    expect(useTransferStore.getState().draft).toEqual({
      destinationAccount: '130492890',
      amount: 1000,
      originAccount: ORIGIN_ACCOUNT_NUMBER,
    });
  });

  it('ignores invalid drafts', () => {
    useTransferStore.getState().saveDraft({
      destinationAccount: '1234567890',
      amount: 1000,
    });

    expect(useTransferStore.getState().draft).toBeNull();
  });

  it('ignores amounts greater than the available balance', () => {
    useTransferStore.getState().saveDraft({
      destinationAccount: '130492890',
      amount: 12_001,
    });

    expect(useTransferStore.getState().draft).toBeNull();
  });

  it('does not complete without a draft', () => {
    useTransferStore.getState().markCompleted(new Date('2024-02-18T09:30:00'));
    expect(useTransferStore.getState().completedAt).toBeNull();
  });

  it('marks a draft as completed', () => {
    const completedAt = new Date('2024-02-18T09:30:00');
    useTransferStore.getState().saveDraft({
      destinationAccount: '130492890',
      amount: 1000,
    });
    useTransferStore.getState().markCompleted(completedAt);

    expect(useTransferStore.getState().completedAt).toEqual(completedAt);
  });

  it('resets the session when returning home', () => {
    useTransferStore.getState().saveDraft({
      destinationAccount: '130492890',
      amount: 1000,
    });
    useTransferStore.getState().reset();

    expect(useTransferStore.getState().draft).toBeNull();
    expect(useTransferStore.getState().completedAt).toBeNull();
  });
});

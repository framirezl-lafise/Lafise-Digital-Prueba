import { canSubmitTransfer } from '@/utils/transfer';

describe('canSubmitTransfer', () => {
  it('stays disabled when the account is missing', () => {
    expect(canSubmitTransfer('', 'C$500')).toBe(false);
  });

  it('stays disabled when the amount is missing', () => {
    expect(canSubmitTransfer('130492890', '')).toBe(false);
  });

  it('enables when both values are valid', () => {
    expect(canSubmitTransfer('130492890', 'C$1,000')).toBe(true);
  });
});

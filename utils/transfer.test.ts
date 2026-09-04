import { canSubmitTransfer, exceedsAvailableBalance } from '@/utils/transfer';

describe('canSubmitTransfer', () => {
  const balance = 12_000;

  it('stays disabled when the account is missing', () => {
    expect(canSubmitTransfer('', 'C$500', balance)).toBe(false);
  });

  it('stays disabled when the amount is missing', () => {
    expect(canSubmitTransfer('130492890', '', balance)).toBe(false);
  });

  it('enables when both values are valid and within balance', () => {
    expect(canSubmitTransfer('130492890', 'C$1,000', balance)).toBe(true);
    expect(canSubmitTransfer('130492890', 'C$12,000', balance)).toBe(true);
  });

  it('stays disabled when the amount is greater than the available balance', () => {
    expect(canSubmitTransfer('130492890', 'C$12,001', balance)).toBe(false);
  });
});

describe('exceedsAvailableBalance', () => {
  it('is true only when the amount is greater than the balance', () => {
    expect(exceedsAvailableBalance('C$12,001', 12_000)).toBe(true);
    expect(exceedsAvailableBalance('C$12,000', 12_000)).toBe(false);
    expect(exceedsAvailableBalance('', 12_000)).toBe(false);
  });
});

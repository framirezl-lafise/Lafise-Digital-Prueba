import { isValidAccountNumber, normalizeAccountNumber } from '@/utils/account-number';

describe('account number', () => {
  it('keeps digits only', () => {
    expect(normalizeAccountNumber('130-492-890')).toBe('130492890');
  });

  it('accepts 6 to 20 digits', () => {
    expect(isValidAccountNumber('130492890')).toBe(true);
    expect(isValidAccountNumber('0234567645')).toBe(true);
    expect(isValidAccountNumber('12345')).toBe(false);
    expect(isValidAccountNumber('')).toBe(false);
  });
});

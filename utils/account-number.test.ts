import {
  ACCOUNT_MAX_DIGITS,
  isValidAccountNumber,
  limitAccountDigits,
  normalizeAccountNumber,
} from '@/utils/account-number';

describe('account number', () => {
  it('keeps digits only and drops letters or symbols', () => {
    expect(normalizeAccountNumber('130-492-890')).toBe('130492890');
    expect(normalizeAccountNumber('ab12c3')).toBe('123');
  });

  it('caps typed input at 9 digits', () => {
    expect(limitAccountDigits('1234567890123')).toBe('123456789');
    expect(limitAccountDigits('1234567890123').length).toBe(ACCOUNT_MAX_DIGITS);
  });

  it('accepts 1 to 9 digits and rejects empty or longer values', () => {
    expect(isValidAccountNumber('1')).toBe(true);
    expect(isValidAccountNumber('130492890')).toBe(true);
    expect(isValidAccountNumber('')).toBe(false);
    expect(isValidAccountNumber('1234567890')).toBe(false);
    expect(isValidAccountNumber('abc')).toBe(false);
  });
});

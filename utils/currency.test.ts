import { digitsOnly, formatAmountInput, formatCordobas, formatNio, parseCordobaAmount } from '@/utils/currency';

describe('currency', () => {
  it('strips non-digits', () => {
    expect(digitsOnly('C$1,000')).toBe('1000');
  });

  it('parses a positive cordoba amount', () => {
    expect(parseCordobaAmount('C$1,000')).toBe(1000);
    expect(parseCordobaAmount('500')).toBe(500);
  });

  it('rejects empty or zero amounts', () => {
    expect(parseCordobaAmount('')).toBeNull();
    expect(parseCordobaAmount('C$0')).toBeNull();
    expect(parseCordobaAmount('abc')).toBeNull();
  });

  it('formats cordobas like the Figma screens', () => {
    expect(formatCordobas(1000)).toBe('C$1,000');
    expect(formatCordobas(500)).toBe('C$500');
  });

  it('formats NIO balances with two decimals', () => {
    expect(formatNio(7500)).toBe('NIO 7,500.00');
  });

  it('rebuilds the amount input as the user types', () => {
    expect(formatAmountInput('1000')).toBe('C$1,000');
    expect(formatAmountInput('')).toBe('');
  });
});

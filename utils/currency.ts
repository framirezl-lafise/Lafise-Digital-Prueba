const THOUSANDS = 'en-US';

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

export function parseCordobaAmount(input: string): number | null {
  const digits = digitsOnly(input);
  if (!digits) {
    return null;
  }

  const amount = Number.parseInt(digits, 10);
  if (!Number.isFinite(amount) || amount <= 0) {
    return null;
  }

  return amount;
}

export function formatCordobas(amount: number): string {
  return `C$${amount.toLocaleString(THOUSANDS)}`;
}

export function formatNio(amount: number): string {
  return `NIO ${amount.toLocaleString(THOUSANDS, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatAmountInput(input: string): string {
  const amount = parseCordobaAmount(input);
  return amount === null ? '' : formatCordobas(amount);
}

export const ACCOUNT_MAX_DIGITS = 9;

export function normalizeAccountNumber(value: string): string {
  return value.replace(/\D/g, '');
}

export function limitAccountDigits(value: string): string {
  return normalizeAccountNumber(value).slice(0, ACCOUNT_MAX_DIGITS);
}

export function isValidAccountNumber(value: string): boolean {
  return new RegExp(`^\\d{1,${ACCOUNT_MAX_DIGITS}}$`).test(normalizeAccountNumber(value));
}

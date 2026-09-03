export function normalizeAccountNumber(value: string): string {
  return value.replace(/\D/g, '');
}

export function isValidAccountNumber(value: string): boolean {
  return /^\d{6,20}$/.test(normalizeAccountNumber(value));
}

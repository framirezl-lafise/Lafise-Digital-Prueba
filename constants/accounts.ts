export const CURRENT_USER = {
  firstName: 'Josué',
} as const;

export const SAVINGS_ACCOUNT = {
  label: 'Cuenta de ahorro',
  number: '1134948394',
  balance: 7500,
} as const;

export const ORIGIN_ACCOUNT_NUMBER = SAVINGS_ACCOUNT.number;

export const PAYROLL = {
  label: 'Paga quincenal Banco',
  amount: 7500,
} as const;

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export function formatTransferTimestamp(date: Date): string {
  const formatted = format(date, "d 'de' MMMM 'del' yyyy , hh:mm a", { locale: es });
  return formatted.replace(/\s(a|p)\.?\s?m\.?/i, (_, period: string) =>
    period.toLowerCase().startsWith('a') ? ' AM' : ' PM',
  );
}

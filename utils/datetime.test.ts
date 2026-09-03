import { formatTransferTimestamp } from '@/utils/datetime';

describe('formatTransferTimestamp', () => {
  it('formats the confirmation timestamp in Spanish', () => {
    const date = new Date(2024, 1, 18, 9, 30, 0);
    expect(formatTransferTimestamp(date)).toBe('18 de febrero del 2024 , 09:30 AM');
  });
});

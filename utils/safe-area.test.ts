import { bottomContentPadding, tabBarHeight } from '@/utils/safe-area';

describe('safe area padding', () => {
  it('adds the system inset under sticky actions', () => {
    expect(bottomContentPadding(48, 24)).toBe(72);
  });

  it('keeps only the extra padding when there is no inset', () => {
    expect(bottomContentPadding(0, 24)).toBe(24);
  });

  it('grows the tab bar by the navigation bar inset', () => {
    expect(tabBarHeight(48, 56)).toBe(104);
    expect(tabBarHeight(0, 56)).toBe(56);
  });
});

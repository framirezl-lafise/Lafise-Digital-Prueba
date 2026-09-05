import {
  expandEndMs,
  overlayFadeStartMs,
  settleStartMs,
  SUCCESS_TRANSITION_TIMELINE,
  totalTransitionMs,
} from '@/features/transfer/success-transition/timeline';

describe('success transition timeline', () => {
  it('starts the expand after the icon has appeared', () => {
    expect(SUCCESS_TRANSITION_TIMELINE.expandDelayMs).toBe(
      SUCCESS_TRANSITION_TIMELINE.appearMs,
    );
  });

  it('lets the title appear as the green cover finishes', () => {
    const expandEnd = expandEndMs();
    expect(SUCCESS_TRANSITION_TIMELINE.titleDelayMs).toBeGreaterThan(expandEnd - 220);
    expect(SUCCESS_TRANSITION_TIMELINE.titleDelayMs).toBeLessThanOrEqual(expandEnd);
  });

  it('holds the centered title before settling into the success layout', () => {
    expect(settleStartMs()).toBe(
      SUCCESS_TRANSITION_TIMELINE.titleDelayMs +
        SUCCESS_TRANSITION_TIMELINE.titleMs +
        SUCCESS_TRANSITION_TIMELINE.holdMs,
    );
  });

  it('fades the overlay only at the end of the settle', () => {
    expect(overlayFadeStartMs()).toBeGreaterThan(settleStartMs());
    expect(overlayFadeStartMs()).toBeLessThan(totalTransitionMs());
  });

  it('keeps the slowed sequence under four and a half seconds', () => {
    expect(totalTransitionMs()).toBeLessThan(4500);
    expect(totalTransitionMs()).toBeGreaterThan(3000);
  });
});

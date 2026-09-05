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

  it('lets the check rise to the hero without lingering', () => {
    expect(SUCCESS_TRANSITION_TIMELINE.settleMs).toBe(1500);
    expect(SUCCESS_TRANSITION_TIMELINE.settleMs).toBeLessThan(
      SUCCESS_TRANSITION_TIMELINE.expandMs + SUCCESS_TRANSITION_TIMELINE.appearMs,
    );
  });

  it('keeps the full sequence under six seconds', () => {
    expect(totalTransitionMs()).toBeGreaterThan(4000);
    expect(totalTransitionMs()).toBeLessThan(6000);
  });
});

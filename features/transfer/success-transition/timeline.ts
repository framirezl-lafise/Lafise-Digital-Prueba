export const SUCCESS_TRANSITION_TIMELINE = {
  appearMs: 700,
  expandDelayMs: 700,
  expandMs: 1400,
  titleDelayMs: 1900,
  titleMs: 800,
  holdMs: 500,
  settleMs: 1500,
  overlayFadeMs: 420,
  contentRevealMs: 1600,
} as const;

export type SuccessTransitionTimeline = typeof SUCCESS_TRANSITION_TIMELINE;

export function expandEndMs(
  timeline: SuccessTransitionTimeline = SUCCESS_TRANSITION_TIMELINE,
): number {
  return timeline.expandDelayMs + timeline.expandMs;
}

export function settleStartMs(
  timeline: SuccessTransitionTimeline = SUCCESS_TRANSITION_TIMELINE,
): number {
  return timeline.titleDelayMs + timeline.titleMs + timeline.holdMs;
}

export function overlayFadeStartMs(
  timeline: SuccessTransitionTimeline = SUCCESS_TRANSITION_TIMELINE,
): number {
  return settleStartMs(timeline) + timeline.settleMs - timeline.overlayFadeMs;
}

export function totalTransitionMs(
  timeline: SuccessTransitionTimeline = SUCCESS_TRANSITION_TIMELINE,
): number {
  return settleStartMs(timeline) + timeline.settleMs;
}

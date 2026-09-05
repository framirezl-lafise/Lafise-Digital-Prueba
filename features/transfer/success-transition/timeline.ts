export const SUCCESS_TRANSITION_TIMELINE = {
  appearMs: 560,
  expandDelayMs: 560,
  expandMs: 1100,
  titleDelayMs: 1480,
  titleMs: 680,
  holdMs: 360,
  settleMs: 1200,
  overlayFadeMs: 400,
  contentRevealMs: 900,
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

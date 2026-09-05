import { create } from 'zustand';

import type { Rect } from '@/features/transfer/success-transition/geometry';

export type SuccessTransitionStatus = 'idle' | 'playing' | 'complete';

type SuccessTransitionState = {
  status: SuccessTransitionStatus;
  runId: number;
  revealContent: boolean;
  heroVisible: boolean;
  checkTarget: Rect | null;
  titleTarget: Rect | null;
  start: () => void;
  setTargets: (targets: { check?: Rect | null; title?: Rect | null }) => void;
  reveal: () => void;
  showHero: () => void;
  complete: () => void;
  reset: () => void;
};

export const useSuccessTransitionStore = create<SuccessTransitionState>((set) => ({
  status: 'idle',
  runId: 0,
  revealContent: false,
  heroVisible: false,
  checkTarget: null,
  titleTarget: null,
  start: () =>
    set((state) => ({
      status: 'playing',
      runId: state.runId + 1,
      revealContent: false,
      heroVisible: false,
      checkTarget: null,
      titleTarget: null,
    })),
  setTargets: (targets) =>
    set((state) => ({
      checkTarget: targets.check === undefined ? state.checkTarget : targets.check,
      titleTarget: targets.title === undefined ? state.titleTarget : targets.title,
    })),
  reveal: () => set({ revealContent: true }),
  showHero: () => set({ heroVisible: true }),
  complete: () => set({ status: 'complete', revealContent: true, heroVisible: true }),
  reset: () =>
    set({
      status: 'idle',
      revealContent: false,
      heroVisible: false,
      checkTarget: null,
      titleTarget: null,
    }),
}));

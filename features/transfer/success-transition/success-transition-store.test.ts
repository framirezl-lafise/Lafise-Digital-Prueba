import { useSuccessTransitionStore } from '@/features/transfer/success-transition/success-transition-store';

describe('success transition store', () => {
  beforeEach(() => {
    useSuccessTransitionStore.getState().reset();
  });

  it('starts a new run and hides success content until settle', () => {
    useSuccessTransitionStore.getState().start();

    const state = useSuccessTransitionStore.getState();
    expect(state.status).toBe('playing');
    expect(state.runId).toBe(1);
    expect(state.revealContent).toBe(false);
  });

  it('reveals success content before completing the overlay', () => {
    useSuccessTransitionStore.getState().start();
    useSuccessTransitionStore.getState().reveal();

    expect(useSuccessTransitionStore.getState().revealContent).toBe(true);
    expect(useSuccessTransitionStore.getState().status).toBe('playing');
  });

  it('shows the static hero before the overlay finishes fading', () => {
    useSuccessTransitionStore.getState().start();
    useSuccessTransitionStore.getState().showHero();

    expect(useSuccessTransitionStore.getState().heroVisible).toBe(true);
    expect(useSuccessTransitionStore.getState().status).toBe('playing');
  });

  it('completes the overlay without leaving content hidden', () => {
    useSuccessTransitionStore.getState().start();
    useSuccessTransitionStore.getState().complete();

    const state = useSuccessTransitionStore.getState();
    expect(state.status).toBe('complete');
    expect(state.revealContent).toBe(true);
    expect(state.heroVisible).toBe(true);
  });
});

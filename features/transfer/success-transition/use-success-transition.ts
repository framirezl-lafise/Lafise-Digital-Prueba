import { useCallback, useEffect, useRef } from 'react';
import { AccessibilityInfo, useWindowDimensions } from 'react-native';
import {
  Easing,
  cancelAnimation,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { palette } from '@/constants/theme';
import {
  centeredCheckFrame,
  centeredTitleFrame,
  iconScaleInCover,
  successHeroCheckFrame,
  successHeroTitleFrame,
  translationBetween,
} from '@/features/transfer/success-transition/geometry';
import { SUCCESS_TITLE } from '@/features/transfer/success-transition/metrics';
import { useSuccessTransitionStore } from '@/features/transfer/success-transition/success-transition-store';
import { SUCCESS_TRANSITION_TIMELINE } from '@/features/transfer/success-transition/timeline';

const appearEasing = Easing.bezier(0.16, 1, 0.3, 1);
const expandEasing = Easing.bezier(0.22, 1, 0.36, 1);
const titleEasing = Easing.bezier(0.16, 1, 0.3, 1);
const settleEasing = Easing.bezier(0.22, 0.61, 0.36, 1);

const TITLE_FALLBACK = { width: 186, height: 32 };

export function useSuccessTransition() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const status = useSuccessTransitionStore((state) => state.status);
  const runId = useSuccessTransitionStore((state) => state.runId);
  const reveal = useSuccessTransitionStore((state) => state.reveal);
  const showHero = useSuccessTransitionStore((state) => state.showHero);
  const complete = useSuccessTransitionStore((state) => state.complete);
  const titleSizeRef = useRef(TITLE_FALLBACK);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handoffTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const overlayOpacity = useSharedValue(0);
  const circleScale = useSharedValue(0);
  const circleOpacity = useSharedValue(1);
  const checkOpacity = useSharedValue(0);
  const checkScale = useSharedValue(0.72);
  const checkTX = useSharedValue(0);
  const checkTY = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleTX = useSharedValue(0);
  const titleTY = useSharedValue(16);
  const titleColorProgress = useSharedValue(0);

  const clearTimers = useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (handoffTimerRef.current) {
      clearTimeout(handoffTimerRef.current);
      handoffTimerRef.current = null;
    }
  }, []);

  const resetValues = useCallback(() => {
    overlayOpacity.value = 0;
    circleScale.value = 0;
    circleOpacity.value = 1;
    checkOpacity.value = 0;
    checkScale.value = 0.72;
    checkTX.value = 0;
    checkTY.value = 0;
    titleOpacity.value = 0;
    titleTX.value = 0;
    titleTY.value = 16;
    titleColorProgress.value = 0;
  }, [
    checkOpacity,
    checkScale,
    checkTX,
    checkTY,
    circleOpacity,
    circleScale,
    overlayOpacity,
    titleColorProgress,
    titleOpacity,
    titleTX,
    titleTY,
  ]);

  const settleToSuccess = useCallback(() => {
    const { checkTarget, titleTarget } = useSuccessTransitionStore.getState();
    const startCheck = centeredCheckFrame(width, height);
    const startTitle = centeredTitleFrame(width, height, titleSizeRef.current);
    const endCheck = checkTarget ?? successHeroCheckFrame(width, insets.top);
    const endTitle = titleTarget ?? successHeroTitleFrame(width, insets.top, titleSizeRef.current);
    const checkDelta = translationBetween(startCheck, endCheck);
    const titleDelta = translationBetween(startTitle, endTitle);

    reveal();
    handoffTimerRef.current = setTimeout(
      showHero,
      SUCCESS_TRANSITION_TIMELINE.settleMs - SUCCESS_TRANSITION_TIMELINE.overlayFadeMs,
    );

    checkTX.value = withTiming(checkDelta.x, {
      duration: SUCCESS_TRANSITION_TIMELINE.settleMs,
      easing: settleEasing,
    });
    checkTY.value = withTiming(checkDelta.y, {
      duration: SUCCESS_TRANSITION_TIMELINE.settleMs,
      easing: settleEasing,
    });
    titleTX.value = withTiming(titleDelta.x, {
      duration: SUCCESS_TRANSITION_TIMELINE.settleMs,
      easing: settleEasing,
    });
    titleTY.value = withTiming(titleDelta.y, {
      duration: SUCCESS_TRANSITION_TIMELINE.settleMs,
      easing: settleEasing,
    });
    titleColorProgress.value = withTiming(1, {
      duration: SUCCESS_TRANSITION_TIMELINE.settleMs,
      easing: Easing.out(Easing.cubic),
    });
    circleScale.value = withTiming(iconScaleInCover(width, height), {
      duration: SUCCESS_TRANSITION_TIMELINE.settleMs,
      easing: settleEasing,
    });
    overlayOpacity.value = withDelay(
      SUCCESS_TRANSITION_TIMELINE.settleMs - SUCCESS_TRANSITION_TIMELINE.overlayFadeMs,
      withTiming(
        0,
        {
          duration: SUCCESS_TRANSITION_TIMELINE.overlayFadeMs,
          easing: Easing.out(Easing.quad),
        },
        (finished) => {
          if (finished) {
            runOnJS(complete)();
          }
        },
      ),
    );
  }, [
    checkTX,
    checkTY,
    circleOpacity,
    circleScale,
    complete,
    height,
    insets.top,
    overlayOpacity,
    reveal,
    showHero,
    titleColorProgress,
    titleTX,
    titleTY,
    width,
  ]);

  const onTitleArrived = useCallback(() => {
    clearTimers();
    holdTimerRef.current = setTimeout(settleToSuccess, SUCCESS_TRANSITION_TIMELINE.holdMs);
  }, [clearTimers, settleToSuccess]);

  const play = useCallback(() => {
    resetValues();
    const iconScale = iconScaleInCover(width, height);

    overlayOpacity.value = withTiming(1, { duration: 140, easing: Easing.out(Easing.quad) });
    circleScale.value = withSequence(
      withTiming(iconScale, {
        duration: SUCCESS_TRANSITION_TIMELINE.appearMs,
        easing: appearEasing,
      }),
      withTiming(1, {
        duration: SUCCESS_TRANSITION_TIMELINE.expandMs,
        easing: expandEasing,
      }),
    );
    checkOpacity.value = withTiming(1, {
      duration: 420,
      easing: Easing.out(Easing.cubic),
    });
    checkScale.value = withSpring(1, {
      damping: 14,
      stiffness: 170,
      mass: 0.85,
    });
    titleOpacity.value = withDelay(
      SUCCESS_TRANSITION_TIMELINE.titleDelayMs,
      withTiming(1, {
        duration: SUCCESS_TRANSITION_TIMELINE.titleMs,
        easing: titleEasing,
      }),
    );
    titleTY.value = withDelay(
      SUCCESS_TRANSITION_TIMELINE.titleDelayMs,
      withTiming(
        0,
        {
          duration: SUCCESS_TRANSITION_TIMELINE.titleMs,
          easing: titleEasing,
        },
        (finished) => {
          if (finished) {
            runOnJS(onTitleArrived)();
          }
        },
      ),
    );
  }, [
    checkOpacity,
    checkScale,
    circleScale,
    height,
    onTitleArrived,
    overlayOpacity,
    resetValues,
    titleOpacity,
    titleTY,
    width,
  ]);

  useEffect(() => {
    if (status !== 'playing') {
      return;
    }

    let cancelled = false;

    AccessibilityInfo.isReduceMotionEnabled().then((reduceMotion) => {
      if (cancelled) {
        return;
      }

      if (reduceMotion) {
        complete();
        return;
      }

      play();
    });

    return () => {
      cancelled = true;
      clearTimers();
      cancelAnimation(overlayOpacity);
      cancelAnimation(circleScale);
      cancelAnimation(circleOpacity);
      cancelAnimation(checkOpacity);
      cancelAnimation(checkScale);
      cancelAnimation(checkTX);
      cancelAnimation(checkTY);
      cancelAnimation(titleOpacity);
      cancelAnimation(titleTX);
      cancelAnimation(titleTY);
      cancelAnimation(titleColorProgress);
    };
  }, [
    checkOpacity,
    checkScale,
    checkTX,
    checkTY,
    circleOpacity,
    circleScale,
    clearTimers,
    complete,
    overlayOpacity,
    play,
    runId,
    status,
    titleColorProgress,
    titleOpacity,
    titleTX,
    titleTY,
  ]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const circleStyle = useAnimatedStyle(() => ({
    opacity: circleOpacity.value,
    transform: [
      { translateX: checkTX.value },
      { translateY: checkTY.value },
      { scale: circleScale.value },
    ],
  }));

  const checkStyle = useAnimatedStyle(() => ({
    opacity: checkOpacity.value,
    transform: [
      { translateX: checkTX.value },
      { translateY: checkTY.value },
      { scale: checkScale.value },
    ],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    color: interpolateColor(titleColorProgress.value, [0, 1], ['#FFFFFF', palette.text]),
    transform: [{ translateX: titleTX.value }, { translateY: titleTY.value }],
  }));

  const setMeasuredTitleSize = useCallback((size: { width: number; height: number }) => {
    if (size.width > 0 && size.height > 0) {
      titleSizeRef.current = size;
    }
  }, []);

  return {
    status,
    title: SUCCESS_TITLE,
    checkFrame: centeredCheckFrame(width, height),
    titleFrame: centeredTitleFrame(width, height, titleSizeRef.current),
    overlayStyle,
    circleStyle,
    checkStyle,
    titleStyle,
    setMeasuredTitleSize,
  };
}

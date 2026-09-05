import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { Redirect, useRouter } from 'expo-router';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppShell } from '@/components/layout/app-shell';
import { ScreenFooter } from '@/components/layout/screen-footer';
import { AppButton } from '@/components/ui/app-button';
import { LocalImage } from '@/components/ui/local-image';
import { images } from '@/constants/images';
import { appRoutes } from '@/constants/routes';
import { palette, spacing } from '@/constants/theme';
import {
  SUCCESS_CHECK_SIZE,
  SUCCESS_ICON_STAGE,
  SUCCESS_RING_SIZE,
  SUCCESS_TITLE,
  SUCCESS_TITLE_PADDING_TOP,
  SuccessCheckIcon,
  useSuccessTransitionStore,
} from '@/features/transfer/success-transition';
import { SUCCESS_TRANSITION_TIMELINE } from '@/features/transfer/success-transition/timeline';
import { useTransferStore } from '@/store/transfer-store';
import { formatCordobas } from '@/utils/currency';
import { formatTransferTimestamp } from '@/utils/datetime';

export function TransferSuccessScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const draft = useTransferStore((state) => state.draft);
  const completedAt = useTransferStore((state) => state.completedAt);
  const reset = useTransferStore((state) => state.reset);
  const resetTransition = useSuccessTransitionStore((state) => state.reset);
  const setTargets = useSuccessTransitionStore((state) => state.setTargets);
  const status = useSuccessTransitionStore((state) => state.status);
  const revealContent = useSuccessTransitionStore((state) => state.revealContent);
  const heroVisible = useSuccessTransitionStore((state) => state.heroVisible);
  const checkRef = useRef<View>(null);
  const titleRef = useRef<View>(null);

  const isPlaying = status === 'playing';
  const showStaticHero = !isPlaying || heroVisible;
  const revealExtras = !isPlaying || revealContent;

  const reportTargets = useCallback(() => {
    checkRef.current?.measureInWindow((x, y, width, height) => {
      if (width > 0 && height > 0) {
        setTargets({ check: { x, y, width, height } });
      }
    });
    titleRef.current?.measureInWindow((x, y, width, height) => {
      if (width > 0 && height > 0) {
        setTargets({ title: { x, y, width, height } });
      }
    });
  }, [setTargets]);

  if (!draft || !completedAt) {
    return <Redirect href={appRoutes.home} />;
  }

  function goHome() {
    reset();
    resetTransition();
    router.replace(appRoutes.home);
  }

  return (
    <AppShell backgroundColor={palette.background} edges={['left', 'right']}>
      <View style={styles.hero}>
        <RevealBlock
          visible={revealExtras}
          skipAnimation={!isPlaying}
          style={styles.glowWrap}
        >
          <LocalImage source={images.successGlow} style={styles.glow} contentFit="cover" />
        </RevealBlock>
        <View style={[styles.heroContent, { paddingTop: insets.top + spacing.xl }]}>
          <View style={styles.iconStage}>
            <RevealBlock
              visible={revealExtras}
              skipAnimation={!isPlaying}
              style={styles.sparkLayer}
            >
              <View style={[styles.spark, styles.sparkArcLeft]} />
              <View style={[styles.spark, styles.sparkArcRight]} />
              <View style={[styles.sparkDot, { top: 8, left: 28 }]} />
              <View style={[styles.sparkSquare, { top: 18, right: 22 }]} />
              <View style={[styles.sparkDot, { bottom: 28, left: 18 }]} />
              <View style={[styles.sparkSquare, { bottom: 22, right: 32 }]} />
            </RevealBlock>
            <View style={styles.ring}>
              <View
                ref={checkRef}
                collapsable={false}
                onLayout={reportTargets}
                style={!showStaticHero ? styles.hiddenHero : null}
              >
                <SuccessCheckIcon size={SUCCESS_CHECK_SIZE} />
              </View>
            </View>
          </View>
          <View style={styles.titleWrap}>
            <View
              ref={titleRef}
              collapsable={false}
              onLayout={reportTargets}
              style={!showStaticHero ? styles.hiddenHero : null}
            >
              <Text style={styles.title}>{SUCCESS_TITLE}</Text>
            </View>
          </View>
          <RevealBlock visible={revealExtras} skipAnimation={!isPlaying}>
            <Text style={styles.timestamp}>{formatTransferTimestamp(completedAt)}</Text>
          </RevealBlock>
        </View>
      </View>

      <RevealBlock visible={revealExtras} skipAnimation={!isPlaying} style={styles.summary}>
        <Text style={styles.summaryTitle}>Resumen de tu envío</Text>
        <SummaryRow label="Total enviado" value={formatCordobas(draft.amount)} />
        <SummaryRow label="Al número de cuenta" value={draft.destinationAccount} />
        <SummaryRow label="Cuenta utilizada para el envío" value={draft.originAccount} />
      </RevealBlock>

      <RevealBlock visible={revealExtras} skipAnimation={!isPlaying}>
        <ScreenFooter>
          <AppButton label="Volver al inicio" onPress={goHome} />
        </ScreenFooter>
      </RevealBlock>
    </AppShell>
  );
}

function RevealBlock({
  visible,
  skipAnimation,
  style,
  children,
}: {
  visible: boolean;
  skipAnimation: boolean;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}) {
  const progress = useSharedValue(skipAnimation ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(visible || skipAnimation ? 1 : 0, {
      duration: skipAnimation ? 0 : SUCCESS_TRANSITION_TIMELINE.contentRevealMs,
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
  }, [progress, skipAnimation, visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      {
        translateY: interpolate(progress.value, [0, 1], [18, 0], Extrapolation.CLAMP),
      },
    ],
  }));

  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const ACCENT = palette.primaryMuted;

const styles = StyleSheet.create({
  hero: {
    backgroundColor: palette.background,
    overflow: 'hidden',
  },
  glowWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 195,
  },
  glow: {
    width: '100%',
    height: 195,
  },
  heroContent: {
    alignItems: 'center',
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
  iconStage: {
    width: SUCCESS_ICON_STAGE.width,
    height: SUCCESS_ICON_STAGE.height,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  ring: {
    width: SUCCESS_RING_SIZE,
    height: SUCCESS_RING_SIZE,
    borderRadius: SUCCESS_RING_SIZE / 2,
    backgroundColor: palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#018765',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  sparkLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  spark: {
    position: 'absolute',
    borderColor: ACCENT,
    borderWidth: 2,
  },
  sparkArcLeft: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    top: 10,
    left: 8,
    transform: [{ rotate: '-20deg' }],
  },
  sparkArcRight: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    top: 6,
    right: 10,
    transform: [{ rotate: '25deg' }],
  },
  sparkDot: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: ACCENT,
  },
  sparkSquare: {
    position: 'absolute',
    width: 7,
    height: 7,
    borderRadius: 1,
    backgroundColor: ACCENT,
  },
  hiddenHero: {
    opacity: 0,
  },
  titleWrap: {
    paddingTop: SUCCESS_TITLE_PADDING_TOP,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: palette.text,
    textAlign: 'center',
  },
  timestamp: {
    marginTop: spacing.sm,
    color: palette.textMuted,
    textAlign: 'center',
  },
  summary: {
    flex: 1,
    width: '100%',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    gap: spacing.lg,
    alignItems: 'center',
  },
  summaryTitle: {
    alignSelf: 'stretch',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
    marginBottom: spacing.sm,
  },
  row: {
    alignSelf: 'stretch',
    gap: spacing.xs,
    alignItems: 'center',
  },
  rowLabel: {
    alignSelf: 'stretch',
    textAlign: 'center',
    color: palette.textMuted,
  },
  rowValue: {
    alignSelf: 'stretch',
    textAlign: 'center',
    color: palette.text,
    fontSize: 16,
    fontWeight: '600',
  },
});

import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { SUCCESS_CHECK_SIZE } from '@/features/transfer/success-transition/metrics';
import {
  SUCCESS_TEXTURE_BLOBS,
  SUCCESS_TEXTURE_PARTICLES,
  SUCCESS_TEXTURE_TONES,
  SUCCESS_TEXTURE_VIEWBOX,
  SUCCESS_TEXTURE_WAVES,
  type SuccessTextureParticle,
  type SuccessTextureWave,
} from '@/features/transfer/success-transition/texture';

type SuccessCircleTextureProps = {
  size?: number;
  animated?: boolean;
};

export function SuccessCircleTexture({
  size = SUCCESS_CHECK_SIZE,
  animated = false,
}: SuccessCircleTextureProps) {
  return (
    <View style={[styles.clip, { width: size, height: size, borderRadius: size / 2 }]}>
      <LinearGradient
        colors={[SUCCESS_TEXTURE_TONES.dark, SUCCESS_TEXTURE_TONES.deep, SUCCESS_TEXTURE_TONES.mid, SUCCESS_TEXTURE_TONES.light]}
        start={{ x: 0.28, y: 0 }}
        end={{ x: 0.78, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {SUCCESS_TEXTURE_BLOBS.map((blob, index) => (
        <View
          key={`blob-${index}`}
          style={{
            position: 'absolute',
            left: (blob.cx / SUCCESS_TEXTURE_VIEWBOX) * size - (blob.rx / SUCCESS_TEXTURE_VIEWBOX) * size,
            top: (blob.cy / SUCCESS_TEXTURE_VIEWBOX) * size - (blob.ry / SUCCESS_TEXTURE_VIEWBOX) * size,
            width: (blob.rx / SUCCESS_TEXTURE_VIEWBOX) * size * 2,
            height: (blob.ry / SUCCESS_TEXTURE_VIEWBOX) * size * 2,
            borderRadius: 999,
            backgroundColor: blob.fill,
            opacity: blob.opacity,
          }}
        />
      ))}
      {SUCCESS_TEXTURE_WAVES.map((wave, index) => (
        <WaveBand key={`wave-${index}`} size={size} wave={wave} animated={animated} />
      ))}
      {SUCCESS_TEXTURE_PARTICLES.map((particle, index) => (
        <FloatingParticle key={`particle-${index}`} size={size} particle={particle} animated={animated} />
      ))}
    </View>
  );
}

function WaveBand({
  size,
  wave,
  animated,
}: {
  size: number;
  wave: SuccessTextureWave;
  animated: boolean;
}) {
  const progress = useSharedValue(0.5);

  useEffect(() => {
    if (!animated) {
      progress.value = 0.5;
      return;
    }

    progress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: wave.durationMs, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: wave.durationMs, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );

    return () => {
      cancelAnimation(progress);
    };
  }, [animated, progress, wave.durationMs]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          progress.value,
          [0, 1],
          [-wave.travel * size, wave.travel * size],
        ),
      },
      {
        translateY: interpolate(
          progress.value,
          [0, 1],
          [-wave.travel * size * 0.35, wave.travel * size * 0.4],
        ),
      },
      { rotate: `${wave.rotate}deg` },
      { scaleX: interpolate(progress.value, [0, 0.5, 1], [1, 1.08, 1]) },
    ],
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: wave.top * size,
          left: wave.offsetX * size,
          width: wave.width * size,
          height: wave.height * size,
          borderRadius: size,
          backgroundColor: wave.color,
          opacity: wave.opacity,
        },
        animatedStyle,
      ]}
    />
  );
}

function FloatingParticle({
  size,
  particle,
  animated,
}: {
  size: number;
  particle: SuccessTextureParticle;
  animated: boolean;
}) {
  const progress = useSharedValue(0.5);

  useEffect(() => {
    if (!animated) {
      progress.value = 0.5;
      return;
    }

    progress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: particle.durationMs, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: particle.durationMs, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );

    return () => {
      cancelAnimation(progress);
    };
  }, [animated, particle.durationMs, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.5, 1], [particle.opacity * 0.45, particle.opacity, particle.opacity * 0.55]),
    transform: [
      {
        translateX: interpolate(progress.value, [0, 1], [-particle.travel * size, particle.travel * size]),
      },
      {
        translateY: interpolate(progress.value, [0, 1], [particle.travel * size * 0.6, -particle.travel * size]),
      },
      { rotate: `${particle.rotate}deg` },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.particle,
        particleStyle(size, particle),
        {
          left: particle.x * size,
          top: particle.y * size,
        },
        animatedStyle,
      ]}
    />
  );
}

function particleStyle(size: number, particle: SuccessTextureParticle) {
  if (particle.kind === 'dash') {
    return {
      width: particle.size * size,
      height: Math.max(2, size * 0.004),
      borderRadius: 99,
      backgroundColor: SUCCESS_TEXTURE_TONES.foam,
    };
  }

  if (particle.kind === 'arc') {
    const arcSize = particle.size * size;
    return {
      width: arcSize,
      height: arcSize,
      borderRadius: arcSize / 2,
      borderWidth: Math.max(2, size * 0.0045),
      borderColor: SUCCESS_TEXTURE_TONES.foam,
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
      backgroundColor: 'transparent',
    };
  }

  const dot = particle.size * size;
  return {
    width: dot,
    height: dot,
    borderRadius: dot / 2,
    backgroundColor: SUCCESS_TEXTURE_TONES.foam,
  };
}

const styles = StyleSheet.create({
  clip: {
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
  },
});

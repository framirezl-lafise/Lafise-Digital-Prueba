import { useCallback, useEffect } from 'react';
import { Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';

import { AppShell } from '@/components/layout/app-shell';
import { StackHeader } from '@/components/layout/stack-header';
import { COMING_SOON_COPY } from '@/constants/coming-soon';
import { images } from '@/constants/images';
import { layout, palette, spacing } from '@/constants/theme';

function runIfPlayerAlive(action: () => void) {
  try {
    action();
  } catch {
    // useVideoPlayer already released the native shared object on unmount.
  }
}

export function ComingSoonScreen() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const videoSize = Math.max(240, Math.min(windowWidth, layout.maxWidth) - spacing.xl * 2);

  const player = useVideoPlayer(images.comingSoonVideo, (instance) => {
    instance.loop = true;
    instance.muted = true;
  });

  const startLoop = useCallback(() => {
    runIfPlayerAlive(() => {
      player.loop = true;
      player.muted = true;
      player.play();
    });
  }, [player]);

  useEffect(() => {
    startLoop();

    const statusSub = player.addListener('statusChange', ({ status }) => {
      if (status === 'readyToPlay') {
        startLoop();
      }
    });

    const endedSub = player.addListener('playToEnd', () => {
      runIfPlayerAlive(() => {
        player.replay();
      });
    });

    return () => {
      statusSub.remove();
      endedSub.remove();
    };
  }, [player, startLoop]);

  return (
    <AppShell backgroundColor={palette.comingSoon}>
      <StackHeader title="" onBack={() => router.back()} />
      <View style={styles.body}>
        <View collapsable={false} style={styles.videoSlot}>
          <VideoView
            player={player}
            style={{ width: videoSize, height: videoSize }}
            nativeControls={false}
            contentFit="contain"
            playsInline
            pointerEvents="none"
            {...(Platform.OS === 'android' ? { surfaceType: 'textureView' as const } : {})}
          />
        </View>
        <Text style={styles.title}>{COMING_SOON_COPY.title}</Text>
        <Text style={styles.subtitle}>{COMING_SOON_COPY.subtitle}</Text>
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    backgroundColor: palette.comingSoon,
  },
  videoSlot: {
    overflow: 'hidden',
    backgroundColor: palette.comingSoon,
  },
  title: {
    marginTop: spacing.xl,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    color: palette.text,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: spacing.sm,
    fontSize: 16,
    lineHeight: 22,
    color: palette.textSecondary,
    textAlign: 'center',
  },
});

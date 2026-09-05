import { useVideoPlayer, VideoView } from 'expo-video';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppShell } from '@/components/layout/app-shell';
import { StackHeader } from '@/components/layout/stack-header';
import { COMING_SOON_COPY } from '@/constants/coming-soon';
import { images } from '@/constants/images';
import { palette, spacing } from '@/constants/theme';

export function ComingSoonScreen() {
  const router = useRouter();
  const player = useVideoPlayer(images.comingSoonVideo, (instance) => {
    instance.loop = true;
    instance.muted = true;
    instance.play();
  });

  return (
    <AppShell backgroundColor={palette.comingSoon}>
      <StackHeader title="" onBack={() => router.back()} />
      <View style={styles.body}>
        <VideoView
          player={player}
          style={styles.video}
          nativeControls={false}
          contentFit="contain"
          pointerEvents="none"
        />
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
  video: {
    width: '100%',
    aspectRatio: 1,
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

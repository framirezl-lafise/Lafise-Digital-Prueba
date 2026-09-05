import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated from 'react-native-reanimated';

import { SuccessCheckIcon } from '@/features/transfer/success-transition/success-check-icon';
import { SuccessCircleTexture } from '@/features/transfer/success-transition/success-circle-texture';
import {
  SUCCESS_CHECK_SIZE,
  SUCCESS_CIRCLE_COLOR,
} from '@/features/transfer/success-transition/metrics';
import { useSuccessTransition } from '@/features/transfer/success-transition/use-success-transition';
import { centeredCheckFrame, centeredTitleFrame, coverDiameter } from '@/features/transfer/success-transition/geometry';

const TITLE_FALLBACK = { width: 186, height: 32 };

export function SuccessTransitionOverlay() {
  const { width, height } = useWindowDimensions();
  const [titleSize, setTitleSize] = useState(TITLE_FALLBACK);
  const {
    status,
    title,
    overlayStyle,
    circleStyle,
    checkStyle,
    titleStyle,
    setMeasuredTitleSize,
  } = useSuccessTransition();

  if (status !== 'playing') {
    return null;
  }

  const checkFrame = centeredCheckFrame(width, height);
  const titleFrame = centeredTitleFrame(width, height, titleSize);
  const discSize = coverDiameter(width, height);
  const discFrame = {
    x: (width - discSize) / 2,
    y: (height - discSize) / 2,
  };

  return (
    <Animated.View
      pointerEvents="auto"
      style={[styles.root, overlayStyle]}
    >
      <StatusBar style="light" />
      <Animated.View
        style={[
          styles.circle,
          {
            left: discFrame.x,
            top: discFrame.y,
            width: discSize,
            height: discSize,
            borderRadius: discSize / 2,
          },
          circleStyle,
        ]}
      >
        <SuccessCircleTexture size={discSize} animated />
      </Animated.View>
      <Animated.View
        style={[
          styles.check,
          {
            left: checkFrame.x,
            top: checkFrame.y,
          },
          checkStyle,
        ]}
      >
        <SuccessCheckIcon showDisc={false} />
      </Animated.View>
      <Animated.Text
        numberOfLines={1}
        onLayout={(event) => {
          const { width: textWidth, height: textHeight } = event.nativeEvent.layout;
          setTitleSize({ width: textWidth, height: textHeight });
          setMeasuredTitleSize({ width: textWidth, height: textHeight });
        }}
        style={[
          styles.title,
          {
            left: titleFrame.x,
            top: titleFrame.y,
            maxWidth: width - 48,
          },
          titleStyle,
        ]}
      >
        {title}
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 40,
    elevation: 40,
  },
  circle: {
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: SUCCESS_CIRCLE_COLOR,
  },
  check: {
    position: 'absolute',
    width: SUCCESS_CHECK_SIZE,
    height: SUCCESS_CHECK_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    position: 'absolute',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
});

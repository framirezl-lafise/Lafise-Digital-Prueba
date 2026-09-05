import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { SuccessCircleTexture } from '@/features/transfer/success-transition/success-circle-texture';
import {
  SUCCESS_CHECK_SIZE,
  SUCCESS_CHECK_STROKE,
} from '@/features/transfer/success-transition/metrics';

type SuccessCheckIconProps = {
  size?: number;
  showDisc?: boolean;
};

export function SuccessCheckIcon({
  size = SUCCESS_CHECK_SIZE,
  showDisc = true,
}: SuccessCheckIconProps) {
  return (
    <View style={{ width: size, height: size }}>
      {showDisc ? <SuccessCircleTexture size={size} /> : null}
      <Svg
        width={size}
        height={size}
        viewBox="0 0 71 71"
        fill="none"
        style={StyleSheet.absoluteFill}
      >
        <Path
          d="M49.3076 25.0999L30.2872 44.1203L21.6416 35.4747"
          stroke={SUCCESS_CHECK_STROKE}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

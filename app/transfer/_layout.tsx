import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { SuccessTransitionOverlay } from '@/features/transfer/success-transition';

export default function TransferLayout() {
  return (
    <View style={styles.root}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="confirm" />
        <Stack.Screen
          name="success"
          options={{ animation: 'none', gestureEnabled: false }}
        />
      </Stack>
      <SuccessTransitionOverlay />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

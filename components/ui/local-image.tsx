import { Image, type ImageProps } from 'expo-image';

export function LocalImage({ contentFit = 'contain', ...props }: ImageProps) {
  return <Image contentFit={contentFit} {...props} />;
}

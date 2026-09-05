import { palette } from '@/constants/theme';

export type SuccessTextureBlob = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  fill: string;
  opacity: number;
};

export type SuccessTextureWave = {
  top: number;
  height: number;
  width: number;
  offsetX: number;
  color: string;
  opacity: number;
  rotate: number;
  durationMs: number;
  travel: number;
};

export type SuccessTextureParticle = {
  x: number;
  y: number;
  kind: 'dot' | 'dash' | 'arc';
  size: number;
  rotate: number;
  durationMs: number;
  travel: number;
  opacity: number;
};

export const SUCCESS_TEXTURE_VIEWBOX = 71;

export const SUCCESS_TEXTURE_TONES = {
  highlight: '#7BE3B0',
  light: '#5ED9A0',
  mid: palette.primaryMuted,
  deep: palette.primary,
  forest: palette.homeStart,
  dark: palette.primaryDark,
  mist: '#D8F6E8',
  foam: 'rgba(255,255,255,0.62)',
} as const;

export const SUCCESS_TEXTURE_BLOBS: readonly SuccessTextureBlob[] = [
  { cx: 18, cy: 14, rx: 34, ry: 28, fill: SUCCESS_TEXTURE_TONES.mid, opacity: 0.55 },
  { cx: 56, cy: 18, rx: 32, ry: 26, fill: SUCCESS_TEXTURE_TONES.light, opacity: 0.5 },
  { cx: 54, cy: 56, rx: 30, ry: 28, fill: SUCCESS_TEXTURE_TONES.dark, opacity: 0.46 },
  { cx: 12, cy: 52, rx: 28, ry: 24, fill: SUCCESS_TEXTURE_TONES.forest, opacity: 0.5 },
  { cx: 36, cy: 40, rx: 26, ry: 22, fill: SUCCESS_TEXTURE_TONES.deep, opacity: 0.36 },
  { cx: 26, cy: 8, rx: 24, ry: 16, fill: SUCCESS_TEXTURE_TONES.highlight, opacity: 0.42 },
  { cx: 42, cy: 28, rx: 18, ry: 18, fill: SUCCESS_TEXTURE_TONES.mist, opacity: 0.28 },
  { cx: 16, cy: 34, rx: 16, ry: 20, fill: SUCCESS_TEXTURE_TONES.light, opacity: 0.3 },
];

export const SUCCESS_TEXTURE_WAVES: readonly SuccessTextureWave[] = [
  { top: 0.02, height: 0.34, width: 1.7, offsetX: -0.28, color: SUCCESS_TEXTURE_TONES.dark, opacity: 0.5, rotate: -16, durationMs: 4200, travel: 0.1 },
  { top: 0.18, height: 0.3, width: 1.65, offsetX: -0.18, color: SUCCESS_TEXTURE_TONES.forest, opacity: 0.42, rotate: 10, durationMs: 3600, travel: -0.12 },
  { top: 0.36, height: 0.28, width: 1.8, offsetX: -0.32, color: SUCCESS_TEXTURE_TONES.deep, opacity: 0.38, rotate: -8, durationMs: 4800, travel: 0.09 },
  { top: 0.52, height: 0.26, width: 1.6, offsetX: -0.12, color: SUCCESS_TEXTURE_TONES.light, opacity: 0.36, rotate: 14, durationMs: 3900, travel: -0.08 },
  { top: 0.68, height: 0.32, width: 1.75, offsetX: -0.3, color: SUCCESS_TEXTURE_TONES.highlight, opacity: 0.32, rotate: -11, durationMs: 4400, travel: 0.11 },
];

export const SUCCESS_TEXTURE_PARTICLES: readonly SuccessTextureParticle[] = [
  { x: 0.16, y: 0.18, kind: 'dot', size: 0.02, rotate: 0, durationMs: 2600, travel: 0.045, opacity: 0.7 },
  { x: 0.78, y: 0.14, kind: 'dash', size: 0.08, rotate: 28, durationMs: 3200, travel: 0.06, opacity: 0.55 },
  { x: 0.62, y: 0.28, kind: 'arc', size: 0.07, rotate: -20, durationMs: 3800, travel: 0.05, opacity: 0.5 },
  { x: 0.28, y: 0.36, kind: 'dash', size: 0.06, rotate: -40, durationMs: 3000, travel: 0.04, opacity: 0.48 },
  { x: 0.84, y: 0.42, kind: 'dot', size: 0.016, rotate: 0, durationMs: 2400, travel: 0.05, opacity: 0.65 },
  { x: 0.12, y: 0.52, kind: 'arc', size: 0.08, rotate: 35, durationMs: 4100, travel: 0.055, opacity: 0.46 },
  { x: 0.48, y: 0.12, kind: 'dash', size: 0.05, rotate: 12, durationMs: 2800, travel: 0.035, opacity: 0.52 },
  { x: 0.7, y: 0.58, kind: 'dot', size: 0.018, rotate: 0, durationMs: 3400, travel: 0.06, opacity: 0.6 },
  { x: 0.34, y: 0.7, kind: 'dash', size: 0.07, rotate: 50, durationMs: 3600, travel: 0.05, opacity: 0.5 },
  { x: 0.86, y: 0.72, kind: 'arc', size: 0.06, rotate: -55, durationMs: 4000, travel: 0.04, opacity: 0.44 },
  { x: 0.22, y: 0.82, kind: 'dot', size: 0.014, rotate: 0, durationMs: 2200, travel: 0.04, opacity: 0.58 },
  { x: 0.56, y: 0.8, kind: 'dash', size: 0.055, rotate: -18, durationMs: 3300, travel: 0.045, opacity: 0.47 },
];

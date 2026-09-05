import {
  SUCCESS_TEXTURE_BLOBS,
  SUCCESS_TEXTURE_PARTICLES,
  SUCCESS_TEXTURE_TONES,
  SUCCESS_TEXTURE_WAVES,
} from '@/features/transfer/success-transition/texture';

describe('success circle texture', () => {
  it('uses several overlapping green blobs so the expand is not a flat fill', () => {
    expect(SUCCESS_TEXTURE_BLOBS.length).toBeGreaterThanOrEqual(6);

    const fills = new Set(SUCCESS_TEXTURE_BLOBS.map((blob) => blob.fill));
    expect(fills.size).toBeGreaterThanOrEqual(4);
    expect(fills.has(SUCCESS_TEXTURE_TONES.mid)).toBe(true);
    expect(fills.has(SUCCESS_TEXTURE_TONES.dark)).toBe(true);
  });

  it('keeps blob opacity translucent so the tones mix', () => {
    for (const blob of SUCCESS_TEXTURE_BLOBS) {
      expect(blob.opacity).toBeGreaterThan(0.1);
      expect(blob.opacity).toBeLessThan(0.7);
    }
  });

  it('defines moving waves that stay visible across the full cover', () => {
    expect(SUCCESS_TEXTURE_WAVES.length).toBeGreaterThanOrEqual(4);
    for (const wave of SUCCESS_TEXTURE_WAVES) {
      expect(wave.opacity).toBeGreaterThanOrEqual(0.3);
      expect(wave.durationMs).toBeGreaterThan(2000);
      expect(Math.abs(wave.travel)).toBeGreaterThan(0.05);
    }
  });

  it('defines drifting particles and foam strokes', () => {
    const kinds = new Set(SUCCESS_TEXTURE_PARTICLES.map((particle) => particle.kind));
    expect(SUCCESS_TEXTURE_PARTICLES.length).toBeGreaterThanOrEqual(10);
    expect(kinds.has('dot')).toBe(true);
    expect(kinds.has('dash')).toBe(true);
    expect(kinds.has('arc')).toBe(true);
  });
});

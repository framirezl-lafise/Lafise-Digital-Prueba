import {
  centeredCheckFrame,
  centeredTitleFrame,
  coverScale,
  successHeroCheckFrame,
  successHeroTitleFrame,
  translationBetween,
} from '@/features/transfer/success-transition/geometry';
import { SUCCESS_CHECK_SIZE } from '@/features/transfer/success-transition/metrics';

const SCREEN = { width: 390, height: 844 };
const TITLE = { width: 168, height: 32 };

describe('success transition geometry', () => {
  it('scales the green disc past the farthest screen corner', () => {
    const scale = coverScale(SCREEN.width, SCREEN.height);
    const covered = (SUCCESS_CHECK_SIZE / 2) * scale;

    expect(covered).toBeGreaterThan(Math.hypot(SCREEN.width / 2, SCREEN.height / 2));
  });

  it('keeps the check in the screen center during the cover', () => {
    const frame = centeredCheckFrame(SCREEN.width, SCREEN.height);

    expect(frame.x + frame.width / 2).toBeCloseTo(SCREEN.width / 2);
    expect(frame.y + frame.height / 2).toBeCloseTo(SCREEN.height / 2);
  });

  it('places the success title below the centered check', () => {
    const check = centeredCheckFrame(SCREEN.width, SCREEN.height);
    const title = centeredTitleFrame(SCREEN.width, SCREEN.height, TITLE);

    expect(title.x + title.width / 2).toBeCloseTo(SCREEN.width / 2);
    expect(title.y).toBeGreaterThan(check.y + check.height);
  });

  it('settles the check upward into the success hero', () => {
    const from = centeredCheckFrame(SCREEN.width, SCREEN.height);
    const to = successHeroCheckFrame(SCREEN.width, 47);
    const delta = translationBetween(from, to);

    expect(to.y).toBeLessThan(from.y);
    expect(delta.y).toBeLessThan(0);
  });

  it('settles the title upward while keeping it centered under the icon', () => {
    const from = centeredTitleFrame(SCREEN.width, SCREEN.height, TITLE);
    const to = successHeroTitleFrame(SCREEN.width, 47, TITLE);
    const delta = translationBetween(from, to);

    expect(to.y).toBeGreaterThan(successHeroCheckFrame(SCREEN.width, 47).y);
    expect(delta.y).toBeLessThan(0);
    expect(Math.abs(delta.x)).toBeLessThan(1);
  });
});

import {
  SUCCESS_CHECK_SIZE,
  SUCCESS_CONTENT_MAX_WIDTH,
  SUCCESS_HERO_PADDING_TOP,
  SUCCESS_ICON_STAGE,
  SUCCESS_ICON_STAGE_MARGIN_BOTTOM,
  SUCCESS_TITLE_GAP,
  SUCCESS_TITLE_PADDING_TOP,
} from '@/features/transfer/success-transition/metrics';

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function coverScale(
  screenWidth: number,
  screenHeight: number,
  circleSize: number = SUCCESS_CHECK_SIZE,
): number {
  const radius = circleSize / 2;
  const distanceToCorner = Math.hypot(screenWidth / 2, screenHeight / 2);
  return distanceToCorner / radius + 0.08;
}

export function centeredCheckFrame(
  screenWidth: number,
  screenHeight: number,
  size: number = SUCCESS_CHECK_SIZE,
): Rect {
  return {
    x: (screenWidth - size) / 2,
    y: (screenHeight - size) / 2,
    width: size,
    height: size,
  };
}

export function centeredTitleFrame(
  screenWidth: number,
  screenHeight: number,
  titleSize: { width: number; height: number },
  checkSize: number = SUCCESS_CHECK_SIZE,
): Rect {
  const check = centeredCheckFrame(screenWidth, screenHeight, checkSize);
  return {
    x: (screenWidth - titleSize.width) / 2,
    y: check.y + check.height + SUCCESS_TITLE_GAP,
    width: titleSize.width,
    height: titleSize.height,
  };
}

export function successHeroCheckFrame(
  screenWidth: number,
  topInset: number,
  checkSize: number = SUCCESS_CHECK_SIZE,
): Rect {
  const contentWidth = Math.min(screenWidth, SUCCESS_CONTENT_MAX_WIDTH);
  const contentX = (screenWidth - contentWidth) / 2;
  const stageX = contentX + (contentWidth - SUCCESS_ICON_STAGE.width) / 2;
  const stageY = topInset + SUCCESS_HERO_PADDING_TOP;

  return {
    x: stageX + (SUCCESS_ICON_STAGE.width - checkSize) / 2,
    y: stageY + (SUCCESS_ICON_STAGE.height - checkSize) / 2,
    width: checkSize,
    height: checkSize,
  };
}

export function successHeroTitleFrame(
  screenWidth: number,
  topInset: number,
  titleSize: { width: number; height: number },
): Rect {
  const contentWidth = Math.min(screenWidth, SUCCESS_CONTENT_MAX_WIDTH);
  const contentX = (screenWidth - contentWidth) / 2;

  return {
    x: contentX + (contentWidth - titleSize.width) / 2,
    y:
      topInset +
      SUCCESS_HERO_PADDING_TOP +
      SUCCESS_ICON_STAGE.height +
      SUCCESS_ICON_STAGE_MARGIN_BOTTOM +
      SUCCESS_TITLE_PADDING_TOP,
    width: titleSize.width,
    height: titleSize.height,
  };
}

export function translationBetween(from: Rect, to: Rect): { x: number; y: number } {
  return {
    x: to.x - from.x,
    y: to.y - from.y,
  };
}

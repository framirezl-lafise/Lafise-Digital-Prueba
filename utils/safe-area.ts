export function bottomContentPadding(insetBottom: number, extra: number): number {
  return extra + Math.max(0, insetBottom);
}

export function tabBarHeight(insetBottom: number, contentHeight: number): number {
  return contentHeight + Math.max(0, insetBottom);
}

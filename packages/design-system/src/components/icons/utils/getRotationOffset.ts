import type { IconDirection } from '../types';

/**
 * 기준 방향과 목표 방향 간의 회전 각도를 계산하는 유틸 함수
 *
 * SVG 아이콘 기준이긴 하지만 일반적인 방향 회전에도 사용 가능합니다.
 *
 * 주어진 기준 방향(baseDirection)에서 목표 방향(targetDirection)까지
 * 회전해야 하는 각도 차이(degree)를 계산합니다.
 *
 * 대부분의 SVG 아이콘은 'right' 방향을 기준으로 제작되지만,
 * 아이콘마다 기준 방향이 다를 수 있습니다. 이 함수는 해당 기준 방향을 감안하여
 * 실제로 얼마나 회전해야 하는지를 계산해줍니다.
 *
 * 이 각도는 보통 CSS transform의 `rotate(...)`에서 사용됩니다.
 *
 * @param baseDirection - SVG 아이콘이 만들어진 기준 방향
 * @param targetDirection - 외부에서 전달받는 원하는 방향 (사용자가 props로 입력)
 * @returns 회전 각도 (단위: degree). 예: 0, 90, 180, -90 등
 *
 * @example
 * getRotationOffset('right', 'bottom'); // 90
 * getRotationOffset('top', 'left');     // 180
 * getRotationOffset('left', 'left');    // 0
 */
export function getRotationOffset(baseDirection: IconDirection, targetDirection: IconDirection): number {
  const angleMap: Record<IconDirection, number> = {
    right: 0,
    bottom: 90,
    left: 180,
    top: -90,
  };

  return angleMap[targetDirection] - angleMap[baseDirection];
}

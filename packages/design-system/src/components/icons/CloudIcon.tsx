import type { BaseLogoProps } from '../logos/types';
import type { ColorIconProps } from './types';

export type CloudIconProps = ColorIconProps & BaseLogoProps;

/**
 * `☁️` CloudIcon (클라우드 아이콘)
 * - 이 아이콘은 메인페이지 배경에 사용됩니다.
 * - 색상은 `color` 속성을 통해 지정할 수 있으며, 기본적으로 `#FCFCED`으로 렌더링됩니다.
 * - 아이콘의 크기는 `size` 속성을 통해 조정할 수 있으며, 기본값은 106px 입니다.
 *
 * @component
 * @param {number} [size=106] - 아이콘의 크기 (기본값: 106)
 * @param {string} [color='#FCFCED'] - 아이콘의 색상 (기본값: '#FCFCED') 높이는 비율에 맞게 반영됩니다.
 * @param {React.SVGProps<SVGSVGElement>} ...rest - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (106px 크기)
 * <CloudIcon />
 *
 * @example
 * // 크기 조정 (150px 크기)
 * <CloudIcon size={150} />
 *
 * @example
 * // 색상 변경 (파란색)
 * <CloudIcon color='blue' />
 */

export default function CloudIcon({ size = 106, color = '#FCFCED', ...rest }: CloudIconProps) {
  return (
    <svg
      fill='none'
      height={size * 0.387}
      viewBox='0 0 106 41'
      width={size}
      {...rest}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M29.9502 0C38.7816 1.15192 40.7021 11.1352 40.7021 18.0469C40.7021 18.828 41.9682 19.2853 42.5195 18.7318C45.4273 15.8123 49.0797 15.0822 52.6055 15.7432C56.9823 16.4165 59.5866 20.9278 60.162 26.688C60.2578 27.647 61.0391 28.415 62.0029 28.415C62.7726 28.415 63.4488 27.9141 63.7351 27.1996C67.0347 18.9676 74.3467 16.9908 78.7168 17.6631C86.3119 19.4161 91.8475 28.415 99.6423 28.415H99.8359C100.156 28.4151 100.478 28.4186 100.799 28.4161C103.72 28.3937 105.114 30.3041 105.658 32.6764C106.546 36.542 103.619 39.8524 99.6585 40.0624C96.4418 40.233 91.8481 40.0588 85.5645 39.166H5.37598C2.40716 39.166 0.000220067 36.7598 0 33.791C0 30.8221 2.40703 28.415 5.37598 28.415C9.97173 28.415 13.2238 23.6432 13.0722 19.0499C13.0612 18.7176 13.0557 18.3832 13.0557 18.0469C13.0559 6.80777 22.3159 0.000277347 29.9502 0Z'
        fill={color}
      />
    </svg>
  );
}

CloudIcon.displayName = 'CloudIcon';

import type { ColorIconProps } from './types';

/**
 * 🔗 ArtIcon (음표 아이콘)
 *
 * - 이 아이콘은 문화 · 예술 라벨에 사용됩니다.
 * - 색상은 `color` 속성을 통해 지정할 수 있으며, 기본적으로 검정색으로 렌더링됩니다.
 * - 아이콘의 크기는 CSS 클래스(`size-20`, `size-24` 등)를 통해 조정할 수 있습니다.
 *
 * @component
 * @param {string} [color='black'] - 아이콘의 색상 (기본값: 'black')
 * @param {React.SVGProps<SVGSVGElement>} ...rest - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (21px 크기)
 * <ArtIcon />
 *
 * @example
 * // 크기 변경
 * <ArtIcon className='size-32' />
 *
 * @example
 * // 색상 변경
 * <ArtIcon color='var(--color-red)' />
 */

export default function ArtIcon({ color = 'black', ...rest }: ColorIconProps) {
  return (
    <svg fill='none' height='21' viewBox='0 0 19 21' width='19' {...rest} xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M4 16.5727C6.206 16.5727 8 14.7787 8 12.5727V2.42773L17 5.69973V13.1297C16.3949 12.7692 15.7044 12.5769 15 12.5727C12.794 12.5727 11 14.3667 11 16.5727C11 18.7787 12.794 20.5727 15 20.5727C17.206 20.5727 19 18.7787 19 16.5727V4.99973C19.0001 4.79456 18.937 4.59433 18.8193 4.4263C18.7016 4.25828 18.5349 4.13063 18.342 4.06073L7.342 0.0607296C7.19099 0.00552656 7.02889 -0.0124136 6.86947 0.00843318C6.71005 0.0292799 6.55801 0.0882976 6.42627 0.180473C6.29454 0.272648 6.187 0.395258 6.11279 0.537886C6.03857 0.680515 5.99988 0.838949 6 0.999729V9.12973C5.39487 8.76919 4.70439 8.57689 4 8.57273C1.794 8.57273 0 10.3667 0 12.5727C0 14.7787 1.794 16.5727 4 16.5727Z'
        fill={color}
      />
    </svg>
  );
}

ArtIcon.displayName = 'ArtIcon';

import type { ColorIconProps } from './types';

/**
 * ❌ DeleteIcon (삭제 아이콘)
 *
 * - 이 아이콘은 항목 삭제 기능에 사용됩니다.
 * - 색상은 `color` 속성을 통해 지정할 수 있으며, 기본적으로 회색으로 렌더링됩니다.
 * - 아이콘의 크기는 CSS 클래스(`size-10`, `size-12` 등)를 통해 조정할 수 있습니다.
 *
 * @component
 * @param {string} [color='#4b4b4b'] - 아이콘의 색상 (기본값: '#4b4b4b')
 * @param {React.SVGProps<SVGSVGElement>} ...rest - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (10px 크기)
 * <DeleteIcon />
 *
 * @example
 * // 크기 변경
 * <DeleteIcon className='size-12' />
 *
 * @example
 * // 색상 변경
 * <DeleteIcon color='var(--color-red-500)' />
 */

export default function DeleteIcon({ color = '#4b4b4b', ...rest }: ColorIconProps) {
  return (
    <svg fill='none' height='10' viewBox='0 0 10 10' width='10' {...rest} xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M9.24315 7.8288L9.3122 7.90476C9.63238 8.29753 9.6092 8.87697 9.24315 9.24302C8.8771 9.60907 8.29767 9.63225 7.9049 9.31207L7.82894 9.24302L0.757869 2.17195C0.367345 1.78143 0.367345 1.14826 0.757869 0.757737C1.14839 0.367213 1.78156 0.367213 2.17208 0.757737L9.24315 7.8288Z'
        fill={color}
      />
      <path
        d='M2.17208 9.24302L2.09612 9.31207C1.70335 9.63225 1.12392 9.60907 0.757868 9.24302C0.391816 8.87697 0.368639 8.29753 0.688815 7.90476L0.757868 7.8288L7.82894 0.757737C8.21946 0.367213 8.85263 0.367213 9.24315 0.757737C9.63367 1.14826 9.63367 1.78143 9.24315 2.17195L2.17208 9.24302Z'
        fill={color}
      />
    </svg>
  );
}

DeleteIcon.displayName = 'DeleteIcon';

import { ArrowIcon } from '../icons';

interface Props {
  /**
   * 버튼 방향 (왼쪽 또는 오른쪽)
   * - 'left': 왼쪽 화살표
   * - 'right': 오른쪽 화살표
   */
  direction: 'left' | 'right';

  /**
   * 버튼 클릭 시 호출되는 콜백 함수
   */
  onClick: () => void;

  /**
   * 버튼 비활성화 여부
   */
  disabled: boolean;

  /**
   * 추가 클래스명
   */
  className?: string;
}

/**
 * 캐러셀의 페이지 이동을 위한 네비게이션 버튼 컴포넌트입니다.
 * - 화면 너비가 md 이상일 때만 표시됩니다.
 * - 방향에 따라 왼쪽 또는 오른쪽 버튼을 렌더링합니다.
 */
export default function NavigationButton({ direction, onClick, disabled, className = '' }: Props) {
  const marginClass = direction === 'left' ? '-mr-20' : '-ml-20';

  return (
    <button
      className={`z-10 ${marginClass} hidden size-40 cursor-pointer items-center justify-center rounded-full border border-gray-50 bg-white text-xl hover:bg-gray-50 disabled:opacity-0 md:flex ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      <ArrowIcon direction={direction === 'right' ? 'right' : undefined} />
    </button>
  );
}

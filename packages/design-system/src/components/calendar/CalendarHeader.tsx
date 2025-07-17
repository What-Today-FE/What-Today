import { twMerge } from 'tailwind-merge';

import { TriangleIcon } from '@/components/icons';

import { useCalendarContext } from './CalendarContext';

interface CurrentHeaderProps {
  /**
   * 헤더 영역의 wrapper 클래스
   */
  headerClass?: string;
  /**
   * 월 타이틀 텍스트에 적용될 클래스
   */
  titleClass?: string;
}

/**
 * CalendarHeader 컴포넌트
 *
 * - 현재 월을 표시하며, 이전/다음 달로 이동할 수 있는 버튼을 제공합니다.
 * - 내부적으로 `CalendarContext`를 통해 `currentMonth` 상태를 조작합니다.
 * - 버튼 클릭 시 `setCurrentMonth`를 사용해 월 단위로 이동합니다.
 *
 * @component
 * @param {CurrentHeaderProps} props - 스타일 커스터마이징을 위한 클래스
 * @returns {JSX.Element} 캘린더 헤더 UI
 *
 * @example
 * ```tsx
 * <CalendarHeader headerClass="mb-4" titleClass="text-xl" />
 * ```
 */
export default function CalendarHeader({ headerClass, titleClass }: CurrentHeaderProps) {
  const { currentMonth, setCurrentMonth } = useCalendarContext();
  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };
  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  return (
    <div className={twMerge('flex w-full justify-center gap-30', headerClass)}>
      {/*버튼 공통컴포넌트로 수정 예정 */}
      <button aria-label='이전 달로 이동' className='cursor-pointer' type='button' onClick={handlePrevMonth}>
        <TriangleIcon direction='left' />
      </button>
      <div className={twMerge('text-lg font-bold text-gray-950', titleClass)}>{currentMonth.format('YYYY년 MM월')}</div>
      {/*버튼 공통컴포넌트로 수정 예정 */}
      <button aria-label='다음 달로 이동' className='cursor-pointer' type='button' onClick={handleNextMonth}>
        <TriangleIcon direction='right' />
      </button>
    </div>
  );
}

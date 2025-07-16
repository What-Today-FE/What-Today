import { twMerge } from 'tailwind-merge';

import { TriangleIcon } from '@/components/icons';

import { useCalendarContext } from './CalendarContext';

interface CurrentHeaderProps {
  /**
   * Header컴포넌트 커스텀 가능
   */
  headerClass?: string;
  /**
   * Title 커스텀 가능
   */
  titleClass?: string;
}

/**
 * CalendarHeader 컴포넌트
 *
 * - 현재 월을 텍스트로 표시하고,
 * - 이전/다음 월로 이동할 수 있는 버튼을 제공합니다.
 * - 월 이동 시 상위 컴포넌트로부터 전달된 핸들러(`onPrev`, `onNext`)를 호출합니다.
 *
 * @component
 * @param {CurrentHeaderProps} props
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <CalendarHeader
 *   currentMonth={dayjs()}
 *   onPrev={() => setMonth((prev) => prev.subtract(1, 'month'))}
 *   onNext={() => setMonth((prev) => prev.add(1, 'month'))}
 * />
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

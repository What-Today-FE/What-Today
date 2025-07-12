import type { Dayjs } from 'dayjs';

interface CurrentHeaderProps {
  /**
   * 현재 표시 중인 월 (Dayjs 객체)
   */
  currentMonth: Dayjs;

  /**
   * 이전 달로 이동할 때 호출되는 콜백 함수
   */
  onPrev: () => void;

  /**
   * 다음 달로 이동할 때 호출되는 콜백 함수
   */
  onNext: () => void;
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
export default function CalendarHeader({ currentMonth, onPrev, onNext }: CurrentHeaderProps) {
  return (
    <div className='flex justify-center gap-30 py-6'>
      {/* ◀︎ 아이콘으로 수정 예정, 버튼 공통컴포넌트로 수정 예정 */}
      <button className='cursor-pointer' onClick={onPrev}>
        ◀︎
      </button>
      <div className='text-xl font-bold text-[#1b1b1b]'>{currentMonth.format('YYYY년 MM월')}</div>
      {/* ▶︎ 아이콘으로 수정 예정, 버튼 공통컴포넌트로 수정 예정 */}
      <button className='cursor-pointer' onClick={onNext}>
        ▶︎
      </button>
    </div>
  );
}

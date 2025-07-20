import type { Dayjs } from 'dayjs';
import { twJoin, twMerge } from 'tailwind-merge';

import OwnerBadge from '../OwnerBadge';
import { useCalendarContext } from './CalendarContext';
type ReservationStatus = 'completed' | 'confirmed' | 'pending';
interface DayCellProps {
  /**
   * 렌더링할 날짜 객체
   */
  day: Dayjs;
  /**
   * 예약 가능한 날짜들의 ISO 문자열 집합 (예: `'2025-07-15'`)
   */
  reservableDates?: Set<string>;
  /**
   * 날짜별 예약 상태
   */
  reservations?: Record<ReservationStatus, number>;
  /**
   * 셀 전체에 적용할 클래스
   */
  dayCellClass?: string;
  /**
   * 내부 날짜 텍스트에 적용할 클래스
   */
  dateClass?: string;
}

/**
 * DayCell 컴포넌트
 *
 * - 단일 날짜 셀을 렌더링합니다.
 * - 클릭 시 해당 날짜를 선택 상태로 설정하며, 선택된 날짜는 강조 표시됩니다.
 * - 예약 가능한 날짜와 현재 월에 속한 날짜 여부에 따라 스타일을 동적으로 적용합니다.
 * - 외부에서 커스텀 스타일을 주입할 수 있도록 `dayCellClass`, `dateClass`를 제공합니다.
 *
 * @component
 * @param {DayCellProps} props 날짜 셀 구성에 필요한 속성
 * @returns {JSX.Element} 렌더링된 날짜 셀
 *
 * @example
 * ```tsx
 * <DayCell
 *   day={day}
 *   reservableDates={new Set(['2025-07-15', '2025-07-17'])}
 * />
 * ```
 */
export default function DayCell({ day, reservableDates, reservations, dayCellClass, dateClass }: DayCellProps) {
  const { currentMonth, selectedDate, onSelectDate } = useCalendarContext();
  const handleClick = () => {
    onSelectDate(day.format('YYYY-MM-DD'));
  };

  const isReservable = reservableDates && reservableDates.has(day.format('YYYY-MM-DD'));
  const isOtherMonth = day.month() !== currentMonth.month();
  const isSelected = selectedDate === day.format('YYYY-MM-DD');
  const dayCellBaseClass = 'flex flex-col gap-4 w-full aspect-square items-center justify-center cursor-pointer p-1';
  const dateBaseClass = twJoin(
    'text-lg font-medium rounded-full size-42 flex justify-center items-center',
    isOtherMonth ? 'text-gray-300' : 'text-gray-800',
    isReservable && 'bg-primary-100 text-primary-500',
    isSelected && 'bg-primary-500 text-white',
  );
  return (
    <div className={twMerge(dayCellBaseClass, dayCellClass)} onClick={handleClick}>
      <span className={twMerge(dateBaseClass, dateClass)}>{day.date()}</span>
      {(['pending', 'confirmed', 'completed'] as const).map((status) => {
        const count = reservations?.[status] ?? 0;
        return count > 0 ? <OwnerBadge count={count} status={status} /> : null;
      })}
    </div>
  );
}

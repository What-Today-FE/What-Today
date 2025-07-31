import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { CalendarContext } from './CalendarContext';
/**
 * CalendarRootProps
 *
 * @property {React.ReactNode} children - 캘린더 하위 컴포넌트들
 * @property {string} [initialDate] - 선택된 날짜의 초기값 (예: `'2025-08-01'`)
 * @property {string} [className] - 사용자 정의 Tailwind 클래스
 */
interface CalendarRootProps {
  /**
   * 캘린더 하위 컴포넌트들
   */
  children: React.ReactNode;
  /**
   * 선택된 날짜의 초기값 (예: `'2025-08-01'`)
   */
  initialDate?: string;
  /**
   * 날짜 선택 시 상위로 선택된 날짜(ISO 문자열)를 알려주는 콜백
   */
  onDateChange?: (date: string) => void;
  /**
   * 월 변경 시 상위로 선택된 년도, 월(ISO 문자열)을 알려주는 콜백
   */
  onMonthChange?: (year: string, month: string) => void;
  /**
   * CalendarRoot 커스텀 가능
   */
  className?: string;
}

/**
 * CalendarRoot 컴포넌트
 *
 * - 캘린더 컴포넌트의 루트이며, 날짜 선택 및 월 이동 상태를 전역으로 제공합니다.
 * - 내부적으로 Context를 통해 현재 월(`currentMonth`)과 선택된 날짜(`selectedDate`)를 관리합니다.
 * - 하위 컴포넌트는 반드시 `CalendarContext`를 통해 상태에 접근해야 합니다.
 *
 * @component
 * @param {CalendarRootProps} props - 초기 설정값 및 스타일 클래스
 * @returns {JSX.Element} 캘린더 루트 컴포넌트
 *
 * @example
 * ```tsx
 * <CalendarRoot initialDate="2025-08-01">
 *   <CalendarHeader />
 *   <CalendarGrid />
 * </CalendarRoot>
 * ```
 */
export default function CalendarRoot({
  children,
  initialDate,
  onDateChange,
  onMonthChange,
  className,
}: CalendarRootProps) {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [selectedDate, setSelectedDate] = useState<string>(initialDate || '');

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    onDateChange?.(date);
  };

  useEffect(() => {
    if (onMonthChange) {
      const year = currentMonth.format('YYYY');
      const month = currentMonth.format('MM');
      onMonthChange(year, month);
    }
  }, [currentMonth, onMonthChange]);

  return (
    <CalendarContext.Provider value={{ selectedDate, onSelectDate: handleSelectDate, currentMonth, setCurrentMonth }}>
      <div aria-label='예약 캘린더' className={twMerge('flex w-full flex-col gap-8', className)}>
        {children}
      </div>
    </CalendarContext.Provider>
  );
}

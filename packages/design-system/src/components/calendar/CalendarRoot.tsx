import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
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
 * @param {CalendarRootProps} props - 내부 요소, 스타일 커스터마이징을 위한 클래스
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
export default function CalendarRoot({ children, className }: CalendarRootProps) {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [selectedDate, setSelectedDate] = useState<string>('');

  return (
    <CalendarContext.Provider value={{ selectedDate, onSelectDate: setSelectedDate, currentMonth, setCurrentMonth }}>
      <div aria-label='예약 캘린더' className={twMerge('flex w-full max-w-640 flex-col gap-8', className)}>
        {children}
      </div>
    </CalendarContext.Provider>
  );
}

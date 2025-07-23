import { Calendar, type ReservationStatus } from '@what-today/design-system';
interface ReservationCalendarProps {
  /**
   * 날짜별 예약 상태 데이터
   * - 키: 'YYYY-MM-DD' 형식 문자열
   * - 값: 예약 상태별 숫자 객체
   */
  reservationsByDate: Record<string, Record<ReservationStatus, number>>;
  /**
   * 날짜 선택 시 상위로 선택된 날짜(ISO 문자열)를 알려주는 콜백
   */
  onChange?: (date: string) => void;
  /**
   * 월 변경 시 상위로 선택된 년도, 월(ISO 문자열)을 알려주는 콜백
   */
  onMonthChange?: (year: string, month: string) => void;
}

/**
 * ReservationCalendar 컴포넌트
 *
 * @param {ReservationCalendarProps} props 컴포넌트 프로퍼티
 * @returns {JSX.Element} 예약 현황이 표시된 캘린더 UI
 *
 * @description
 * - `@what-today/design-system`의 `Calendar` 컴포넌트를 래핑하여,
 * - 예약 상태 데이터를 날짜별로 표시하고,
 * - 날짜 선택 및 월 변경 이벤트를 상위 컴포넌트에 전달합니다.
 */
export default function ReservationCalendar({ reservationsByDate, onChange, onMonthChange }: ReservationCalendarProps) {
  return (
    <div>
      <Calendar.Root
        className='gap-8 rounded-3xl pt-20 pb-10 md:gap-30 md:shadow-[0px_4px_24px_rgba(156,180,202,0.2)]'
        onDateChange={onChange}
        onMonthChange={onMonthChange}
      >
        <Calendar.Header headerClass='py-6' titleClass='md:text-xl' />
        <Calendar.Grid divider weekdayClass='text-sm font-bold md:text-lg' weekdayType='long'>
          {(day) => {
            const key = day.format('YYYY-MM-DD');
            const reservations = reservationsByDate[key];
            return (
              <Calendar.DayCell
                key={key}
                dateClass='size-28 flex md:m-6'
                day={day}
                dayCellClass='h-104 justify-start md:h-124'
                reservations={reservations}
              />
            );
          }}
        </Calendar.Grid>
      </Calendar.Root>
    </div>
  );
}

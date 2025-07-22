import { Calendar } from '@what-today/design-system';
import type { ReservationStatus } from 'node_modules/@what-today/design-system/dist/types/calendar/DayCell';
interface ReservationCalendarProps {
  reservationsByDate: Record<string, Record<ReservationStatus, number>>;
  onChange: (date: string) => void;
}
export default function ReservationCalendar({ reservationsByDate, onChange }: ReservationCalendarProps) {
  return (
    <div>
      <Calendar.Root
        className='gap-8 rounded-3xl pt-20 pb-10 md:gap-30 md:shadow-[0px_4px_24px_rgba(156,180,202,0.2)]'
        onDateChange={onChange}
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

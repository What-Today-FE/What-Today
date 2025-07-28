import { Calendar } from '@what-today/design-system';

interface CalendarSelectorProps {
  selectedDate: string | null;
  onDateChange: (date: string) => void;
  reservableDates: Set<string>;
}

export default function CalendarSelector({ selectedDate, onDateChange, reservableDates }: CalendarSelectorProps) {
  return (
    <Calendar.Root initialDate={selectedDate ?? undefined} onDateChange={onDateChange}>
      <Calendar.Header />
      <Calendar.Grid divider={false} weekdayType='short'>
        {(day) => {
          const isReservable = reservableDates.has(day.format('YYYY-MM-DD'));
          return (
            <Calendar.DayCell
              day={day}
              dayCellClass={
                !isReservable
                  ? 'pointer-events-none opacity-30 cursor-not-allowed'
                  : 'text-lg font-medium rounded-full flex justify-center items-center bg-primary-100'
              }
            />
          );
        }}
      </Calendar.Grid>
    </Calendar.Root>
  );
}

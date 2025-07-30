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
          const isSelected = selectedDate === day.format('YYYY-MM-DD');

          let dateClass: string | undefined;
          if (isReservable) {
            dateClass = isSelected ? 'bg-primary-500 text-white' : 'bg-primary-100 text-primary-500';
          }

          const dayCellClass = !isReservable ? 'pointer-events-none opacity-30 cursor-not-allowed' : undefined;

          return <Calendar.DayCell dateClass={dateClass} day={day} dayCellClass={dayCellClass} />;
        }}
      </Calendar.Grid>
    </Calendar.Root>
  );
}

import CalendarGrid from './CalendarGrid';
import CalendarHeader from './CalendarHeader';
import CalendarRoot from './CalendarRoot';
import type { ReservationStatus } from './DayCell';
import DayCell from './DayCell';

export const Calendar = {
  Root: CalendarRoot,
  Header: CalendarHeader,
  Grid: CalendarGrid,
  DayCell: DayCell,
};
export type { ReservationStatus };

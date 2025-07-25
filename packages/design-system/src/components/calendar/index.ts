import CalendarGrid from './CalendarGrid';
import CalendarHeader from './CalendarHeader';
import CalendarRoot from './CalendarRoot';
import DayCell from './DayCell';

export const Calendar = {
  Root: CalendarRoot,
  Header: CalendarHeader,
  Grid: CalendarGrid,
  DayCell: DayCell,
};

export type ReservationStatus = 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';

export type ManageableReservationStatus = Extract<ReservationStatus, 'pending' | 'confirmed' | 'declined'>;
export type CalendarReservationStatus = Extract<ReservationStatus, 'completed' | 'confirmed' | 'pending'>;

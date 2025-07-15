import { createContext, useContext } from 'react';

export interface CalendarContextType {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

export const CalendarContext = createContext<CalendarContextType | null>(null);

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('Calendar 내부에서만 사용 가능합니다.');
  }
  return context;
};

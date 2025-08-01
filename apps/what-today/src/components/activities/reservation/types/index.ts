import type { ReservationResponse } from '@/schemas/myReservations';

export interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface ReservationSummary {
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
  scheduleId: number;
}

export interface ReservationRequest {
  scheduleId: number;
  headCount: number;
}

export interface ReservationFormData {
  selectedDate: string | null;
  selectedScheduleId: number | null;
  headCount: number;
}

export interface UseReservationReturn {
  // Form Data
  selectedDate: string | null;
  selectedScheduleId: number | null;
  headCount: number;

  // Actions
  setSelectedDate: (date: string | null) => void;
  setSelectedScheduleId: (id: number | null) => void;
  increaseHeadCount: () => void;
  decreaseHeadCount: () => void;

  // Computed Values
  reservableDates: Set<string>;
  availableTimes: Array<{ id: number; startTime: string; endTime: string }>;
  totalPrice: number;
  isReadyToReserve: boolean;

  // API Actions
  submitReservation: (activityId: number) => Promise<ReservationResponse>;
  isSubmitting: boolean;
}

export interface ReservationFormProps {
  schedules: Schedule[];
  price: number;
  onReservationChange?: (summary: ReservationSummary | null) => void;
  onSubmit?: (request: ReservationRequest) => Promise<void>;
  showSubmitButton?: boolean;
  isSubmitting?: boolean;
  isAuthor?: boolean;
  isLoggedIn?: boolean;
}

export interface DesktopReservationProps {
  activityId: number;
  price: number;
  schedules: Schedule[];
  isAuthor?: boolean;
  isLoggedIn?: boolean;
}

export interface TabletReservationSheetProps {
  schedules: Schedule[];
  price: number;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (summary: ReservationSummary) => void;
  isAuthor?: boolean;
  isLoggedIn?: boolean;
}

export interface ReservationBottomBarProps {
  price: number;
  reservation: Pick<ReservationSummary, 'date' | 'startTime' | 'endTime' | 'headCount'> | null;
  onSelectDate: () => void;
  onReserve: () => void;
  isSubmitting?: boolean;
  isAuthor?: boolean;
  isLoggedIn?: boolean;
}

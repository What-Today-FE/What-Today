import {
  BottomSheet,
  Button,
  type CalendarReservationStatus,
  ChevronIcon,
  NoResult,
  Popover,
  Select,
} from '@what-today/design-system';
import dayjs from 'dayjs';
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getMonthlySchedule, getMyActivities } from '@/apis/myActivities';
import ReservationCalendar from '@/components/reservations-status/ReservationCalendar';
import ReservationSheet from '@/components/reservations-status/ReservationSheet';
import { useResponsive } from '@/hooks/useResponsive';
import type { monthlyScheduleResponse, myActivitiesResponse } from '@/schemas/myActivities';

interface ReservationPageState {
  activityList: myActivitiesResponse | null;
  selectedActivityId: number | null;
  calendar: {
    year: string;
    month: string;
    reservations: monthlyScheduleResponse;
  };
  selectedDate: string | null;
  isReservationSheetOpen: boolean;
  selectedDatePos: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  isLoading: {
    activities: boolean;
    calendar: boolean;
  };
}

export default function ReservationsStatusPage() {
  const navigate = useNavigate();
  const responsive = useResponsive();
  const calendarRef = useRef<HTMLDivElement>(null);
  const iniDatePos = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  };

  const [state, setState] = useState<ReservationPageState>({
    activityList: null,
    selectedActivityId: null,
    calendar: {
      year: dayjs().format('YYYY'),
      month: dayjs().format('MM'),
      reservations: [],
    },
    selectedDate: null,
    isReservationSheetOpen: false,
    selectedDatePos: iniDatePos,
    isLoading: {
      activities: true,
      calendar: true,
    },
  });

  const fetchMyActivities = async () => {
    try {
      const result = await getMyActivities({ size: 10 });
      setState((prev) => ({
        ...prev,
        activityList: result,
        selectedActivityId: result.activities[0].id,
        isLoading: { ...prev.isLoading, activities: false },
      }));
    } catch (err) {
      console.error('내 체험 조회 실패:', err);
      setState((prev) => ({ ...prev, isLoading: { ...prev.isLoading, activities: false } }));
    }
  };

  const fetchMonthlySchedule = async () => {
    if (!state.selectedActivityId) return;
    try {
      const result = await getMonthlySchedule(state.selectedActivityId, {
        year: state.calendar.year,
        month: state.calendar.month,
      });
      setState((prev) => ({
        ...prev,
        calendar: { ...prev.calendar, reservations: result },
        isLoading: { ...prev.isLoading, calendar: false },
      }));
    } catch (err) {
      console.error('월별 예약현황 조회 실패:', err);
      setState((prev) => ({ ...prev, isLoading: { ...prev.isLoading, calendar: false } }));
    }
  };

  useEffect(() => {
    fetchMyActivities();
  }, []);

  useEffect(() => {
    fetchMonthlySchedule();
  }, [state.selectedActivityId, state.calendar.year, state.calendar.month]);

  const handleNavigateToMypage = () => {
    navigate('/mypage');
  };

  const handleActivityChange = (value: { value: string; label: ReactNode } | null) => {
    const id = value ? Number(value.value) : null;
    setState((prev) => ({ ...prev, selectedActivityId: id }));
  };

  const handleMonthChange = (year: string, month: string) => {
    if (state.calendar.year === year && state.calendar.month === month) return;
    setState((prev) => ({ ...prev, calendar: { ...prev.calendar, year, month } }));
  };

  const handleDateChange = (date: string) => {
    const el = document.querySelector(`.dt-${date}`) as HTMLElement | null;
    if (el) {
      const rect = el.getBoundingClientRect();
      const pos = {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
      };
      setState((prev) => ({ ...prev, selectedDate: date, isReservationSheetOpen: true, selectedDatePos: pos }));
    } else
      setState((prev) => ({ ...prev, selectedDate: date, isReservationSheetOpen: true, selectedDatePos: iniDatePos }));
  };

  // 예약 페이지 Popup Position 구하기
  // className 형태로 Return
  const reservationPopupPosition: React.CSSProperties = useMemo(() => {
    if (!state || !state.selectedDatePos || !calendarRef.current) return {};
    const calendarRect = calendarRef.current.getBoundingClientRect();
    const dateRect = state.selectedDatePos;
    const space = 10; // 띄울 간격
    let left = dateRect.left + dateRect.width + space;
    let top = dateRect.top;

    const popoverWidth = 340;
    const popoverHeight = 537;

    // 👉 우측 넘침 → 왼쪽으로
    if (left + popoverWidth > calendarRect.left + calendarRect.width) {
      left = dateRect.left - popoverWidth - space;
    }

    // 👉 하단 넘침 → 위쪽으로
    if (top + popoverHeight > calendarRect.top + calendarRect.height) {
      top = calendarRect.top + calendarRect.height - popoverHeight;
    }

    return {
      left: left + window.scrollX,
      top: top + window.scrollY,
    };
  }, [state]);

  const reservationMap = state.calendar.reservations.reduce<Record<string, Record<CalendarReservationStatus, number>>>(
    (acc, cur) => {
      acc[cur.date] = cur.reservations;
      return acc;
    },
    {},
  );

  let scheduleContent;
  if (state.isLoading.activities || state.isLoading.calendar) {
    scheduleContent = <div className='flex justify-center p-40 text-gray-500'>로딩 중...</div>;
  } else if (state.activityList && state.activityList.activities.length > 0) {
    scheduleContent = (
      <div className='flex flex-col md:gap-24 xl:gap-30'>
        <section aria-label='체험 선택하기' className='max-w-640'>
          <Select.Root
            value={
              state.selectedActivityId
                ? {
                    value: String(state.selectedActivityId),
                    label: state.activityList.activities.find((a) => a.id === state.selectedActivityId)?.title ?? '',
                  }
                : null
            }
            onChangeValue={handleActivityChange}
          >
            <Select.Trigger className='h-54 max-w-640'>
              <Select.Value placeholder='내 체험 선택하기' />
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.Label>내 체험 목록</Select.Label>
                {state.activityList &&
                  state.activityList.activities.map(({ id, title }) => {
                    return (
                      <Select.Item key={id} value={String(id)}>
                        {title}
                      </Select.Item>
                    );
                  })}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </section>
        <section ref={calendarRef} aria-label='예약 캘린더'>
          <ReservationCalendar
            reservationsByDate={reservationMap}
            onChange={handleDateChange}
            onMonthChange={handleMonthChange}
          />
        </section>
      </div>
    );
  } else {
    scheduleContent = (
      <div className='flex justify-center p-40'>
        <NoResult dataName='등록한 체험이' />
      </div>
    );
  }
  return (
    <div className='flex flex-col md:gap-24 xl:gap-30'>
      <BottomSheet.Root
        className='h-[80vh]'
        isOpen={state.isReservationSheetOpen && !responsive.isDesktop}
        onClose={() => setState((s) => ({ ...s, isReservationSheetOpen: false }))}
      >
        <BottomSheet.Content className='px-24 py-6'>
          {state.selectedActivityId && state.selectedDate && (
            <ReservationSheet activityId={Number(state.selectedActivityId)} selectedDate={state.selectedDate} />
          )}
        </BottomSheet.Content>
      </BottomSheet.Root>

      {/* Popover Content */}
      <div className={`fixed h-537 w-340 ${state.isReservationSheetOpen && responsive.isDesktop ? 'block' : 'hidden'}`}>
        <Popover.Root open={state.isReservationSheetOpen && responsive.isDesktop}>
          <Popover.Trigger>
            <div />
          </Popover.Trigger>
          <Popover.Content
            overlay
            className='z-1000 rounded-xl bg-white p-24 shadow-xl'
            overlayOpacity={100}
            style={reservationPopupPosition}
            onOverlayClick={() => {
              setState((s) => ({ ...s, isReservationSheetOpen: false }));
            }}
          >
            {state.selectedActivityId && state.selectedDate && (
              <ReservationSheet activityId={Number(state.selectedActivityId)} selectedDate={state.selectedDate} />
            )}
          </Popover.Content>
        </Popover.Root>
      </div>

      <header className='mb-18 flex flex-col gap-10 p-1 md:mb-0'>
        <div className='flex items-center gap-4 border-b border-b-gray-50 pb-20'>
          <Button className='h-fit w-fit' variant='none' onClick={handleNavigateToMypage}>
            <ChevronIcon color='var(--color-gray-300)' direction='left' />
          </Button>
          <h1 className='text-xl font-bold text-gray-950'>예약 현황</h1>
        </div>
        <p className='text-md pt-10 font-medium text-gray-500'>내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.</p>
      </header>
      {scheduleContent}
    </div>
  );
}

import { Button, type CalendarReservationStatus, ChevronIcon, NoResult, Select } from '@what-today/design-system';
import dayjs from 'dayjs';
import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ReservationCalendar from '@/components/reservations-status/ReservationCalendar';
import ReservationCalendarSkeleton from '@/components/reservations-status/ReservationCalendarSkeleton';
import ReservationSelectSkeleton from '@/components/reservations-status/ReservationSelectSkeleton';
import { useInfiniteMyActivitiesQuery } from '@/hooks/myActivity/useMyActivitiesQuery';
import { useMonthlyScheduleQuery } from '@/hooks/myReservation/useMonthlyScheduleQuery';

export default function ReservationsStatusPage() {
  const navigate = useNavigate();

  const [calendarYear] = useState(dayjs().format('YYYY'));
  const [calendarMonth] = useState(dayjs().format('MM'));
  const [selectedActivityId, setSelectedActivityId] = useState(0);

  // 체험 목록 조회 (초기 1페이지만 사용)
  const { data: activityData, isLoading: isLoadingActivities } = useInfiniteMyActivitiesQuery(10);

  // const activityList = activityData?.pages[0]?.activities ?? [];
  const activityList = useMemo(() => {
    return activityData?.pages[0]?.activities ?? [];
  }, [activityData]);

  const { data: monthlyReservations = [], isLoading: isLoadingCalendar } = useMonthlyScheduleQuery({
    activityId: selectedActivityId,
    year: calendarYear,
    month: calendarMonth,
  });

  // activityList가 로드된 후 첫 번째 아이템을 자동 선택
  useEffect(() => {
    if (activityList.length > 0 && selectedActivityId === 0) {
      setSelectedActivityId(activityList[0].id);
    }
  }, [activityList, selectedActivityId]);

  const handleActivityChange = (value: { value: string; label: ReactNode } | null) => {
    if (!value) return;
    setSelectedActivityId(Number(value.value));
  };

  const reservationMap = monthlyReservations.reduce<Record<string, Record<CalendarReservationStatus, number>>>(
    (acc, cur) => {
      acc[cur.date] = cur.reservations;
      return acc;
    },
    {},
  );

  let scheduleContent;
  if (isLoadingActivities || isLoadingCalendar) {
    scheduleContent = (
      <div className='flex flex-col md:gap-24 xl:gap-30'>
        <ReservationSelectSkeleton />
        <ReservationCalendarSkeleton />
      </div>
    );
  } else if (activityList.length > 0) {
    scheduleContent = (
      <div className='flex flex-col md:gap-24 xl:gap-30'>
        <section aria-label='체험 선택하기'>
          <Select.Root
            value={
              selectedActivityId
                ? {
                    value: String(selectedActivityId),
                    label: activityList.find((a) => a.id === selectedActivityId)?.title ?? '',
                  }
                : null
            }
            onChangeValue={handleActivityChange}
          >
            <Select.Trigger className='h-54'>
              <Select.Value placeholder='내 체험 선택하기' />
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.Label>내 체험 목록</Select.Label>
                {activityList.map(({ id, title }) => {
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
        <section aria-label='예약 캘린더'>
          <ReservationCalendar
            activityId={selectedActivityId}
            reservationsByDate={reservationMap}
            // onMonthChange={handleMonthChange}
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
      <header className='mb-16 flex flex-col gap-12'>
        <div className='flex items-center gap-4 border-b border-b-gray-50 pb-8 md:pb-12'>
          <Button className='w-30 p-0' size='sm' variant='none' onClick={() => navigate('/mypage')}>
            <ChevronIcon color='var(--color-gray-300)' direction='left' />
          </Button>
          <h1 className='subtitle-text'>예약 현황</h1>
        </div>
        <p className='body-text text-gray-400 md:pt-10'>내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.</p>
      </header>
      {scheduleContent}
    </div>
  );
}

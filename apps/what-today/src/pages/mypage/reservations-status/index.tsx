import { Button, type CalendarReservationStatus, ChevronIcon, NoResult, Select } from '@what-today/design-system';
import dayjs from 'dayjs';
import { type ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getMonthlySchedule, getMyActivities } from '@/apis/myActivities';
import ReservationCalendar from '@/components/reservations-status/ReservationCalendar';
import type { monthlyScheduleResponse, myActivitiesResponse } from '@/schemas/myActivities';

export default function ReservationsStatusPage() {
  const navigate = useNavigate();

  const [activityList, setActivityList] = useState<myActivitiesResponse | null>(null);
  const [selectedActivityId, setSelectedActivityId] = useState<number>(0);

  const [calendarYear, setCalendarYear] = useState(dayjs().format('YYYY'));
  const [calendarMonth, setCalendarMonth] = useState(dayjs().format('MM'));
  const [monthlyReservations, setMonthlyReservations] = useState<monthlyScheduleResponse>([]);

  const [isLoadingActivities, setIsLoadingActivities] = useState(true);
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(true);

  // 내 체험 목록 조회
  const fetchMyActivities = async () => {
    try {
      const result = await getMyActivities({ size: 10 });
      setActivityList(result);
      if (result.activities.length > 0) {
        setSelectedActivityId(result.activities[0].id);
      } else {
        setSelectedActivityId(0);
      }
    } catch (err) {
      console.error('내 체험 조회 실패:', err);
    } finally {
      setIsLoadingActivities(false);
    }
  };

  // 체험 선택 시 월별 예약 스케줄 조회
  const fetchMonthlySchedule = async () => {
    if (!selectedActivityId) {
      setIsLoadingCalendar(false);
      return;
    }
    try {
      const result = await getMonthlySchedule(selectedActivityId, {
        year: calendarYear,
        month: calendarMonth,
      });
      setMonthlyReservations(result);
    } catch (err) {
      console.error('월별 예약현황 조회 실패:', err);
    } finally {
      setIsLoadingCalendar(false);
    }
  };

  // 페이지 진입 시 내 체험목록 조회
  useEffect(() => {
    fetchMyActivities();
  }, []);

  // 체험 선택, 캘린더 월 선택 시 월별 스케줄 조회
  useEffect(() => {
    fetchMonthlySchedule();
  }, [selectedActivityId, calendarYear, calendarMonth]);

  const handleActivityChange = (value: { value: string; label: ReactNode } | null) => {
    if (!value) return;
    setSelectedActivityId(Number(value.value));
  };

  const handleMonthChange = (year: string, month: string) => {
    if (calendarYear === year && calendarMonth === month) return;
    setCalendarYear(year);
    setCalendarMonth(month);
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
    scheduleContent = <div className='flex justify-center p-40 text-gray-500'>로딩 중...</div>;
  } else if (activityList && activityList.activities.length > 0) {
    scheduleContent = (
      <div className='flex flex-col md:gap-24 xl:gap-30'>
        <section aria-label='체험 선택하기'>
          <Select.Root
            value={
              selectedActivityId
                ? {
                    value: String(selectedActivityId),
                    label: activityList.activities.find((a) => a.id === selectedActivityId)?.title ?? '',
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
                {activityList.activities.map(({ id, title }) => {
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

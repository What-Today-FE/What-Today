import { NoResult, type ReservationStatus, Select } from '@what-today/design-system';
import dayjs from 'dayjs';
import { type ReactNode, type SetStateAction, useEffect, useState } from 'react';

import { getMonthlyReservations, getMyActivities } from '@/apis/myActivities';
import ReservationCalendar from '@/components/reservations-status/ReservationCalendar';
import type { ActivityReservationResponse, myActivitiesResponse } from '@/schemas/myActivities';

export default function ReservationsStatusPage() {
  const [activitiesData, setActivitiesData] = useState<myActivitiesResponse | null>(null);
  const [reservation, setReservation] = useState<ActivityReservationResponse>([]);
  const [loading, setLoading] = useState(true);

  const [selectedActivity, setSelectedActivity] = useState<{ value: string; label: ReactNode } | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [viewingMonth, setViewingMonth] = useState<{ year: string; month: string }>({
    year: dayjs().format('YYYY'),
    month: dayjs().format('MM'),
  });

  const handleValueChange = (value: SetStateAction<{ value: string; label: ReactNode } | null>) => {
    setSelectedActivity(value);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleMonthChange = (year: string, month: string) => {
    if (viewingMonth.year === year && viewingMonth.month === month) return; // 동일하면 무시
    setViewingMonth({ year, month });
  };

  const fetchMyActivities = async () => {
    try {
      const result = await getMyActivities({ size: 10 });
      setActivitiesData(result);
      if (result.activities.length > 0) {
        const firstActivity = result.activities[0];
        setSelectedActivity({ value: String(firstActivity.id), label: firstActivity.title });
      }
    } catch (err) {
      console.error('내 체험 조회 실패:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMyActivities();
  }, []);

  useEffect(() => {
    if (!selectedActivity) return;
    const fetchReservation = async () => {
      try {
        const result = await getMonthlyReservations(Number(selectedActivity.value), {
          year: viewingMonth.year,
          month: viewingMonth.month,
        });
        setReservation(result);
      } catch (err) {
        console.error('월별 예약현황 조회 실패:', err);
      }
      setLoading(false);
    };
    fetchReservation();
  }, [selectedActivity, viewingMonth]);

  const reservationMap = reservation.reduce<Record<string, Record<ReservationStatus, number>>>((acc, cur) => {
    acc[cur.date] = cur.reservations;
    return acc;
  }, {});

  let content;
  if (loading) {
    content = <div className='flex justify-center p-40 text-gray-500'>로딩 중...</div>;
  } else if (activitiesData && activitiesData.activities.length > 0) {
    content = (
      <div className='flex flex-col md:gap-24 xl:gap-30'>
        <section aria-label='체험 선택하기' className='max-w-640'>
          <Select.Root value={selectedActivity} onChangeValue={handleValueChange}>
            <Select.Trigger className='h-54 max-w-640'>
              <Select.Value placeholder='내 체험 선택하기' />
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.Label>내 체험 목록</Select.Label>
                {activitiesData &&
                  activitiesData.activities.map(({ id, title }) => {
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
            reservationsByDate={reservationMap}
            onChange={handleDateChange}
            onMonthChange={handleMonthChange}
          />
        </section>
      </div>
    );
  } else {
    content = (
      <div className='flex justify-center p-40'>
        <NoResult dataName='등록한 체험이' />
      </div>
    );
  }

  return (
    <div className='flex flex-col md:gap-24 xl:gap-30'>
      <header className='mb-18 flex flex-col gap-10 p-1 md:mb-0'>
        <h1 className='text-xl font-bold text-gray-950'>예약 현황</h1>
        <p className='text-md font-medium text-gray-500'>내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.</p>
      </header>
      {content}
    </div>
  );
}

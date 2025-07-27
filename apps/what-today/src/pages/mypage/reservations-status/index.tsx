import { BottomSheet, type CalendarReservationStatus, NoResult, Select } from '@what-today/design-system';
import dayjs from 'dayjs';
import { type ReactNode, type SetStateAction, useEffect, useState } from 'react';

import { getMonthlySchedule, getMyActivities } from '@/apis/myActivities';
import ReservationCalendar from '@/components/reservations-status/ReservationCalendar';
import ReservationSheet from '@/components/reservations-status/ReservationSheet';
import type { monthlyScheduleResponse, myActivitiesResponse } from '@/schemas/myActivities';

export default function ReservationsStatusPage() {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [activityList, setActivityList] = useState<myActivitiesResponse | null>(null);
  const [monthlyReservation, setMonthlyReservation] = useState<monthlyScheduleResponse>([]);
  const [activityLoading, setActivityLoading] = useState(true);
  const [monthlyLoading, setMonthlyLoading] = useState(true);

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
    setBottomSheetOpen(true);
  };

  const handleMonthChange = (year: string, month: string) => {
    if (viewingMonth.year === year && viewingMonth.month === month) return; // 동일하면 무시
    setViewingMonth({ year, month });
  };

  const fetchMyActivities = async () => {
    try {
      const result = await getMyActivities({ size: 10 });
      setActivityList(result);
      if (result.activities.length > 0) {
        const firstActivity = result.activities[0];
        setSelectedActivity({ value: String(firstActivity.id), label: firstActivity.title });
      }
    } catch (err) {
      console.error('내 체험 조회 실패:', err);
    }
    setActivityLoading(false);
  };

  useEffect(() => {
    fetchMyActivities();
  }, []);

  useEffect(() => {
    if (!selectedActivity) return;
    const fetchMonthlySchedule = async () => {
      try {
        const result = await getMonthlySchedule(Number(selectedActivity.value), {
          year: viewingMonth.year,
          month: viewingMonth.month,
        });
        setMonthlyReservation(result);
      } catch (err) {
        console.error('월별 예약현황 조회 실패:', err);
      }
      setMonthlyLoading(false);
    };
    fetchMonthlySchedule();
  }, [selectedActivity, viewingMonth]);

  const reservationMap = monthlyReservation.reduce<Record<string, Record<CalendarReservationStatus, number>>>(
    (acc, cur) => {
      acc[cur.date] = cur.reservations;
      return acc;
    },
    {},
  );

  let content;
  if (activityLoading || monthlyLoading) {
    content = <div className='flex justify-center p-40 text-gray-500'>로딩 중...</div>;
  } else if (activityList && activityList.activities.length > 0) {
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
                {activityList &&
                  activityList.activities.map(({ id, title }) => {
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
      <BottomSheet.Root className='h-508' isOpen={bottomSheetOpen} onClose={() => setBottomSheetOpen(false)}>
        <BottomSheet.Content className='px-24 py-6'>
          {selectedActivity && selectedDate && (
            <ReservationSheet activityId={Number(selectedActivity?.value)} selectedDate={selectedDate} />
          )}
        </BottomSheet.Content>
      </BottomSheet.Root>
      <header className='mb-18 flex flex-col gap-10 p-1 md:mb-0'>
        <h1 className='text-xl font-bold text-gray-950'>예약 현황</h1>
        <p className='text-md font-medium text-gray-500'>내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.</p>
      </header>
      {content}
    </div>
  );
}

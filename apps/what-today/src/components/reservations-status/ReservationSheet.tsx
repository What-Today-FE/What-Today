import { type ManageableReservationStatus, Select } from '@what-today/design-system';
import dayjs from 'dayjs';
import { type ReactNode, type SetStateAction, useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { getDailySchedule, getReservation } from '@/apis/myActivities';
import type { dailyScheduleResponse, reservation } from '@/schemas/myActivities';

import ReservationTabPanel from './ReservationTabPanel';

// const tabLabels = {
//   pending: '신청',
//   confirmed: '승인',
//   declined: '거절',
// } as const;

interface ReservationSheetProps {
  activityId: number;
  selectedDate: string;
}

export default function ReservationSheet({ activityId, selectedDate }: ReservationSheetProps) {
  const [dailyReservation, setDailyReservation] = useState<dailyScheduleResponse>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSchedule, setSelectedSchedule] = useState<{ value: string; label: ReactNode } | null>(null);
  const [selectedCount, setSelectedCount] = useState<Record<ManageableReservationStatus, number>>({
    pending: 5,
    confirmed: 0,
    declined: 0,
  });
  const [selectedTab, setSelectedTab] = useState<ManageableReservationStatus>('pending');
  const [reservationData, setReservationData] = useState<reservation[]>([]);
  const tabData: { key: ManageableReservationStatus; label: string }[] = [
    { key: 'pending', label: '신청' },
    { key: 'confirmed', label: '승인' },
    { key: 'declined', label: '거절' },
  ];

  const handleValueChange = (value: SetStateAction<{ value: string; label: ReactNode } | null>) => {
    // 타입 가드: value가 함수인 경우 처리하지 않음 (useState의 함수 형태 대응)
    if (typeof value === 'function') return;

    if (!value) {
      setSelectedSchedule(null);
      setSelectedCount({ pending: 0, confirmed: 0, declined: 0 });
      return;
    }

    setSelectedSchedule(value);

    const matched = dailyReservation.find((schedule) => String(schedule.scheduleId) === value.value);

    if (matched) {
      setSelectedCount(matched.count);
    }
  };

  const fetchDailySchedule = useCallback(
    async (selectedDate: string) => {
      try {
        const result = await getDailySchedule(activityId, { date: selectedDate });
        setDailyReservation(result);
      } catch (err) {
        console.error('시간대별 스케줄 조회 실패:', err);
      }
      setLoading(false);
    },
    [activityId],
  );
  useEffect(() => {
    fetchDailySchedule(selectedDate);
  }, [selectedDate, fetchDailySchedule]);

  const fetchReservation = useCallback(async () => {
    try {
      const scheduleId = Number(selectedSchedule?.value);
      const result = await getReservation(activityId, { scheduleId: scheduleId, status: selectedTab });
      setReservationData(result.reservations);
    } catch (err) {
      console.error('시간대별 스케줄 조회 실패:', err);
    }
    setLoading(false);
  }, [activityId, selectedSchedule, selectedTab]);
  useEffect(() => {
    fetchReservation();
  }, [fetchReservation]);

  return (
    <div className='flex flex-col gap-20 bg-white'>
      <section className='flex flex-col gap-12'>
        <h3 className='text-xl font-bold'>{dayjs(selectedDate).format('YY년 M월 D일')}</h3>
      </section>
      <section className='flex flex-col gap-20 md:flex-row'>
        <div className='flex grow flex-col gap-12'>
          <h3 className='text-md font-bold'>예약 시간</h3>
          <Select.Root value={selectedSchedule} onChangeValue={handleValueChange}>
            <Select.Trigger className='h-54'>
              <Select.Value placeholder='예약 시간 선택하기' />
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.Label>시간대별 예약</Select.Label>
                {dailyReservation.map(({ scheduleId, startTime, endTime }) => {
                  return (
                    <Select.Item key={scheduleId} value={String(scheduleId)}>
                      {startTime}~{endTime}
                    </Select.Item>
                  );
                })}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
      </section>
      <div className='flex text-lg'>
        {tabData.map(({ key, label }) => {
          const selectedStyle =
            selectedTab === key ? 'border-b-2 border-primary-500 text-primary-500' : 'text-gray-500';
          return (
            // <Button
            //   key={key}
            //   className={twMerge('w-full rounded-none border-b border-gray-100', selectedStyle)}
            //   variant='none'
            //   // onClick={() => setSelectedTab(key)}
            //   onClick={() => {
            //     console.log('탭 클릭됨:', key, '현재 count:', selectedCount);
            //     setSelectedTab(key);
            //   }}
            // >
            //   {label} {selectedCount[key]}
            // </Button>
            <button
              key={key}
              className={twMerge('w-full rounded-none border-b border-gray-100', selectedStyle)}
              // onClick={() => setSelectedTab(key)}
              onClick={() => setSelectedTab(key)}
            >
              {label} {selectedCount[key]}
            </button>
          );
        })}
      </div>
      <ReservationTabPanel ownerStatus={selectedTab} reservationData={reservationData} />
    </div>
  );
}

import { Button, Select } from '@what-today/design-system';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { getDailySchedule } from '@/apis/myActivities';
import type { dailyScheduleResponse } from '@/schemas/myActivities';

import ReservationTabPanel from './ReservationTabPanel';

const Tabs = ['신청', '승인', '거절'] as const;
type Tab = (typeof Tabs)[number];

interface ReservationSheetProps {
  activityId: number;
  selectedDate: string;
}
export default function ReservationSheet({ activityId, selectedDate }: ReservationSheetProps) {
  const [selectedTab, setSelectedTab] = useState<Tab>('신청');
  const [dailyReservation, setDailyReservation] = useState<dailyScheduleResponse>([]);
  const [loading, setLoading] = useState(true);

  const fetchDailySchedule = async (selectedDate: string) => {
    try {
      const result = await getDailySchedule(activityId, { date: selectedDate });
      setDailyReservation(result);
    } catch (err) {
      console.error('내 체험 조회 실패:', err);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchDailySchedule(selectedDate);
  }, [selectedDate]);

  return (
    <div className='flex flex-col gap-20 bg-white'>
      <section className='flex flex-col gap-12'>
        <h3 className='text-xl font-bold'>25년 7월 24일</h3>
        <div className='flex text-lg'>
          {Tabs.map((tab) => {
            const selectedStyle =
              selectedTab === tab ? 'border-b-2 border-primary-500 text-primary-500' : 'text-gray-500';
            return (
              <Button
                key={tab}
                className={twMerge('w-full rounded-none border-b border-gray-100', selectedStyle)}
                variant='none'
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </Button>
            );
          })}
        </div>
      </section>
      <section className='flex flex-col gap-20 md:flex-row'>
        <div className='flex grow flex-col gap-12'>
          <h3 className='text-md font-bold'>예약 시간</h3>
          <Select.Root value={{ value: '시간대별 예약', label: '예약 시간을 선택해주세요' }}>
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
        <ReservationTabPanel />
      </section>
    </div>
  );
}

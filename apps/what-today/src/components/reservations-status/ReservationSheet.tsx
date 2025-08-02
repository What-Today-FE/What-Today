import { useQueryClient } from '@tanstack/react-query';
import { type ManageableReservationStatus, Select } from '@what-today/design-system';
import dayjs from 'dayjs';
import { type ReactNode, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { patchReservationStatus } from '@/apis/myActivities';
import { useDailyScheduleQuery } from '@/hooks/myReservation/useDailyScheduleQuery';
import { useReservationQuery } from '@/hooks/myReservation/useReservationQuery';

import ReservationTabPanel from './ReservationTabPanel';

interface ReservationSheetProps {
  activityId: number;
  selectedDate: string;
}

const tabData: { key: ManageableReservationStatus; label: string }[] = [
  { key: 'pending', label: '신청' },
  { key: 'confirmed', label: '승인' },
  { key: 'declined', label: '거절' },
];

export default function ReservationSheet({ activityId, selectedDate }: ReservationSheetProps) {
  // 상태 분리
  const [selectedSchedule, setSelectedSchedule] = useState<{ value: string; label: ReactNode } | null>(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<ManageableReservationStatus>('pending');

  // 날짜별 스케줄 가져오기
  const { data: dailySchedule = [], isLoading: loadingSchedule } = useDailyScheduleQuery(activityId, selectedDate);

  // 예약 정보 가져오기 (스케줄 ID와 상태 기반)
  const { data: reservations, isLoading: loadingReservation } = useReservationQuery(
    activityId,
    selectedScheduleId ?? 0,
    selectedStatus,
  );

  // 날짜 바뀌면 상태 초기화
  useEffect(() => {
    setSelectedStatus('pending');
    setSelectedSchedule(null);
    setSelectedScheduleId(null);
  }, [selectedDate]);

  // 탭 변경
  const handleTabChange = (status: ManageableReservationStatus) => {
    setSelectedStatus(status);
  };

  // 시간 선택
  const handleSelectSchedule = (value: { value: string; label: React.ReactNode } | null) => {
    if (!value) {
      setSelectedSchedule(null);
      setSelectedScheduleId(null);
      return;
    }
    setSelectedSchedule(value);
    setSelectedScheduleId(Number(value.value));
  };
  const queryClient = useQueryClient();

  const handleApprove = async (id: number) => {
    try {
      await patchReservationStatus(activityId, id, 'confirmed');
      await queryClient.invalidateQueries({ queryKey: ['reservation'] });
      await queryClient.invalidateQueries({ queryKey: ['dailySchedule'] });
    } catch (error) {
      console.error('Error in handleApprove:', error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await patchReservationStatus(activityId, id, 'declined');
      await queryClient.invalidateQueries({ queryKey: ['reservation'] });
      await queryClient.invalidateQueries({ queryKey: ['dailySchedule'] });
    } catch (error) {
      console.error('Error in handleApprove:', error);
    }
  };

  // 선택된 시간대의 예약 수
  const selectedCount = dailySchedule.find((s) => s.scheduleId === selectedScheduleId)?.count ?? {
    pending: 0,
    confirmed: 0,
    declined: 0,
  };
  return (
    <div className='flex h-full flex-col gap-20 bg-white'>
      <section className='flex flex-col gap-12'>
        <h3 className='text-xl font-bold'>{dayjs(selectedDate).format('YY년 M월 D일')}</h3>
      </section>
      <section className='flex flex-col gap-20 md:flex-row'>
        <div className='flex grow flex-col gap-12'>
          <h3 className='body-text font-bold'>예약 시간</h3>
          <Select.Root value={selectedSchedule} onChangeValue={handleSelectSchedule}>
            <Select.Trigger className='h-54'>
              <Select.Value placeholder='예약 시간 선택하기' />
            </Select.Trigger>
            <Select.Content className='z-70'>
              <Select.Group>
                <Select.Label>시간대별 예약</Select.Label>
                {dailySchedule.map(({ scheduleId, startTime, endTime }) => {
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
      <div className='body-text flex'>
        {tabData.map(({ key, label }) => {
          const selectedStyle =
            selectedStatus === key ? '  text-primary-500 bg-primary-100 border-primary-500' : 'text-gray-400';
          return (
            <button
              key={key}
              className={twMerge('w-full cursor-pointer rounded-t-xl border-b border-gray-100 py-6', selectedStyle)}
              onClick={() => handleTabChange(key)}
            >
              {label} {selectedCount[key]}
            </button>
          );
        })}
      </div>
      <ReservationTabPanel
        ownerStatus={selectedStatus}
        reservationData={reservations?.reservations ?? []}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}

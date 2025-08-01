import { type ManageableReservationStatus, Select } from '@what-today/design-system';
import dayjs from 'dayjs';
import { type ReactNode, type SetStateAction, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { getDailySchedule, getReservation, patchReservationStatus } from '@/apis/myActivities';
import type { dailyScheduleResponse, timeSlotReservationResponse } from '@/schemas/myActivities';

import ReservationTabPanel from './ReservationTabPanel';

interface ReservationSheetProps {
  activityId: number;
  selectedDate: string;
}
export default function ReservationSheet({ activityId, selectedDate }: ReservationSheetProps) {
  // 상태 분리
  const [dailySchedule, setDailySchedule] = useState<dailyScheduleResponse>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<{ value: string; label: ReactNode } | null>(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [selectedCount, setSelectedCount] = useState({ pending: 0, confirmed: 0, declined: 0 });
  const [selectedStatus, setSelectedStatus] = useState<ManageableReservationStatus>('pending');
  const [reservations, setReservations] = useState<timeSlotReservationResponse | null>(null);

  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [loadingReservation, setLoadingReservation] = useState(false);

  const tabData: { key: ManageableReservationStatus; label: string }[] = [
    { key: 'pending', label: '신청' },
    { key: 'confirmed', label: '승인' },
    { key: 'declined', label: '거절' },
  ];

  const fetchDailySchedule = async () => {
    try {
      const result = await getDailySchedule(activityId, { date: selectedDate });
      setDailySchedule(result);
    } catch (err) {
      console.error('일자별 스케줄 조회 실패:', err);
    } finally {
      setLoadingSchedule(false);
    }
  };

  const fetchReservations = async () => {
    if (!selectedScheduleId) return;
    try {
      const result = await getReservation(activityId, {
        scheduleId: selectedScheduleId,
        status: selectedStatus,
      });
      setReservations(result);
    } catch (err) {
      console.error('스케줄별 예약현황 조회 실패:', err);
    } finally {
      setLoadingReservation(false);
    }
  };

  useEffect(() => {
    fetchDailySchedule();
  }, [activityId, selectedDate]);

  useEffect(() => {
    if (!selectedScheduleId) return;

    fetchReservations();
  }, [selectedScheduleId, selectedStatus]);

  useEffect(() => {
    // 날짜가 바뀔 때마다 예약 상태 초기화
    setSelectedStatus('pending');
    setSelectedSchedule(null);
    setSelectedCount({ pending: 0, confirmed: 0, declined: 0 });
    setReservations(null);
  }, [selectedDate]);

  const handleSelectSchedule = (value: SetStateAction<{ value: string; label: ReactNode } | null>) => {
    if (typeof value === 'function') return;

    if (!value) {
      setSelectedScheduleId(null);
      setSelectedSchedule(null);
      setSelectedCount({ pending: 0, confirmed: 0, declined: 0 });
      return;
    }

    const matched = dailySchedule.find((schedule) => String(schedule.scheduleId) === value.value);

    setSelectedSchedule(value);
    setSelectedScheduleId(Number(value.value));
    setSelectedCount(matched?.count ?? { pending: 0, confirmed: 0, declined: 0 });
  };

  const handleTabChange = (status: ManageableReservationStatus) => {
    setSelectedStatus(status);
  };

  const handleApprove = async (id: number) => {
    await patchReservationStatus(activityId, id, 'confirmed');
    await fetchReservations();
    await fetchDailySchedule(); // 숫자 갱신용
  };

  const handleReject = async (id: number) => {
    await patchReservationStatus(activityId, id, 'declined');
    await fetchReservations();
    await fetchDailySchedule(); // 숫자 갱신용
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
            <Select.Content className='z-50'>
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

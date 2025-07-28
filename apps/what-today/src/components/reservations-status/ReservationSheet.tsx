import { type ManageableReservationStatus, Select } from '@what-today/design-system';
import dayjs from 'dayjs';
import { type ReactNode, type SetStateAction, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { getDailySchedule, getReservation } from '@/apis/myActivities';
import type { dailyScheduleResponse, timeSlotReservationResponse } from '@/schemas/myActivities';

import ReservationTabPanel from './ReservationTabPanel';

interface ReservationSheetProps {
  activityId: number;
  selectedDate: string;
}

interface ReservationSheetState {
  dailySchedule: dailyScheduleResponse;
  selectedScheduleId: number | null;
  selectedStatus: ManageableReservationStatus;
  selectedSchedule: { value: string; label: ReactNode } | null;
  selectedCount: { pending: number; confirmed: number; declined: number };
  reservations: timeSlotReservationResponse | null;
  isLoading: {
    schedule: boolean;
    reservation: boolean;
  };
}
export default function ReservationSheet({ activityId, selectedDate }: ReservationSheetProps) {
  const [state, setState] = useState<ReservationSheetState>({
    dailySchedule: [],
    selectedScheduleId: null,
    selectedStatus: 'pending',
    selectedSchedule: null,
    selectedCount: { pending: 0, confirmed: 0, declined: 0 },
    reservations: null,
    isLoading: {
      schedule: false,
      reservation: false,
    },
  });

  const tabData: { key: ManageableReservationStatus; label: string }[] = [
    { key: 'pending', label: '신청' },
    { key: 'confirmed', label: '승인' },
    { key: 'declined', label: '거절' },
  ];

  const fetchDailySchedule = async () => {
    try {
      const result = await getDailySchedule(activityId, { date: selectedDate });
      setState((prev) => ({
        ...prev,
        dailySchedule: result,
        isLoading: { ...prev.isLoading, schedule: false },
      }));
    } catch (err) {
      console.error('일자별 스케줄 조회 실패:', err);
      setState((prev) => ({ ...prev, isLoading: { ...prev.isLoading, schedule: false } }));
    }
  };

  const fetchReservations = async () => {
    if (!state.selectedScheduleId) return;
    try {
      const result = await getReservation(activityId, {
        scheduleId: state.selectedScheduleId,
        status: state.selectedStatus,
      });
      setState((prev) => ({ ...prev, reservations: result, isLoading: { ...prev.isLoading, reservations: false } }));
    } catch (err) {
      console.error('스케줄별 예약현황 조회 실패:', err);
      setState((prev) => ({ ...prev, isLoading: { ...prev.isLoading, reservations: false } }));
    }
  };

  useEffect(() => {
    fetchDailySchedule();
  }, [activityId, selectedDate]);

  useEffect(() => {
    if (!state.selectedScheduleId) return;

    setState((prev) => ({
      ...prev,
      isLoading: { ...prev.isLoading, reservation: true },
    }));
    fetchReservations();
  }, [state.selectedScheduleId, state.selectedStatus]);

  useEffect(() => {
    // 날짜가 바뀔 때마다 예약 상태 초기화
    setState((prev) => ({
      ...prev,
      selectedStatus: 'pending',
      selectedSchedule: null,
      selectedCount: { pending: 0, confirmed: 0, declined: 0 },
      reservations: null,
    }));
  }, [selectedDate]);

  const handleSelectSchedule = (value: SetStateAction<{ value: string; label: ReactNode } | null>) => {
    if (typeof value === 'function') return;

    if (!value) {
      setState((prev) => ({
        ...prev,
        selectedScheduleId: null,
        selectedSchedule: null,
        selectedCount: { pending: 0, confirmed: 0, declined: 0 },
      }));
      return;
    }

    const matched = state.dailySchedule.find((schedule) => String(schedule.scheduleId) === value.value);

    setState((prev) => ({
      ...prev,
      selectedSchedule: value,
      selectedScheduleId: Number(value.value),
      selectedCount: matched?.count ?? { pending: 0, confirmed: 0, declined: 0 },
    }));
  };

  const handleTabChange = (status: ManageableReservationStatus) => {
    setState((prev) => ({
      ...prev,
      selectedStatus: status,
    }));
  };

  return (
    <div className='flex flex-col gap-20 bg-white'>
      <section className='flex flex-col gap-12'>
        <h3 className='text-xl font-bold'>{dayjs(selectedDate).format('YY년 M월 D일')}</h3>
      </section>
      <section className='flex flex-col gap-20 md:flex-row'>
        <div className='flex grow flex-col gap-12'>
          <h3 className='text-md font-bold'>예약 시간</h3>
          <Select.Root value={state.selectedSchedule} onChangeValue={handleSelectSchedule}>
            <Select.Trigger className='h-54'>
              <Select.Value placeholder='예약 시간 선택하기' />
            </Select.Trigger>
            <Select.Content className='z-1000'>
              <Select.Group>
                <Select.Label>시간대별 예약</Select.Label>
                {state.dailySchedule.map(({ scheduleId, startTime, endTime }) => {
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
            state.selectedStatus === key ? 'border-b-2 border-primary-500 text-primary-500' : 'text-gray-500';
          return (
            <button
              key={key}
              className={twMerge('w-full rounded-none border-b border-gray-100 py-6', selectedStyle)}
              onClick={() => handleTabChange(key)}
            >
              {label} {state.selectedCount[key]}
            </button>
          );
        })}
      </div>
      <ReservationTabPanel
        ownerStatus={state.selectedStatus}
        reservationData={state.reservations?.reservations ?? []}
      />
    </div>
  );
}

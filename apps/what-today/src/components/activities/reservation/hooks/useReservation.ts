import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { useCallback, useMemo, useState } from 'react';

import { createReservation } from '@/apis/activityDetail';
import type { ReservationResponse } from '@/schemas/myReservations';

import type { ReservationSummary, Schedule, UseReservationReturn } from '../types';

dayjs.extend(isSameOrAfter);

interface UseReservationOptions {
  onSuccess?: (reservation: ReservationResponse) => void;
  onError?: (error: Error) => void;
  onReservationChange?: (summary: ReservationSummary | null) => void;
}

export function useReservation(
  schedules: Schedule[],
  price: number,
  options: UseReservationOptions = {},
): UseReservationReturn {
  const { onSuccess, onError, onReservationChange } = options;

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [headCount, setHeadCount] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = dayjs();

  // 유효한 스케줄 필터링 (오늘 이후만)
  const validSchedules = useMemo(() => {
    return schedules.filter((s) => {
      const scheduleDateTime = dayjs(`${s.date}T${s.startTime}`);
      return scheduleDateTime.isSameOrAfter(today);
    });
  }, [schedules, today]);

  // 예약 가능한 날짜들
  const reservableDates = useMemo(() => {
    return new Set(validSchedules.map((s) => s.date));
  }, [validSchedules]);

  // 선택된 날짜의 가능한 시간들
  const availableTimes = useMemo(() => {
    if (!selectedDate) return [];
    return validSchedules.filter((s) => s.date === selectedDate);
  }, [selectedDate, validSchedules]);

  // 총 가격
  const totalPrice = useMemo(() => headCount * price, [headCount, price]);

  // 예약 준비 완료 여부
  const isReadyToReserve = selectedScheduleId !== null;

  // 현재 예약 요약 정보
  const reservationSummary = useMemo((): ReservationSummary | null => {
    if (!selectedScheduleId || !selectedDate) return null;

    const selectedSchedule = validSchedules.find((s) => s.id === selectedScheduleId);
    if (!selectedSchedule) return null;

    return {
      date: selectedSchedule.date,
      startTime: selectedSchedule.startTime,
      endTime: selectedSchedule.endTime,
      headCount,
      scheduleId: selectedScheduleId,
    };
  }, [selectedScheduleId, selectedDate, headCount, validSchedules]);

  // 예약 요약 정보 변경 시 콜백 호출
  useMemo(() => {
    onReservationChange?.(reservationSummary);
  }, [reservationSummary, onReservationChange]);

  // 날짜 선택 (시간 초기화)
  const handleSetSelectedDate = useCallback((date: string | null) => {
    setSelectedDate(date);
    setSelectedScheduleId(null);
  }, []);

  // 인원 수 증가
  const increaseHeadCount = useCallback(() => {
    setHeadCount((prev) => prev + 1);
  }, []);

  // 인원 수 감소
  const decreaseHeadCount = useCallback(() => {
    setHeadCount((prev) => Math.max(1, prev - 1));
  }, []);

  // 예약 제출
  const submitReservation = useCallback(
    async (activityId: number) => {
      if (!selectedScheduleId) {
        throw new Error('스케줄이 선택되지 않았습니다.');
      }

      setIsSubmitting(true);

      try {
        const reservation = await createReservation(activityId, {
          scheduleId: selectedScheduleId,
          headCount,
        });

        // 성공 시 상태 초기화
        setSelectedDate(null);
        setSelectedScheduleId(null);
        setHeadCount(1);

        onSuccess?.(reservation);
        return reservation;
      } catch (error) {
        const errorObj = error instanceof Error ? error : new Error('예약 중 오류가 발생했습니다.');
        onError?.(errorObj);
        throw errorObj;
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedScheduleId, headCount, onSuccess, onError],
  );

  return {
    // Form Data
    selectedDate,
    selectedScheduleId,
    headCount,

    // Actions
    setSelectedDate: handleSetSelectedDate,
    setSelectedScheduleId,
    increaseHeadCount,
    decreaseHeadCount,

    // Computed Values
    reservableDates,
    availableTimes,
    totalPrice,
    isReadyToReserve,

    // API Actions
    submitReservation,
    isSubmitting,
  };
}

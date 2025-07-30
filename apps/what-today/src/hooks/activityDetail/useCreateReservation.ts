import { useMutation } from '@tanstack/react-query';

import { createReservation } from '@/apis/activityDetail';
import type { CreateReservationBodyDto } from '@/schemas/myReservations';

/**
 * @description 체험 예약 생성 뮤테이션 훅
 * @param activityId 체험 ID
 */
export const useCreateReservation = (activityId: number) => {
  return useMutation({
    mutationFn: (body: CreateReservationBodyDto) => createReservation(activityId, body),
  });
};

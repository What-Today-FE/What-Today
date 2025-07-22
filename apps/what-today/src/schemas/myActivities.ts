import { z } from 'zod';

import { activitySchema } from './activities';

/**
 * To server
 * @description 내가 등록한 체험 리스트 조회 요청 시 사용하는 쿼리 파라미터의 유효성을 검사하는 스키마
 */
export const myActivitiesParamSchema = z.object({
  size: z.number().int().positive().max(50).default(10).optional(),
  cursorId: z.number().int().positive().optional(),
});

/**
 * From server
 * @description 내가 등록한 체험 리스트 데이터의 유효성을 검사하는 스키마
 */
export const myActivitiesResponseSchema = z.object({
  activities: z.array(activitySchema),
  totalCount: z.number().int(),
  cursorId: z.number().int().positive().nullable(),
});

/**
 * To server
 * @description 내가 선택한 체험 월별 예약 현황 조회 시 사용하는 쿼리 파라미터의 유효성을 검사하는 스키마
 */
export const activityReservationParamSchema = z.object({
  year: z.string().regex(/^\d{4}$/, { message: 'YYYY 형식이어야 합니다.' }),
  month: z.string().regex(/^(0[1-9]|1[0-2])$/, { message: 'MM 형식이어야 합니다.' }),
});

/**
 * From server
 * @description 내가 선택한 체험 월별 예약 현황 조회 데이터의 유효성을 검사하는 스키마
 */
export const activityReservationResponseSchema = z.array(
  z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'YYYY-MM-DD 형식이어야 합니다.' }),
    reservations: z.object({
      completed: z.number().int().default(0),
      confirmed: z.number().int().default(0),
      pending: z.number().int().default(0),
    }),
  }),
);

export type myActivitiesParam = z.infer<typeof myActivitiesParamSchema>;
export type myActivitiesResponse = z.infer<typeof myActivitiesResponseSchema>;
export type ActivityReservationParam = z.infer<typeof activityReservationParamSchema>;
export type ActivityReservationResponse = z.infer<typeof activityReservationResponseSchema>;

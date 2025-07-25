import { z } from 'zod';

import { activitySchema } from './activities';

/**
 * @description 기본 체험 데이터 유효성을 검사하는 스키마
 */
export const reservationSchema = z.object({
  id: z.number().int().positive(),
  nickname: z.string(),
  userId: z.number().int().positive(),
  teamId: z.string(),
  activityId: z.number().int().positive(),
  scheduleId: z.number().int().positive(),
  status: z.string(),
  reviewSubmitted: z.boolean(),
  totalPrice: z.number().int().nonnegative(),
  headCount: z.number().int().nonnegative(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

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
export const monthlyScheduleParamSchema = z.object({
  year: z.string().regex(/^\d{4}$/, { message: 'YYYY 형식이어야 합니다.' }),
  month: z.string().regex(/^(0[1-9]|1[0-2])$/, { message: 'MM 형식이어야 합니다.' }),
});

/**
 * From server
 * @description 내가 선택한 체험 월별 예약 현황 조회 데이터의 유효성을 검사하는 스키마
 */
export const monthlyScheduleResponseSchema = z.array(
  z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'YYYY-MM-DD 형식이어야 합니다.' }),
    reservations: z.object({
      completed: z.number().int().default(0),
      confirmed: z.number().int().default(0),
      pending: z.number().int().default(0),
    }),
  }),
);

/**
 * To server
 * @description 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케줄 조회 요청 시 사용하는 쿼리 파라미터의 유효성을 검사하는 스키마
 */
export const dailyScheduleParamSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'YYYY-MM-DD 형식이어야 합니다.' }),
});

/**
 * From server
 * @description 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케줄 데이터의 유효성을 검사하는 스키마
 */
export const dailyScheduleResponseSchema = z.array(
  z.object({
    scheduleId: z.number().int().positive(),
    startTime: z.string(),
    endTime: z.string(),
    count: z.object({
      declined: z.number().int().nonnegative(),
      confirmed: z.number().int().nonnegative(),
      pending: z.number().int().nonnegative(),
    }),
  }),
);

/**
 * To server
 * @description 내 체험 예약 시간대별 예약 내역 조회 요청 시 사용하는 쿼리 파라미터의 유효성을 검사하는 스키마
 */
export const timeSlotReservationParamSchema = z.object({
  cursorId: z.number().int().positive().optional(),
  size: z.number().int().positive().max(50).default(10).optional(),
  scheduleId: z.number().int().positive(),
  status: z.string(),
});

/**
 * From server
 * @description 내 체험 예약 시간대별 예약 내역 데이터의 유효성을 검사하는 스키마
 */
export const timeSlotReservationResponseSchema = z.object({
  reservations: z.array(reservationSchema),
  totalCount: z.number().int().nonnegative(),
  cursorId: z.number().int().positive().nullable(),
});

export type reservation = z.infer<typeof reservationSchema>;
export type myActivitiesParam = z.infer<typeof myActivitiesParamSchema>;
export type myActivitiesResponse = z.infer<typeof myActivitiesResponseSchema>;
export type monthlyScheduleParam = z.infer<typeof monthlyScheduleParamSchema>;
export type monthlyScheduleResponse = z.infer<typeof monthlyScheduleResponseSchema>;
export type dailyScheduleParam = z.infer<typeof dailyScheduleParamSchema>;
export type dailyScheduleResponse = z.infer<typeof dailyScheduleResponseSchema>;
export type timeSlotReservationParam = z.infer<typeof timeSlotReservationParamSchema>;
export type timeSlotReservationResponse = z.infer<typeof timeSlotReservationResponseSchema>;

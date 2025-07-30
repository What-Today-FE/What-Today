import { z } from 'zod';

/* --------------------------------------------------------
 * From server (API 응답용)
 * -------------------------------------------------------- */

/**
 * @description 예약 상태 enum
 * - 예약 관련 API 응답에서 사용
 */
export const reservationStatusSchema = z.enum([
  'pending', // 예약 대기 중
  'confirmed', // 예약 확정됨
  'declined', // 예약 거절됨
  'canceled', // 예약 취소됨
  'completed', // 체험 완료됨
]);

/**
 * @description 예약 응답에 포함되는 체험 요약 정보 스키마
 * - 예약 리스트 조회 시 activity 객체로 포함됨
 */
export const activitySummarySchema = z.object({
  id: z.number(), // 체험 ID
  title: z.string(), // 체험 제목
  bannerImageUrl: z.string().url(), // 대표 이미지 URL
});

/**
 * @description 예약 리스트 조회 시 사용되는 단일 예약 객체 스키마
 */
export const reservationSchema = z.object({
  id: z.number(), // 예약 ID
  teamId: z.string(),
  userId: z.number(),
  activity: activitySummarySchema,
  scheduleId: z.number(),
  status: reservationStatusSchema,
  reviewSubmitted: z.boolean(), // 리뷰 작성 여부
  totalPrice: z.number(), // 예약 총 금액
  headCount: z.number(), // 예약 인원 수
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식이어야 합니다'),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'HH:MM 형식이어야 합니다'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'HH:MM 형식이어야 합니다'),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

/**
 * @description 내 예약 리스트 조회 API 응답 스키마
 */
export const myReservationsResponseSchema = z.object({
  cursorId: z.number().nullable(), // 다음 페이지 커서 (null이면 끝)
  totalCount: z.number(), // 전체 예약 수
  reservations: z.array(reservationSchema), // 예약 배열
});

/**
 * @description PATCH (예약 취소) API 응답 스키마
 * - activity 객체 대신 activityId만 포함됨
 */
export const reservationResponseSchema = z.object({
  id: z.number(),
  teamId: z.string(),
  userId: z.number(),
  activityId: z.number(),
  scheduleId: z.number(),
  status: reservationStatusSchema,
  reviewSubmitted: z.boolean(),
  totalPrice: z.number(),
  headCount: z.number(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식이어야 합니다'), // 체험 날짜 (YYYY-MM-DD)
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'HH:MM 형식이어야 합니다'), // 시작 시간 (HH:MM)
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'HH:MM 형식이어야 합니다'), // 종료 시간 (HH:MM)
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

/**
 * @description 리뷰 작성 후 응답 스키마
 */
export const reviewResponseSchema = z.object({
  id: z.number(),
  teamId: z.string(),
  activityId: z.number(),
  userId: z.number(),
  rating: z.number(),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
});

/**
 * @description 공통 에러 응답 스키마
 * - 대부분의 API 실패 시 사용됨
 */
export const errorResponseSchema = z.object({
  message: z.string(),
});

/* --------------------------------------------------------
 * To server (요청용)
 * -------------------------------------------------------- */

/**
 * @description 예약 수정/취소 요청 바디 스키마
 * - 현재는 status: 'canceled' 만 허용됨
 */
export const updateMyReservationBodySchema = z.object({
  status: z.literal('canceled'),
});

/**
 * @description 리뷰 작성 요청 바디 스키마
 */
export const createReviewBodySchema = z.object({
  rating: z.number().min(0).max(5), // 평점은 0~5 사이여야 함
  content: z.string().min(1, { message: '리뷰 내용을 입력해주세요.' }),
});

// 예약 요청 바디 스키마
/**
 * @description 체험 예약 요청 시 사용되는 요청 바디 스키마
 * - POST /reservations
 */
export const createReservationBodySchema = z.object({
  scheduleId: z.number(),
  headCount: z.number(),
});

/* --------------------------------------------------------
 * Types
 * -------------------------------------------------------- */

/** 단일 예약 객체 타입 (activity 포함) */
export type Reservation = z.infer<typeof reservationSchema>;

/** 예약 리스트 응답 타입 */
export type MyReservationsResponse = z.infer<typeof myReservationsResponseSchema>;

/** 예약 수정/취소 응답 타입 */
export type ReservationResponse = z.infer<typeof reservationResponseSchema>;

/** 예약 취소 요청 바디 타입 */
export type UpdateMyReservationBody = z.infer<typeof updateMyReservationBodySchema>;

/** 리뷰 작성 요청 바디 타입 */
export type CreateReviewBody = z.infer<typeof createReviewBodySchema>;

/** 리뷰 작성 응답 타입 */
export type ReviewResponse = z.infer<typeof reviewResponseSchema>;

/** 공통 에러 응답 타입 */
export type ErrorResponse = z.infer<typeof errorResponseSchema>;

/** 예약 생성 요청 바디 타입 */
export type CreateReservationBodyDto = z.infer<typeof createReservationBodySchema>;

/** 예약 상태 타입 */
export type ReservationStatus = z.infer<typeof reservationStatusSchema>;
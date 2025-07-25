import type {
  CreateReviewBody,
  MyReservationsResponse,
  ReservationResponse,
  ReviewResponse,
  UpdateMyReservationBody,
} from '@/schemas/myReservations';
import {
  createReviewBodySchema,
  myReservationsResponseSchema,
  reservationResponseSchema,
  reviewResponseSchema,
  updateMyReservationBodySchema,
} from '@/schemas/myReservations';

import axiosInstance from './axiosInstance';

/**
 * 내 예약 리스트 조회
 * @param params optional - size, cursorId, status
 * @returns MyReservationsResponse
 */
export const fetchMyReservations = async (params?: {
  size?: number;
  cursorId?: number;
  status?: string;
}): Promise<MyReservationsResponse> => {
  const response = await axiosInstance.get('/my-reservations', { params });
  return myReservationsResponseSchema.parse(response.data);
};

/**
 * 내 예약 취소 (PATCH)
 * @param reservationId 예약 ID
 * @param body { status: 'canceled' }
 * @returns ReservationResponse
 */
export const cancelMyReservation = async (
  reservationId: number,
  body: UpdateMyReservationBody,
): Promise<ReservationResponse> => {
  updateMyReservationBodySchema.parse(body); // 요청 유효성 검사
  const response = await axiosInstance.patch(`/my-reservations/${reservationId}`, body);
  return reservationResponseSchema.parse(response.data);
};

/**
 * 리뷰 작성
 * @param reservationId 예약 ID
 * @param body { rating, content }
 * @returns ReviewResponse
 */
export const createReview = async (reservationId: number, body: CreateReviewBody): Promise<ReviewResponse> => {
  createReviewBodySchema.parse(body); // 요청 유효성 검사
  const response = await axiosInstance.post(`/my-reservations/${reservationId}/reviews`, body);
  return reviewResponseSchema.parse(response.data);
};

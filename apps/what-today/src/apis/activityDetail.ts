import { type ActivityWithSubImagesAndSchedules, activityWithSubImagesAndSchedulesSchema } from '@/schemas/activities';
import { type ActivityReviewsResponse, activityReviewsResponseSchema } from '@/schemas/activityReview';
import {
  type CreateReservationBodyDto,
  type ReservationResponse,
  reservationResponseSchema,
} from '@/schemas/myReservations';

import axiosInstance from './axiosInstance';

/**
 * @description 체험 상세 정보를 불러옵니다.
 * @param activityId 체험 ID
 * @returns ActivityWithSubImagesAndSchedules 타입의 체험 상세 데이터
 */
export const fetchActivityDetail = async (activityId: number | string): Promise<ActivityWithSubImagesAndSchedules> => {
  const response = await axiosInstance.get(`/activities/${activityId}`);
  return activityWithSubImagesAndSchedulesSchema.parse(response.data);
};

/**
 * @description 체험 리뷰 목록을 조회합니다.
 */
export const fetchActivityReviews = async (activityId: number): Promise<ActivityReviewsResponse> => {
  const response = await axiosInstance.get(`/activities/${activityId}/reviews`);
  return activityReviewsResponseSchema.parse(response.data);
};

/**
 * @description 무한스크롤용 체험 리뷰 목록을 조회합니다.
 * @param activityId 체험 ID
 * @param page 페이지 번호 (기본값: 1)
 * @param size 페이지 크기 (기본값: 10)
 */
export const fetchActivityReviewsInfinite = async (
  activityId: number,
  page: number = 1,
  size: number = 10,
): Promise<ActivityReviewsResponse> => {
  const response = await axiosInstance.get(`/activities/${activityId}/reviews`, {
    params: { page, size },
  });
  return activityReviewsResponseSchema.parse(response.data);
};

/**
 * @description 체험 예약 생성 요청
 * @param activityId 체험 ID
 * @param body scheduleId 및 headCount 포함
 */
export const createReservation = async (
  activityId: number,
  body: CreateReservationBodyDto,
): Promise<ReservationResponse> => {
  const response = await axiosInstance.post(`/activities/${activityId}/reservations`, body);
  return reservationResponseSchema.parse(response.data);
};

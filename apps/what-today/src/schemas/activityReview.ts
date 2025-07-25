import { z } from 'zod';

/**
 * @description 리뷰 작성 유저 정보 스키마
 */
export const reviewUserSchema = z.object({
  /** 유저 고유 ID */
  id: z.number().int().positive(),

  /** 닉네임 */
  nickname: z.string(),

  /** 프로필 이미지 URL (nullable) */
  profileImageUrl: z.string().url().nullable(),
});

/**
 * @description 개별 리뷰 응답 스키마
 */
export const activityReviewSchema = z.object({
  /** 리뷰 ID */
  id: z.number().int().positive(),

  /** 리뷰 작성자 정보 */
  user: reviewUserSchema,

  /** 리뷰 대상 체험 ID */
  activityId: z.number().int().positive(),

  /** 평점 (0 ~ 5점) */
  rating: z.number().min(0).max(5),

  /** 리뷰 내용 */
  content: z.string(),

  /** 작성일 */
  createdAt: z.string().datetime(),

  /** 수정일 */
  updatedAt: z.string().datetime(),
});

/**
 * @description 체험 리뷰 목록 응답 스키마 (from server)
 */
export const activityReviewsResponseSchema = z.object({
  /** 평균 평점 */
  averageRating: z.number().min(0).max(5),

  /** 전체 리뷰 수 */
  totalCount: z.number().int().nonnegative(),

  /** 리뷰 목록 */
  reviews: z.array(activityReviewSchema),
});

/** 타입 정의 */
export type ReviewUser = z.infer<typeof reviewUserSchema>;
export type ActivityReview = z.infer<typeof activityReviewSchema>;
export type ActivityReviewsResponse = z.infer<typeof activityReviewsResponseSchema>;

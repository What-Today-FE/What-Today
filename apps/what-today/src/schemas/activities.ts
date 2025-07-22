import { z } from 'zod';

/**
 * To server
 * @description 기본 체험 데이터 유효성을 검사하는 스키마
 */
export const activitySchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  title: z.string().min(1, { message: '체험 제목을 입력해주세요.' }),
  description: z.string().min(1, { message: '체험 설명을 입력해주세요.' }),
  category: z.string(),
  price: z.number().int().nonnegative(),
  address: z.string(),
  bannerImageUrl: z.string().url({ message: '유효한 이미지 URL이 아닙니다.' }),
  rating: z.number().max(5),
  reviewCount: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Activity = z.infer<typeof activitySchema>;

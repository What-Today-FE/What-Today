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

/**
 * @description 서브 이미지 항목 스키마
 */
export const subImageSchema = z.object({
  id: z.number().int().positive(),
  imageUrl: z.string().url(),
});

/**
 * @description 스케줄 항목 스키마
 */
export const scheduleSchema = z.object({
  id: z.number().int().positive(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식이어야 합니다'),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'HH:MM 형식이어야 합니다'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'HH:MM 형식이어야 합니다'),
});

/**
 * @description  항목 스키마
 */
export const timeSchema = z.object({
  id: z.number().int().positive(),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'HH:MM 형식이어야 합니다'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'HH:MM 형식이어야 합니다'),
});

/**
 * @description 스케줄 항목 스키마
 */
const scheduleResponseSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식이어야 합니다'),
  times: z.array(timeSchema),
});

/**
 * @description 스케줄 리스트 스키마
 */
export const schedulesSchema = z.array(scheduleResponseSchema);

/**
 * @description subImages와 schedules를 포함한 확장 스키마
 */
export const activityWithSubImagesAndSchedulesSchema = activitySchema.extend({
  subImages: z.array(subImageSchema),
  schedules: z.array(scheduleSchema),
});

export type Activity = z.infer<typeof activitySchema>;
export type SubImage = z.infer<typeof subImageSchema>;
export type Schedule = z.infer<typeof scheduleSchema>;
export type Schedules = z.infer<typeof schedulesSchema>;
export type ActivityWithSubImagesAndSchedules = z.infer<typeof activityWithSubImagesAndSchedulesSchema>;

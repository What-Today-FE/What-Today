import { z } from 'zod';

import { activitySchema } from './activities';

/**
 * To server
 * @description 내가 등록한 체험 리스트 조회 요청 시 사용하는 쿼리 파라미터의 유효성을 검사하는 스키마
 */
export const myActivitiesParamSchema = z.object({
  size: z.number().int().positive().optional(),
  cursorId: z.number().int().positive().optional(),
});

/**
 * From server
 * @description 내가 등록한 체험 리스트 데이터의 유효성을 검사하는 스키마
 */
export const myActivitiesResponseSchema = z.object({
  activities: z.array(activitySchema),
  totalCount: z.number().int(),
  cursorId: z.null(),
});

export type myActivitiesParam = z.infer<typeof myActivitiesParamSchema>;
export type myActivitiesResponse = z.infer<typeof myActivitiesResponseSchema>;

import { z } from 'zod';

import { activitySchema } from './activities';

export const myActivitiesParamSchema = z.object({
  size: z.number().int().positive().optional(),
  cursorId: z.number().int().positive().optional(),
});

export const myActivitiesResponseSchema = z.object({
  activities: z.array(activitySchema),
  totalCount: z.number().int(),
  cursorId: z.null(),
});

export type myActivitiesParam = z.infer<typeof myActivitiesParamSchema>;
export type myActivitiesResponse = z.infer<typeof myActivitiesResponseSchema>;

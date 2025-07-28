import { z } from 'zod';

/**
 * From server
 * @description 알림 스키마
 */
export const notificationSchema = z.object({
  id: z.number(),
  teamId: z.string(),
  userId: z.number(),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
});

/**
 * From server
 * @description 내 알림 목록 응답 스키마
 */
export const notificationsResponseSchema = z.object({
  cursorId: z.number().nullable(),
  notifications: z.array(notificationSchema),
  totalCount: z.number(),
});

export type Notification = z.infer<typeof notificationSchema>;
export type NotificationsResponse = z.infer<typeof notificationsResponseSchema>;

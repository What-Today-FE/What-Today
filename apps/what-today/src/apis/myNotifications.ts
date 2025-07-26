import { type NotificationsResponse, notificationsResponseSchema } from '@/schemas/myNotifications';

import axiosInstance from './axiosInstance';

export const getMyNotifications = async ({
  cursorId,
  size = 10,
}: {
  cursorId?: number | null;
  size?: number;
}): Promise<NotificationsResponse> => {
  const response = await axiosInstance.get('/my-notifications', {
    params: {
      cursorId,
      size,
    },
  });
  return notificationsResponseSchema.parse(response.data);
};

export const deleteMyNotifications = async (notificationId: number) => {
  const response = axiosInstance.delete(`/my-notifications/${notificationId}`);
  return response;
};

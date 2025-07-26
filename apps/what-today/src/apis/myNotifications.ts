import { type NotificationsResponse, notificationsResponseSchema } from '@/schemas/myNotifications';

import axiosInstance from './axiosInstance';

/**
 * @function getMyNotifications
 * @description 내 알림 목록을 불러오는 API 요청 함수
 *
 * @param {number | null} [cursorId] - 마지막으로 불러온 알림 ID. 이후 알림을 가져오기 위한 기준 값 (기본값: null)
 * @param {number} [size=10] - 한 페이지에 불러올 알림 개수 (기본값: 10)
 *
 * @returns {Promise<NotificationsResponse>} Zod 파싱을 통과한 알림 응답 객체
 */
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

/**
 * @function deleteMyNotifications
 * @description 특정 알림을 삭제하는 DELETE API 요청 함수
 * - 응답 본문이 없거나 단순 에러 메시지(string)이므로, zod 검사 없이 Axios 응답 객체를 그대로 반환합니다.
 *
 * @param {number} notificationId - 삭제할 알림의 고유 ID
 *
 * @returns {Promise<AxiosResponse>} 삭제 요청에 대한 Axios 응답 객체
 */
export const deleteMyNotifications = async (notificationId: number) => {
  const response = axiosInstance.delete(`/my-notifications/${notificationId}`);
  return response;
};

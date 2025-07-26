import mockData from '@/components/notification/mock-notifications-pages.json';
import { type NotificationsResponse, notificationsResponseSchema } from '@/schemas/myNotifications';

// export const getMyNotifications = async ({
//   cursorId,
//   size = 10,
// }: {
//   cursorId?: number | null;
//   size?: number;
// }): Promise<NotificationsResponse> => {
//   const response = await axiosInstance.get('/my-notifications', {
//     params: {
//       cursorId,
//       size,
//     },
//   });
//   return notificationsResponseSchema.parse(response.data);
// };

export const getMyNotifications = async ({
  cursorId,
  size = 10,
}: {
  cursorId?: number | null;
  size?: number;
}): Promise<NotificationsResponse> => {
  const mockPages = mockData as NotificationsResponse[];

  // 1. 초기 요청이면 첫 페이지 반환
  if (cursorId === null || cursorId === undefined) {
    return notificationsResponseSchema.parse(mockPages[0]);
  }

  // 2. cursorId 기반으로 다음 페이지 찾기
  const page = mockPages.find((p) => p.notifications[0]?.id === cursorId + 1);

  // 3. 못 찾으면 빈 페이지 반환
  if (!page) {
    return {
      cursorId: null,
      totalCount: mockPages[0].totalCount, // 첫 페이지 기준 totalCount 사용
      notifications: [],
    };
  }

  return notificationsResponseSchema.parse(page);
};

import { z } from 'zod';

import axiosInstance from './axiosInstance';

// ✅ 체험(Activity) 타입 정의 (category 추가)
export interface Activity {
  createdAt?: string | number | Date;
  id: number;
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
  bannerImageUrl: string;
  category: string;
}

// ✅ 체험 리스트 조회 시 사용되는 파라미터 타입
export interface GetActivitiesParams {
  page?: number;
  size?: number;
  method?: 'offset';
}

export const activityListSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    price: z.number(),
    rating: z.number(),
    reviewCount: z.number(),
    bannerImageUrl: z.string().url(),
    category: z.string(),
    createdAt: z.string(),
  }),
);

export type GetActivitiesResponse = z.infer<typeof activityListSchema>;

// ✅ 체험 리스트 불러오기
export const getActivities = async (params?: Omit<GetActivitiesParams, 'method'>): Promise<GetActivitiesResponse> => {
  const response = await axiosInstance.get('/activities', {
    params: {
      method: 'offset',
      ...params,
    },
  });

  if (!response.data?.activities || !Array.isArray(response.data.activities)) {
    throw new Error('Invalid API response structure');
  }

  return activityListSchema.parse(response.data.activities);
};

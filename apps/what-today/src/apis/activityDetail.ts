import { type ActivityWithSubImagesAndSchedules, activityWithSubImagesAndSchedulesSchema } from '@/schemas/activities';

import axiosInstance from './axiosInstance';

/**
 * @description 체험 상세 정보를 불러옵니다.
 * @param activityId 체험 ID
 * @returns ActivityWithSubImagesAndSchedules 타입의 체험 상세 데이터
 */
export const fetchActivityDetail = async (activityId: number | string): Promise<ActivityWithSubImagesAndSchedules> => {
  const response = await axiosInstance.get(`/activities/${activityId}`);
  return activityWithSubImagesAndSchedulesSchema.parse(response.data);
};

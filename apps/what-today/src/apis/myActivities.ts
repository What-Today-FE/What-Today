import { type myActivitiesParam, type myActivitiesResponse, myActivitiesResponseSchema } from '@/schemas/myActivities';

import axiosInstance from './axiosInstance';

export const getMyActivities = async (params?: myActivitiesParam): Promise<myActivitiesResponse> => {
  const response = await axiosInstance.get('/my-activities', { params });
  return myActivitiesResponseSchema.parse(response.data);
};

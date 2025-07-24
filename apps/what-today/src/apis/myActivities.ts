import {
  type ActivityReservationParam,
  type ActivityReservationResponse,
  activityReservationResponseSchema,
} from '@/schemas/myActivities';
import { type myActivitiesParam, type myActivitiesResponse, myActivitiesResponseSchema } from '@/schemas/myActivities';

import axiosInstance from './axiosInstance';

export const getMyActivities = async (params?: myActivitiesParam): Promise<myActivitiesResponse> => {
  const response = await axiosInstance.get('/my-activities', { params });
  return myActivitiesResponseSchema.parse(response.data);
};

export const getMonthlyReservations = async (
  activityId: number,
  params: ActivityReservationParam,
): Promise<ActivityReservationResponse> => {
  const response = await axiosInstance.get(`/my-activities/${activityId}/reservation-dashboard`, { params });
  return activityReservationResponseSchema.parse(response.data);
};

import type { ManageableReservationStatus } from '@what-today/design-system';

import {
  type dailyScheduleParam,
  type dailyScheduleResponse,
  dailyScheduleResponseSchema,
  type monthlyScheduleParam,
  type monthlyScheduleResponse,
  monthlyScheduleResponseSchema,
  type reservation,
  reservationSchema,
  type timeSlotReservationParam,
  type timeSlotReservationResponse,
  timeSlotReservationResponseSchema,
} from '@/schemas/myActivities';
import { type myActivitiesParam, type myActivitiesResponse, myActivitiesResponseSchema } from '@/schemas/myActivities';

import axiosInstance from './axiosInstance';

export const getMyActivities = async (params?: myActivitiesParam): Promise<myActivitiesResponse> => {
  const response = await axiosInstance.get('/my-activities', { params });
  return myActivitiesResponseSchema.parse(response.data);
};

export const getMonthlySchedule = async (
  activityId: number,
  params: monthlyScheduleParam,
): Promise<monthlyScheduleResponse> => {
  const response = await axiosInstance.get(`/my-activities/${activityId}/reservation-dashboard`, { params });
  return monthlyScheduleResponseSchema.parse(response.data);
};

export const getDailySchedule = async (
  activityId: number,
  params: dailyScheduleParam,
): Promise<dailyScheduleResponse> => {
  const response = await axiosInstance.get(`/my-activities/${activityId}/reserved-schedule`, { params });
  return dailyScheduleResponseSchema.parse(response.data);
};

export const getReservation = async (
  activityId: number,
  params: timeSlotReservationParam,
): Promise<timeSlotReservationResponse> => {
  const response = await axiosInstance.get(`/my-activities/${activityId}/reservations`, { params });
  return timeSlotReservationResponseSchema.parse(response.data);
};

export async function patchReservationStatus(
  activityId: number,
  reservationId: number,
  status: ManageableReservationStatus,
): Promise<reservation> {
  const response = await axiosInstance.patch(`/my-activities/${activityId}/reservations/${reservationId}`, { status });
  return reservationSchema.parse(response.data);
}

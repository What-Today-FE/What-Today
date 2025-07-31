import {
  type ActivityWithSchedulesResponse,
  type CreateActivityBody,
  type UpdateMyActivityBody,
} from '@/schemas/experiences';

import axiosInstance from './axiosInstance';

// ✅ 체험 생성 API: 유효성 검사 및 요청
export const createActivity = async (body: CreateActivityBody) => {
  // 요청 전에 parse 하거나, 하지 않고 그대로 보냄
  return await axiosInstance.post('/activities', body).then((res) => res.data);
};

// ✅ 체험 수정 API: 유효성 검사 및 요청
export const patchActivity = async (activityId: number, body: UpdateMyActivityBody) => {
  return await axiosInstance.patch(`/my-activities/${activityId}`, body).then((res) => res.data);
};

//  createActivityBodySchema,   parse를 여기서 관리하지 말고 페이지 handleSubmit에서 관리
//  updateMyActivityBodySchema,

/**
 * @description 체험 이미지 url 생성
 *
 * @param file 업로드할 체험 이미지 파일
 * @returns 체험 이미지 url (string)
 */
export const uploadImage = async (file: File): Promise<{ file: string }> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axiosInstance.post('activities/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return { file: response.data.activityImageUrl };
};

/**
 * @description 체험 등록
 *
 * @param body 등록할 체험 데이터
 * @returns 체험 등록 데이터
 */
export const postExperiences = async (body: CreateActivityBody): Promise<ActivityWithSchedulesResponse> => {
  const response = await axiosInstance.post('activities', body);

  return response.data;
};

/**
 * @description 체험 수정
 *
 * @param body 등록할 체험 수정 데이터
 * @returns 체험 수정 데이터
 */
export const patchExperiences = async (
  body: UpdateMyActivityBody,
  activityId?: string,
): Promise<ActivityWithSchedulesResponse> => {
  const response = await axiosInstance.patch(`my-activities/${activityId}`, body);

  return response.data;
};

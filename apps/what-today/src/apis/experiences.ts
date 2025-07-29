import { type CreateActivityBody, type UpdateMyActivityBody } from '@/schemas/experiences'; // 스키마 정의된 파일 기준 경로로 수정하세요

import axiosInstance from './axiosInstance';

// ✅ 체험 생성 API: 유효성 검사 및 요청
export const createActivity = async (body: CreateActivityBody) => {
  // 요청 전에 parse 하거나, 하지 않고 그대로 보냄
  return await axiosInstance.post('/activities', body).then((res) => res.data);
};

// ✅ 체험 수정 API: 유효성 검사 및 요청
export const patchActivity = async (activityId: number, body: UpdateMyActivityBody) => {
  return await axiosInstance.patch(`/activities/${activityId}`, body).then((res) => res.data);
};

//  createActivityBodySchema,   parse를 여기서 관리하지 말고 페이지 handleSubmit에서 관리
//  updateMyActivityBodySchema,

import { z } from 'zod';

import axiosInstance from './axiosInstance';

export interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

export const scheduleSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식이어야 합니다'),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'HH:MM 형식이어야 합니다'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'HH:MM 형식이어야 합니다'),
});

//체험등록
export const createExperienceSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  category: z.string().min(1, '카테고리를 선택해주세요'),
  description: z.string().min(1, '설명을 입력해주세요'),
  address: z.string().min(1, '주소를 입력해주세요'),
  price: z.coerce.number().min(0, '가격은 0원 이상이어야 합니다'),
  schedules: z.array(scheduleSchema).min(1, '최소 1개의 스케줄을 추가해야 합니다'),
  bannerImageUrl: z.string().url('유효한 이미지 URL이어야 합니다'),
  subImageUrls: z.array(z.string().url()),
});

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>;

export const createActivity = async (payload: CreateExperienceInput) => {
  const res = await axiosInstance.post(`/activities`, payload);
  return res.data;
};

// 체험 수정
export const updateExperienceSchema = z
  .object({
    title: z.string().optional(),
    category: z.string().optional(),
    description: z.string().optional(),
    address: z.string().optional(),
    price: z.coerce.number().optional(),
    bannerImageUrl: z.string().url().optional(),
    subImageUrlsToAdd: z.array(z.string().url()).optional(),
    subImageUrlsToRemove: z.array(z.string().url()).optional(),
    schedulesToAdd: z.array(scheduleSchema).optional(),
    schedulesToRemove: z.array(z.number()).optional(),
  })
  .strict();

export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>;

export const patchActivity = async (activityId: number, payload: UpdateExperienceInput) => {
  const res = await axiosInstance.patch(`/activities/${activityId}`, payload);
  return res.data;
};

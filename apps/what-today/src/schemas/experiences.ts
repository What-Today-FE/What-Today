import { z } from 'zod';

// 📌 공통 Enum: 카테고리
export const categoryEnum = z.enum(['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙']);

// 🖼️ 서브 이미지 스키마 (ActivityWithSchedulesResponse 용)
const subImageSchema = z.object({
  imageUrl: z.string(),
  id: z.number(),
});

// 🕒 시간 스키마 (ActivityWithSchedulesResponse 용)
const timeSchema = z.object({
  startTime: z.string(), // 'HH:mm'
  endTime: z.string(), // 'HH:mm'
  id: z.number(),
});

// 📅 스케줄 스키마 (ActivityWithSchedulesResponse 용)
const scheduleSchema = z.object({
  date: z.string(), // 'YYYY-MM-DD'
  times: z.array(timeSchema),
});

// ✅ ActivityWithSchedulesResponseDto 전체 응답 스키마
export const activityWithSchedulesResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  address: z.string(),
  bannerImageUrl: z.string(),
  rating: z.number(),
  reviewCount: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  subImages: z.array(subImageSchema),
  schedules: z.array(scheduleSchema),
});

// 📅 공통 스케줄 생성 스키마 (Create, Update에 사용)
const createScheduleBodySchema = z.object({
  date: z.string(), // 예: '2025-08-01'
  startTime: z.string(), // 예: '14:00'
  endTime: z.string(), // 예: '16:00'
});

// ✅ CreateActivityBodyDto 요청 바디 스키마 (API 전송용)
export const createActivityBodySchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  category: z.string().min(1, '카테고리를 선택해주세요'),
  description: z.string().min(1, '설명을 입력해주세요'),
  price: z
    .number()
    .nonnegative()
    .refine((val) => val >= 0, '가격은 0 이상이어야 합니다'),
  address: z.string().min(1, '주소를 입력해주세요'),
  schedules: z.array(createScheduleBodySchema).default([]),
  bannerImageUrl: z.string().url('배너 이미지 URL이 유효하지 않습니다'),
  subImageUrls: z.array(z.string().url()).default([]),
});

// ✅ UpdateMyActivityBodyDto 요청 바디 스키마
export const updateMyActivityBodySchema = z.object({
  title: z.string().optional(),
  category: categoryEnum.optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  address: z.string().optional(),
  bannerImageUrl: z.string().url().optional(),
  subImageIdsToRemove: z.array(z.number()).default([]),
  subImageUrlsToAdd: z.array(z.string().url()).default([]),
  scheduleIdsToRemove: z.array(z.number()).default([]),
  schedulesToAdd: z.array(createScheduleBodySchema).default([]),
});

/* ------------------------------------------------------------------
   📌 폼 입력 단계 전용 스키마 (react-hook-form resolver용)
   - File, Dayjs 객체 등 UI에서 쓰는 값 형태를 검증
   - 제출 시 createActivityBodySchema 형태로 변환해서 API 요청
------------------------------------------------------------------- */
export const createActivityFormSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  category: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .nullable(),
  description: z.string().min(1, '설명을 입력해주세요'),
  price: z.string().min(1, '가격을 입력해주세요'),
  address: z.string().min(1, '주소를 입력해주세요'),
  schedules: z.array(
    z.object({
      date: z.any().nullable(), // Dayjs | null
      startTime: z.object({ hour: z.string(), minute: z.string() }).nullable(),
      endTime: z.object({ hour: z.string(), minute: z.string() }).nullable(),
    }),
  ),
  bannerFile: z.instanceof(File).nullable(),
  subImageFiles: z.array(z.instanceof(File)),
});

// 🔄 타입 추론들 (z.infer)
export type ActivityWithSchedulesResponse = z.infer<typeof activityWithSchedulesResponseSchema>;
export type CreateActivityBody = z.infer<typeof createActivityBodySchema>;
export type UpdateMyActivityBody = z.infer<typeof updateMyActivityBodySchema>;
export type CreateActivityFormValues = z.infer<typeof createActivityFormSchema>;

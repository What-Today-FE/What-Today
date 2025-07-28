import { z } from 'zod';

/**
 * From server
 * @description 사용자 정보 스키마
 */
export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  nickname: z.string(),
  profileImageUrl: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type User = z.infer<typeof userSchema>;

/**
 * To server
 * @description 회원가입 요청
 */
export const signUpFormSchema = z
  .object({
    email: z.string().min(1, { message: '이메일을 입력해 주세요.' }).email({ message: '이메일 형식이 아닙니다.' }),
    nickname: z
      .string()
      .min(1, { message: '닉네임을 입력해 주세요.' })
      .max(10, { message: '닉네임은 10자 이내로 입력해주세요.' }),
    password: z
      .string()
      .min(1, { message: '비밀번호를 입력해 주세요.' })
      .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }),
    passwordConfirm: z.string().min(1, { message: '비밀번호 확인을 입력해 주세요.' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

/**
 * To server
 * @description 로그인 요청
 */
export const signInSchema = z.object({
  email: z.string().min(1, { message: '이메일을 입력해 주세요.' }).email({ message: '이메일 형식이 아닙니다.' }),
  password: z
    .string()
    .min(1, { message: '비밀번호를 입력해 주세요.' })
    .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

/**
 * From server
 * @description 로그인 응답
 */
export const loginResponseSchema = z.object({
  user: userSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

/**
 * From server
 * @description 토큰 재발급 응답
 */
export const tokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type TokenResponse = z.infer<typeof tokenResponseSchema>;

/**
 * From server
 * @description 카카오 로그인 요청
 */
export const kakaoSignInSchema = z.object({
  redirectUri: z.string().url(),
  token: z.string().min(1, '토큰이 필요합니다.'),
});

export type KakaoSignInRequest = z.infer<typeof kakaoSignInSchema>;

/**
 * From server
 * @description 카카오 회원가입 요청
 */
export const kakaoSignUpSchema = z.object({
  nickname: z.string(),
  redirectUri: z.string().url(),
  token: z.string().min(1, '토큰이 필요합니다.'),
});

export type KakaoSignUpRequest = z.infer<typeof kakaoSignUpSchema>;

/**
 * To server
 * @description 내 정보 수정 요청
 */
export const updateMyProfileSchema = z
  .object({
    nickname: z
      .string()
      .min(1, { message: '닉네임을 입력해 주세요.' })
      .max(10, { message: '닉네임은 10자 이내로 입력해주세요.' })
      .optional(),
    profileImageUrl: z.union([z.string().url(), z.literal('')]).optional(),
    password: z.string().optional(),
    passwordConfirm: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const password = data.password?.trim();

    // password가 1글자 이상 입력된 경우만 검사
    if (password && password.length > 0) {
      if (password.length < 8) {
        ctx.addIssue({
          path: ['password'],
          code: z.ZodIssueCode.too_small,
          minimum: 8,
          type: 'string',
          inclusive: true,
          message: '비밀번호는 8자 이상이어야 합니다.',
        });
      }

      if (!data.passwordConfirm || data.passwordConfirm.trim() === '') {
        ctx.addIssue({
          path: ['passwordConfirm'],
          code: z.ZodIssueCode.custom,
          message: '비밀번호 확인을 입력해 주세요.',
        });
      } else if (password !== data.passwordConfirm) {
        ctx.addIssue({
          path: ['passwordConfirm'],
          code: z.ZodIssueCode.custom,
          message: '비밀번호가 일치하지 않습니다.',
        });
      }
    }
  });

export type UpdateMyProfileFormValues = z.infer<typeof updateMyProfileSchema>;

/**
 * To server
 * @description 프로필 이미지 URL 생성 요청
 */

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const postProfileImageFileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: '파일 크기는 5MB 이하여야 합니다.',
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: '지원되지 않는 이미지 형식입니다.',
  });

export type ProfileImageUrlValues = z.infer<typeof postProfileImageFileSchema>;

/**
 * From server
 * @description 프로필 이미지 URL 응답
 */

export const postProfileImageUrlResponseSchema = z.object({
  profileImageUrl: z.string().url(),
});

export type PostProfileImageUrlResponse = z.infer<typeof postProfileImageUrlResponseSchema>;

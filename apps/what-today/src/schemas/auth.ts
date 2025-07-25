import { z } from 'zod';

/**
 * From server
 * @description 사용자 정보 스키마
 */
export const userSchema = z.object({
  id: z.number().int().positive(),
  email: z.string().email(),
  nickname: z.string(),
  profileImageUrl: z.string().url().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Activity = z.infer<typeof userSchema>;

/**
 * To server
 * @description 회원가입 요청
 */
export const signUpSchema = z
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

export type SignUpFormValues = z.infer<typeof signUpSchema>;

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
    profileImageUrl: z
      .union([
        z.string().url(),
        z.literal(''), // 빈 문자열 허용
      ])
      .optional(),
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

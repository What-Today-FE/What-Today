import {
  kakaoSignInSchema,
  kakaoSignUpSchema,
  type LoginResponse,
  loginResponseSchema,
  postProfileImageFileSchema,
  postProfileImageUrlResponseSchema,
  type SignInFormValues,
  signInSchema,
  type User,
  userSchema,
} from '@/schemas/auth';
import { generateTemporaryNickname } from '@/utils/generateTemporaryNickname';

import axiosInstance from './axiosInstance';

/**
 * @description 로그인 요청 API
 * @returns accessToken + user
 */
export const login = async (input: SignInFormValues): Promise<LoginResponse> => {
  const validated = signInSchema.parse(input);
  const response = await axiosInstance.post('auth/login', validated);
  return loginResponseSchema.parse(response.data);
};

/**
 * @description 회원가입 요청 API
 * @returns accessToken + user
 */
export const signup = async (email: string, nickname: string, password: string): Promise<User> => {
  const response = await axiosInstance.post('users', {
    email,
    nickname,
    password,
  });
  return userSchema.parse(response.data);
};

/**
 * @description 카카오 로그인 (code → accessToken, refreshToken 반환)
 * @returns accessToken, refreshToken + user
 */
export const signInWithKakao = async (code: string): Promise<LoginResponse> => {
  const payload = kakaoSignInSchema.parse({
    redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URL,
    token: code,
  });

  const response = await axiosInstance.post('oauth/sign-in/kakao', payload);

  return loginResponseSchema.parse(response.data);
};

/**
 * @description 카카오 회원가입 (카카오 로그인 + 초기 nickName 포함)
 * @returns accessToken, refreshToken + user
 */
export const signUpWithKakao = async (code: string): Promise<LoginResponse> => {
  /* 카카오 회원가입 확인 후 삭제할 코드입니다.
  // const response = await axiosInstance.post('oauth/sign-up/kakao', {
  //   nickname: generateTemporaryNickname(),
  //   redirectUri: `${import.meta.env.VITE_KAKAO_REDIRECT_URL}/signup`,
  //   token: code,
  // });
  */
  const payload = kakaoSignUpSchema.parse({
    nickname: generateTemporaryNickname(),
    redirectUri: `${import.meta.env.VITE_KAKAO_REDIRECT_URL}/signup`,
    token: code,
  });

  const response = await axiosInstance.post('oauth/sign-up/kakao', payload);

  return loginResponseSchema.parse(response.data);
};

/**
 * @description 내 정보 수정 PATCH
 * @returns 변경된 user
 */
export const patchMyProfile = async (
  nickname?: string,
  profileImageUrl?: string | null | undefined,
  newPassword?: string,
) => {
  const safeNickname = nickname?.trim();
  const safePassword = newPassword?.trim();

  const body = {
    ...(safeNickname && { nickname: safeNickname }),
    ...(profileImageUrl !== undefined && {
      profileImageUrl: profileImageUrl === null ? null : profileImageUrl?.trim() || null,
    }),
    ...(safePassword && { newPassword: safePassword }),
  };

  const response = await axiosInstance.patch('users/me', body);

  return userSchema.parse(response.data);
};

/**
 * @description 프로필 이미지 url 생성
 *
 * @param profileImageFile 업로드할 프로필 이미지 파일
 * @returns 프로필 이미지 url (string)
 */
export const postProfileImageUrl = async (profileImageFile: File): Promise<{ profileImageUrl: string }> => {
  const validatedFile = postProfileImageFileSchema.parse(profileImageFile);

  const formData = new FormData();
  formData.append('image', validatedFile);

  const response = await axiosInstance.post('users/me/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return postProfileImageUrlResponseSchema.parse(response.data);
};

import { generateTemporaryNickname } from '@/utils/generateTemporaryNickname';

import axiosInstance from './axiosInstance';

/**
 * @description 로그인 요청 API
 * @returns accessToken + user
 */
export const login = (email: string, password: string) => axiosInstance.post('auth/login', { email, password });

/**
 * @description 카카오 로그인 (code → accessToken, refreshToken 반환)
 * @returns accessToken, refreshToken + user
 */
export const signInWithKakao = (code: string) => {
  return axiosInstance.post('oauth/sign-in/kakao', {
    redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URL,
    token: code,
  });
};

/**
 * @description 카카오 회원가입 (카카오 로그인 + 초기 nickName 포함)
 * @returns accessToken, refreshToken + user
 */
export const signUpWithKakao = (code: string) => {
  return axiosInstance.post('oauth/sign-up/kakao', {
    nickname: generateTemporaryNickname(),
    redirectUri: `${import.meta.env.VITE_KAKAO_REDIRECT_URL}/signup`,
    token: code,
  });
};

/**
 * @description 내 정보 수정 PATCH
 * @returns 변경된 user
 */
export const patchMyProfile = (
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

  return axiosInstance.patch('users/me', body);
};

/**
 * @description 프로필 이미지 url 생성
 *
 * @param profileImageFile 업로드할 프로필 이미지 파일
 * @returns 프로필 이미지 url (string)
 */
export const postProfileImageUrl = (profileImageFile: File) => {
  const formData = new FormData();
  formData.append('image', profileImageFile);

  return axiosInstance.post('users/me/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

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

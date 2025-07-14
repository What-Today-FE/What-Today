import axiosInstance from './axiosInstance';

/**
 * @description 로그인 요청 API
 * @returns accessToken + user
 */
export const login = (email: string, password: string) => axiosInstance.post('auth/login', { email, password });

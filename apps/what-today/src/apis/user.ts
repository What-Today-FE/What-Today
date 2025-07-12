import axiosInstance from './axiosInstance';

/**
 * @description 사용자 프로필 요청 API
 * @returns user
 */
export const getMyProfile = () => axiosInstance.get('users/me');

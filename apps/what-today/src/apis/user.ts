import axiosInstance from './axiosInstance';

/**
 * @description 사용자 프로필 요청 API
 * @returns user
 */
export const getMyProfile = async () => {
  const response = await axiosInstance.get('users/me');

  return response;
};

import axios from 'axios';

import { useWhatTodayStore } from '@/stores';

/**
 * .env 파일에서 설정한 VITE_BASE_URL을 기준으로 Axios 인스턴스를 생성하여 반환합니다.
 * 이 인스턴스를 통해 공통 설정이 적용된 API 요청을 수행할 수 있습니다.
 *
 * @example
 * ```ts
 * import axiosInstance from '@/apis/axiosInstance';
 *
 * axiosInstance.get('/users')
 *   .then(response => console.log(response.data));
 * ```
 * @see {@link https://axios-http.com/docs/instance Axios 공식 문서 - 인스턴스}
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/** EXCLUDE_AUTH_URLS
 * @description 인증이 필요 없는 API 경로입니다. 요청 인터셉터에서 해당 경로들은 accessToken을 헤더에 포함하지 않습니다.
 */
const EXCLUDE_AUTH_URLS = ['auth/login', 'auth/tokens', 'oauth/sign-in', 'oauth/sign-up'];

/** 요청 인터셉터
 * 인증이 필요한 요청에는 Authorization 헤더에 accessToken을 자동으로 추가합니다.
 */
axiosInstance.interceptors.request.use((config) => {
  const url = config.url ?? '';
  const method = config.method?.toUpperCase();

  // 로그인이 필요 없는 api는 토큰을 생략합니다.
  const isGetActivities = method === 'GET' && url.startsWith('activities');
  const isInExcludeList = EXCLUDE_AUTH_URLS.some((excluded) => url.startsWith(excluded));
  const shouldSkipAuth = isInExcludeList || isGetActivities;

  if (!shouldSkipAuth) {
    const token = useWhatTodayStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✔️ 엑세스 토큰을 추가했습니다!');
    }
  }
  return config;
});

// 에러 메시지 추출 유틸 함수
const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (typeof message === 'string') return message;
    if (status) return `요청에 실패했습니다. (Status: ${status})`;
  }
  return '알 수 없는 오류가 발생했습니다.';
};

/** 응답 인터셉터
 * 1. 서버에서 401 Unauthorized 응답을 받을 경우, refreshToken을 사용하여 accessToken을 갱신합니다.
 * 2. 재발급에 성공하면 원래의 요청을 다시 시도합니다.
 * 3. 재발급에 실패하면 "다시 로그인해 주세요." 알림을 보내고, 로그인 페이지로 리다이렉트합니다.
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config } = error;

    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 401) {
        console.log('토큰을 재요청합니다.');
        const originalRequest = config;
        const refreshToken = useWhatTodayStore.getState().refreshToken;
        try {
          const response = await axios.post(
            '/auth/tokens',
            {},
            {
              baseURL: import.meta.env.VITE_API_BASE_URL,
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            },
          );
          const { accessToken, refreshToken: newRefreshToken } = response.data;

          useWhatTodayStore.getState().setAccessToken(accessToken);
          useWhatTodayStore.getState().setRefreshToken(newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`; // 이전 요청 이어서 다시 요청
          return axios(originalRequest);
        } catch (error) {
          useWhatTodayStore.getState().clearAuth();
          alert('다시 로그인해 주세요.');
          return Promise.reject(error);
        }
        return;
      }

      return Promise.reject(new Error(getErrorMessage(error)));
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;

import { useToast } from '@what-today/design-system';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { signInWithKakao, signUpWithKakao } from '@/apis/auth';
import { useWhatTodayStore } from '@/stores';

import useAuth from './useAuth';

interface UseKakaoOAuthOptions {
  mode: 'login' | 'signup';
  onErrorRedirect?: string;
}

/** useKakaoOAuth
 * @description
 * 카카오 OAuth 인증 콜백 로직을 수행하는 커스텀 훅입니다.
 * `mode`에 따라 로그인 또는 회원가입 로직을 수행하며, 인증 성공 시 토큰을 상태에 저장하고 사용자 정보를 가져온 뒤 홈으로 이동합니다.
 * 이미 등록된 계정이 다시 회원가입을 시도하면 에러 발생과 함께 다시 로그인 페이지(`/login`)로 이동합니다.
 *
 * @param {'login' | 'signup'} options.mode - 로그인 모드 / 회원가입 모드
 * @param {string} [options.onErrorRedirect] - 회원가입 중 이미 등록된 사용자일 경우 리다이렉트할 경로 (기본값: '/login')
 *
 * @example
 * useKakaoOAuth({ mode: 'login' });
 *
 * @example
 * useKakaoOAuth({ mode: 'signup', onErrorRedirect: '/login' });
 */
export const useKakaoOAuth = ({ mode, onErrorRedirect }: UseKakaoOAuthOptions) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { fetchMyProfile } = useAuth();
  const { setAccessToken, setRefreshToken } = useWhatTodayStore();
  const { toast } = useToast();

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) return;

    const sendAuthRequest = async () => {
      try {
        const response = mode === 'login' ? await signInWithKakao(code) : await signUpWithKakao(code);

        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        await fetchMyProfile();
        navigate('/');
      } catch (error) {
        const message = error instanceof Error ? error.message : '인증에 실패했습니다.';
        if (message === '이미 등록된 사용자입니다.' && mode === 'signup') {
          toast({
            title: '회원가입 오류',
            description: '이미 가입한 계정이 있습니다. 로그인해주세요!',
            type: 'error',
          });
          navigate(onErrorRedirect || '/login');
        } else {
          console.error('인증 오류 발생:', error);
        }
      }
    };

    sendAuthRequest();
  }, []);
};

import { useToast } from '@what-today/design-system';
import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import axiosInstance from '@/apis/axiosInstance';
import { useWhatTodayStore } from '@/stores';

export default function KakaoCallbackSignup() {
  const { provider } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken } = useWhatTodayStore();
  const { toast } = useToast();

  useEffect(() => {
    const code = searchParams.get('code');

    const sendAuthRequest = async () => {
      try {
        const response = await axiosInstance.post('oauth/sign-up/kakao', {
          nickname: '임시닉네임',
          redirectUri: `${import.meta.env.VITE_KAKAO_REDIRECT_URL}/signup`,
          token: code,
        });

        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        navigate('/');
      } catch (error) {
        const message = error instanceof Error ? error.message : '회원가입에 실패했습니다.';

        if (message === '이미 등록된 사용자입니다.') {
          toast({
            title: '회원가입 오류',
            description: '이미 가입한 계정이 있습니다. 로그인해주세요!',
            type: 'error',
          });
          navigate('/login');
        }
      }
    };

    sendAuthRequest();
  }, [provider, searchParams]);

  return <h1>Loading...</h1>;
}

import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import axiosInstance from '@/apis/axiosInstance';
import useAuth from '@/hooks/useAuth';
import { useWhatTodayStore } from '@/stores';

export default function KakaoCallback() {
  const { provider } = useParams();
  const [searchParams] = useSearchParams();
  const { setAccessToken, setRefreshToken } = useWhatTodayStore();
  const { fetchMyProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');

    if (!code) return;

    const sendAuthRequest = async () => {
      try {
        const response = await axiosInstance.post('oauth/sign-in/kakao', {
          redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URL,
          token: code,
        });
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        await fetchMyProfile();
        navigate('/');
      } catch (err) {
        console.error('서버 오류가 발생했습니다.');
      }
    };

    sendAuthRequest();
  }, [provider, searchParams]);

  return <h1>Loading...</h1>;
}

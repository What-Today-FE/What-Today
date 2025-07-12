import { login } from '@/apis/auth';
import { getMyProfile } from '@/apis/user';
import { useWhatTodayStore } from '@/stores';

export default function useAuth() {
  const { setAccessToken, setRefreshToken, setUser, clearAuth } = useWhatTodayStore();

  const loginUser = async (email: string, password: string) => {
    const { data } = await login(email, password);
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
  };

  const logoutUser = () => {
    clearAuth();
  };

  const fetchMyProfile = async () => {
    const { data } = await getMyProfile();
    setUser(data);
  };

  return { loginUser, logoutUser, fetchMyProfile };
}

import { login } from '@/apis/auth';
import { getMyProfile } from '@/apis/user';
import type { SignInFormValues } from '@/schemas/auth';
import { useWhatTodayStore } from '@/stores';

/** useAuth
 * @description 로그인, 로그아웃, 사용자 정보 불러오기를 처리합니다.
 * @returns 인증 함수들 (loginUser, logoutUser, fetchMyProfile)
 */
export default function useAuth() {
  const { setAccessToken, setRefreshToken, setUser, clearAuth } = useWhatTodayStore();

  /** loginUser
   * @description 로그인을 처리하며, 로그인 성공 시 accessToken과 refreshToken을 상태에 저장합니다.
   *
   * @param email - 사용자 이메일
   * @param password - 사용자 비밀번호
   * @throws 로그인 실패 시 예외를 발생시킵니다.
   */
  const loginUser = async (input: SignInFormValues) => {
    const data = await login(input);
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
  };

  /** logoutUser
   * @description 로그아웃을 처리하며, 전역 상태로 저장 중인 저장된 인증 정보를 모두 제거합니다.
   */
  const logoutUser = () => {
    clearAuth();
  };

  /** fetchMyProfile
   * @description 로그인된 사용자의 프로필 정보를 서버에서 가져와 전역 상태로 저장합니다.
   */
  const fetchMyProfile = async () => {
    const { data } = await getMyProfile();
    setUser(data);
  };

  return { loginUser, logoutUser, fetchMyProfile };
}

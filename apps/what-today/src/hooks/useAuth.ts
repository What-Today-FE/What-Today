import { useQueryClient } from '@tanstack/react-query';

import { getMyProfile } from '@/apis/user';
import { useWhatTodayStore } from '@/stores';

/** useAuth
 * @description 로그아웃을 처리합니다.
 * @returns 인증 함수 (logoutUser)
 */
export default function useAuth() {
  const queryClient = useQueryClient();
  const { clearAuth, setUser } = useWhatTodayStore();

  /** logoutUser
   * @description 로그아웃을 처리하며, 전역 상태로 저장 중인 저장된 인증 정보를 모두 제거합니다.
   */
  const logoutUser = () => {
    queryClient.clear();
    clearAuth();
  };

  /** fetchMyProfile
   * @description 로그인된 사용자의 프로필 정보를 서버에서 가져와 전역 상태로 저장합니다.
   */
  const fetchMyProfile = async () => {
    const { data } = await getMyProfile();
    setUser(data);
  };

  return { logoutUser, fetchMyProfile };
}

import {
  CalendarIcon,
  ListIcon,
  MypageProfileHeader,
  SettingIcon,
  UserIcon,
  useToast,
} from '@what-today/design-system';
import { useNavigate } from 'react-router-dom';

import MypageMainSidebar from '@/components/MypageMainSideBar';
import useAuth from '@/hooks/useAuth';
import { useWhatTodayStore } from '@/stores';

/**
 * 사이드바에 표시할 고정 메뉴 항목 목록
 * 각 항목은 라벨, 아이콘 컴포넌트, 이동 경로로 구성됩니다.
 */
const items = [
  { icon: UserIcon, label: '내 정보', to: '/mypage/edit-profile' },
  { icon: ListIcon, label: '예약 내역', to: '/mypage/reservations-list' },
  { icon: SettingIcon, label: '내 체험 관리', to: '/mypage/manage-activities' },
  { icon: CalendarIcon, label: '예약 현황', to: '/mypage/reservations-status' },
];

export default function MyPage() {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const { user } = useWhatTodayStore();
  const { toast } = useToast();
  const handleLogout = () => {
    logoutUser();
    toast({
      title: '로그아웃 성공',
      description: '다음에 또 만나요! 👋🏻',
      type: 'success',
    });
    navigate('/login');
  };
  return (
    <div className='flex gap-30'>
      <MypageMainSidebar />
      <div className='w-full'>
        <MypageProfileHeader
          name={user?.nickname}
          profileImageUrl={user?.profileImageUrl ?? undefined}
          onLogoutClick={handleLogout}
        />
      </div>
    </div>
  );
}

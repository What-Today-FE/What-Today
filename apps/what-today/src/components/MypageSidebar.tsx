// import { CalendarIcon, ExitIcon, ListIcon, SettingIcon, UserIcon } from '@/components/icons';
import {
  Button,
  CalendarIcon,
  ExitIcon,
  ListIcon,
  ProfileLogo,
  SettingIcon,
  UserIcon,
} from '@what-today/design-system';
import { Link, useLocation } from 'react-router-dom';

interface MypageSidebarProps {
  /**
   * 사용자 프로필 이미지 URL
   * 전달되지 않을 경우 기본 아이콘(ProfileLogo)이 표시됩니다.
   */
  profileImgUrl?: string;

  /**
   * 로그아웃 버튼 클릭 시 실행되는 콜백 함수(아마 모달을 띄우지 않을까 싶습니다.)
   */
  onClick: () => void;
}

/**
 * MypageSidebar 컴포넌트
 *
 * 사용자의 프로필 이미지와 마이페이지 관련 메뉴를 표시합니다.
 * 현재 URL 경로에 따라 해당 메뉴 항목을 하이라이트 처리합니다.
 * 로그아웃 버튼을 포함하며, 클릭 시 지정된 콜백을 실행합니다.
 *
 * @component
 * @example
 * <MypageSidebar
 *   profileImgUrl="https://example.com/avatar.jpg"
 *   onClick={() => logout()}
 * />
 */
export default function MypageSidebar({ profileImgUrl, onClick }: MypageSidebarProps) {
  const location = useLocation();
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

  return (
    <nav className='flex h-474 flex-col items-center gap-24 rounded-xl border border-gray-50 bg-white px-14 pt-24 pb-12 shadow-[0px_4px_24px_rgba(156,180,202,0.2)] md:w-180 xl:w-280'>
      {profileImgUrl ? (
        <img alt='프로필 이미지' className='bg-primary-100 size-120 rounded-full' src={profileImgUrl} />
      ) : (
        <ProfileLogo className='rounded-full' size={120} />
      )}
      <ul className='flex w-full flex-col justify-center'>
        {items.map(({ label, icon: Icon, to }) => {
          const isSelected = location.pathname.startsWith(to);
          const baseClass = 'flex w-full cursor-pointer items-center gap-8 rounded-2xl px-20 py-14 text-gray-600';
          const selectedClass = isSelected && 'bg-primary-100 text-gray-950';
          const colorProps = isSelected ? '#3d9ef2' : '#707177';

          return (
            <li key={label}>
              <Link className={`${baseClass} ${selectedClass} `} to={to}>
                <div className='flex size-24 items-center justify-center'>
                  <Icon color={`${colorProps}`} />
                </div>
                <div className='text-lg font-medium'>{label}</div>
              </Link>
            </li>
          );
        })}
      </ul>
      <Button className='w-full text-gray-400' size='lg' variant='ghost' onClick={onClick}>
        <ExitIcon /> 로그아웃
      </Button>
    </nav>
  );
}

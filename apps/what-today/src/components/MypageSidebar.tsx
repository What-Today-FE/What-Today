import { Button, CalendarIcon, ExitIcon, ListIcon, SettingIcon, UserIcon } from '@what-today/design-system';
import { Link, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface MypageSidebarProps {
  /**
   * 사용자 프로필 이미지 URL
   * 전달되지 않을 경우 기본 아이콘(ProfileLogo)이 표시됩니다.
   */
  // profileImgUrl?: string;
  /**
   * 로그아웃 버튼 클릭 시 실행되는 콜백 함수(아마 모달을 띄우지 않을까 싶습니다.)
   */
  onLogoutClick: () => void;
  /**
   * 클릭했을 때 sidebar 열림 여부 변경
   */
  onClick: () => void;
  /**
   * MypageSidebar의 열림 여부
   */
  isOpen: boolean;
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
 *   isOpen={isSidebarOpen}
 *   onClick={() => setSidebarOpen((prev) => !prev)}
 *   onLogoutClick={() => alert('hi')}
 * />
 */
export default function MypageSidebar({ onLogoutClick, onClick, isOpen }: MypageSidebarProps) {
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
    <nav
      className={twMerge(
        // 공통 스타일
        'fixed z-50 max-w-200 min-w-200 rounded-2xl border border-gray-50 bg-white transition duration-300 md:static md:h-fit xl:w-280',
        // 모바일에서 Drawer 위치
        isOpen ? 'translate-x-0' : 'h-50 -translate-x-full bg-gray-200',
        'md:translate-x-0',
        'md:bg-white',
      )}
    >
      {/* 콘텐츠: PC는 항상, 모바일은 isOpen일 때만 */}
      <div
        className={twMerge(
          'flex h-full flex-col items-center gap-24 px-14 pt-24 pb-12',
          isOpen ? 'flex' : 'hidden',
          'md:flex',
        )}
      >
        {/* {profileImgUrl ? (
          <img
            alt='프로필 이미지'
            className='bg-white-100 size-120 rounded-full border border-gray-50 object-cover'
            src={profileImgUrl}
          />
        ) : (
          <ProfileLogo className='rounded-full' size={120} />
        )} */}
        <ul className='flex w-full flex-col justify-center gap-4'>
          {items.map(({ label, icon: Icon, to }) => {
            const isSelected = location.pathname === to;
            const itemClass = twMerge(
              'flex w-full cursor-pointer items-center gap-8 rounded-2xl px-20 py-14',
              isSelected ? 'bg-primary-100 text-gray-950' : 'text-gray-600 hover:bg-gray-25',
            );
            const iconColor = isSelected ? '#3d9ef2' : '#707177';
            return (
              <li key={label}>
                <Link className={itemClass} to={to} onClick={onClick}>
                  <div className='flex size-24 items-center justify-center'>
                    <Icon color={`${iconColor}`} />
                  </div>
                  <div className='body-text font-medium'>{label}</div>
                </Link>
              </li>
            );
          })}
        </ul>
        <Button className='w-full text-gray-400' size='lg' variant='ghost' onClick={onLogoutClick}>
          <ExitIcon /> 로그아웃
        </Button>
      </div>
    </nav>
  );
}

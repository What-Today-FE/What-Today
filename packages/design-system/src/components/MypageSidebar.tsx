import { useState } from 'react';

import { CalendarIcon, DeleteIcon, ListIcon, SettingIcon, UserIcon } from '@/components/icons';
import { ProfileLogo } from '@/components/logos';

interface MypageSidebarProps {
  /**
   * 프로필 이미지 URL (없으면 기본 프로필 로고가 표시됨)
   */
  profileImgUrl?: string;
  /**
   * 사이드바 항목 클릭 시 호출되는 함수
   * @param label 클릭된 항목의 이름
   */
  onClick: (label: string) => void;
}

/**
 * MypageSidebar 컴포넌트
 *
 * - 마이페이지 좌측 사이드바 UI를 구성합니다.
 * - 사용자 프로필 이미지 또는 기본 아이콘을 상단에 보여줍니다.
 * - '내 정보', '예약 내역', '내 체험 관리', '예약 현황', '로그아웃' 등의 항목을 제공합니다.
 * - 항목 클릭 시 선택 상태가 변경되며, `onClick(label)` 콜백이 호출됩니다.
 *
 * @component
 * @param {MypageSidebarProps} props - 프로필 이미지 URL과 클릭 핸들러
 *
 * @example
 * ```tsx
 * <MypageSidebar
 *   profileImgUrl="/me.png"
 *   onClick={(label) => console.log(label)}
 * />
 * ```
 */
export default function MypageSidebar({ profileImgUrl, onClick }: MypageSidebarProps) {
  const [selected, setSelected] = useState('내 정보');
  const items = [
    { icon: UserIcon, label: '내 정보' },
    { icon: ListIcon, label: '예약 내역' },
    { icon: SettingIcon, label: '내 체험 관리' },
    { icon: CalendarIcon, label: '예약 현황' },
    { icon: DeleteIcon, label: '로그아웃' },
  ];

  return (
    <nav className='flex grow flex-col items-center gap-24 rounded-xl border border-gray-50 bg-white px-14 py-24 shadow-[0px_4px_24px_rgba(156,180,202,0.2)] md:max-w-290'>
      {profileImgUrl ? (
        <img alt='프로필 이미지' className='bg-primary-100 size-120 rounded-full' src={profileImgUrl} />
      ) : (
        <ProfileLogo />
      )}
      <ul className='flex w-full flex-col justify-center'>
        {items.map(({ label, icon: Icon }) => {
          const baseClass = 'flex w-full cursor-pointer items-center gap-8 rounded-2xl px-20 py-14 text-gray-600';
          const isSelected = selected === label;
          const selectedClass = isSelected && 'bg-primary-100 text-gray-950';
          const colorProps = isSelected ? 'var(--color-primary-500)' : 'var(--color-gray-600)';

          const handleClick = () => {
            setSelected(label);
            onClick(label);
          };

          return (
            <li key={label}>
              <button className={`${baseClass} ${selectedClass} `} onClick={handleClick}>
                <div className='flex size-24 items-center justify-center'>
                  <Icon color={`${colorProps}`} />
                </div>
                <div className='text-lg font-medium'>{label}</div>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

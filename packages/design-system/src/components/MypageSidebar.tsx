import { useState } from 'react';

import { CalendarIcon, DeleteIcon, ListIcon, SettingIcon, UserIcon } from '@/components/icons';

import { ProfileLogo } from './logos';

interface MypageSidebarProps {
  profileImgUrl?: string;
  onClick: (label: string) => void;
}

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

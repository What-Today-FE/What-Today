import { BellIcon, DotIcon, ProfileLogo } from '@what-today/design-system';
import { ImageLogo } from '@what-today/design-system';
import { TextLogo } from '@what-today/design-system';
import { Link } from 'react-router-dom';

import { useWhatTodayStore } from '@/stores';

export default function Header() {
  const { user, isLoggedIn } = useWhatTodayStore();

  return (
    <header className='relative z-50 flex w-full justify-between py-16'>
      <Link className='flex items-center gap-8' to='/'>
        <ImageLogo className='size-24' />
        <TextLogo className='hidden h-fit w-65 sm:block' />
      </Link>

      {isLoggedIn ? (
        <div className='text-md flex items-center gap-8 text-gray-950'>
          <button
            aria-describedby='notification-dot'
            aria-label='알림'
            className='relative cursor-pointer hover:opacity-60'
            type='button'
          >
            {/* 알람 있을 때 사용 */}
            <DotIcon
              aria-label='새 알림 있음'
              className='absolute top-2 left-12 size-8'
              color='var(--color-red-500)'
              id='notification-dot'
            />
            <BellIcon className='size-20' color='var(--color-gray-600)' />
          </button>

          <div className='mx-12 h-16 w-px bg-gray-100' />

          <Link className='flex items-center gap-8 hover:opacity-60' to='/mypage'>
            {user?.profileImageUrl ? (
              <img alt='프로필 이미지' className='size-24 rounded-full object-cover' src={user.profileImageUrl} />
            ) : (
              <ProfileLogo className='size-24' />
            )}

            <p>{user?.nickname}</p>
          </Link>
        </div>
      ) : (
        <div className='text-md flex items-center gap-4 sm:gap-12'>
          <Link to='/login'>
            <p className='cursor-pointer hover:opacity-60'>로그인</p>
          </Link>
          <div className='mx-12 h-12 w-px bg-gray-100' />
          <Link to='/signup'>
            <p className='cursor-pointer hover:opacity-60'>회원가입</p>
          </Link>
        </div>
      )}
    </header>
  );
}

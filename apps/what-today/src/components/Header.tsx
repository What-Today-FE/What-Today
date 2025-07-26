import { ProfileLogo } from '@what-today/design-system';
import { ImageLogo } from '@what-today/design-system';
import { TextLogo } from '@what-today/design-system';
import { Link } from 'react-router-dom';

import { useResponsive } from '@/hooks/useResponsive';
import { useWhatTodayStore } from '@/stores';

import NotificationPopover from './notification/NotificationPopover';

export default function Header() {
  const { user, isLoggedIn } = useWhatTodayStore();
  const screenSize = useResponsive();
  const isMobile = screenSize === 'sm';

  return (
    <div className='relative z-50 flex w-full justify-between py-16'>
      <Link className='flex items-center gap-8' to='/'>
        <ImageLogo className='size-24' />
        <TextLogo className='hidden h-fit w-65 sm:block' />
      </Link>

      {isLoggedIn ? (
        <div className='text-md flex items-center gap-8 text-gray-950'>
          <NotificationPopover isMobile={isMobile} />

          <div className='mx-12 h-16 w-px bg-gray-100' />

          <Link className='flex items-center gap-8 hover:opacity-60' to='/mypage/edit-profile'>
            {user?.profileImageUrl ? (
              <img
                alt='프로필 이미지'
                className='size-24 rounded-full border border-gray-50 bg-white object-cover'
                src={user.profileImageUrl}
              />
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
    </div>
  );
}

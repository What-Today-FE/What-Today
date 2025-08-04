import Button from './button';
import { ExitIcon } from './icons';
import { ProfileLogo } from './logos';

interface MypageProfileHeaderProps {
  name?: string;
  email?: string;
  profileImageUrl?: string;
  onLogoutClick: () => void;
}

export default function MypageProfileHeader({ name, email, profileImageUrl, onLogoutClick }: MypageProfileHeaderProps) {
  return (
    <div className='flex items-center gap-36 rounded-3xl border border-gray-50 bg-white px-36 py-36'>
      <div className='flex aspect-square size-120 items-center justify-center rounded-full border border-gray-50 bg-white'>
        {profileImageUrl ? (
          <img
            alt='프로필 이미지'
            className='aspect-square size-110 rounded-full border border-gray-50 bg-white object-cover'
            src={profileImageUrl}
          />
        ) : (
          <ProfileLogo className='rounded-full' size={110} />
        )}
      </div>

      <div className='flex h-80 flex-col justify-center gap-16 text-gray-950'>
        <div className='flex flex-col'>
          <p className='title-text line-clamp-1 font-bold'>{name}</p>
          <p className='body-text line-clamp-1 text-gray-400'>{email}</p>
        </div>
        <Button
          className='caption-text h-auto w-auto justify-start p-0 text-gray-400'
          size='lg'
          variant='none'
          onClick={onLogoutClick}
        >
          <ExitIcon className='size-12' /> 로그아웃
        </Button>
      </div>
    </div>
  );
}

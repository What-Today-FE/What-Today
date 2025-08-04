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
    <div className='flex items-center gap-24 rounded-3xl border border-gray-50 bg-white px-36 py-24'>
      <div className='flex size-100 items-center justify-center rounded-full border border-gray-50 bg-white'>
        {profileImageUrl ? (
          <img
            alt='프로필 이미지'
            className='bg-white-100 size-90 rounded-full border border-gray-50 object-cover'
            src={profileImageUrl}
          />
        ) : (
          <ProfileLogo className='rounded-full' size={90} />
        )}
      </div>

      <div className='flex h-80 flex-col justify-center gap-8 text-gray-950'>
        <div className='flex flex-col'>
          <p className='text-2xl font-bold'>{name}</p>
          <p className='text-lg text-gray-400'>{email}</p>
        </div>
        <Button
          className='h-auto w-auto justify-start p-0 text-gray-400'
          size='lg'
          variant='none'
          onClick={onLogoutClick}
        >
          <ExitIcon className='size-16' /> 로그아웃
        </Button>
      </div>
    </div>
  );
}

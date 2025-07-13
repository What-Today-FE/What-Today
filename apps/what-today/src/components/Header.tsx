import { Link } from 'react-router-dom';

import { useWhatTodayStore } from '@/stores';

export default function Header() {
  const { user, isLoggedIn } = useWhatTodayStore();

  return (
    <div className='flex w-full justify-between px-[10vw] py-16'>
      <div className='flex gap-8'>
        <div className='bg-primary-100 size-24 rounded-full' />
        <div className='hidden sm:block'>오늘뭐해</div>
      </div>

      {isLoggedIn ? (
        <div className='text-md flex items-center gap-8'>
          <div className='cursor-pointer hover:opacity-60'>🔔</div>

          <div className='mx-12 h-16 w-px bg-gray-100' />

          <Link className='flex items-center gap-12 hover:opacity-60' to='/mypage'>
            <div className='bg-primary-100 size-24 rounded-full' />
            <p>{user?.nickname} 님</p>
          </Link>
        </div>
      ) : (
        <div className='text-md flex items-center gap-24'>
          <Link to='/login'>
            <p className='cursor-pointer hover:opacity-60'>로그인</p>
          </Link>
          <Link to='/signup'>
            <p className='cursor-pointer hover:opacity-60'>회원가입</p>
          </Link>
        </div>
      )}
    </div>
  );
}

import { Button, ChevronIcon, useToast } from '@what-today/design-system';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import MypageSidebar from '@/components/MypageSidebar';
import useAuth from '@/hooks/useAuth';

export default function MyPageLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { logoutUser } = useAuth();
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

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className='flex h-full w-full flex-col md:flex-row md:gap-30'>
      {/* 모바일: 오버레이 배경 */}
      {isSidebarOpen && (
        <div className='fixed inset-0 z-50 bg-black/30 md:hidden' onClick={() => setSidebarOpen(false)} />
      )}
      <MypageSidebar
        isOpen={isSidebarOpen}
        // profileImgUrl={user?.profileImageUrl ?? ''}
        onClick={() => setSidebarOpen((prev) => !prev)}
        onLogoutClick={handleLogout}
      />
      <Button
        className={twMerge('fixed top-92 left-4 z-55 w-fit p-0 md:hidden', isSidebarOpen && 'hidden')}
        size='xs'
        variant='none'
        onClick={() => setSidebarOpen(true)}
      >
        <ChevronIcon className='h-16' color='var(--color-gray-600)' direction='right' />
      </Button>
      {/* Outlet으로 상세 화면 표시 */}
      <div className='flex-1 p-4'>
        <Outlet />
      </div>
    </div>
  );
}

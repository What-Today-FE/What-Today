import { Button, ChevronIcon } from '@what-today/design-system';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import MypageSidebar from '@/components/MypageSidebar';

export default function MyPageLayout() {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
        onClick={() => setSidebarOpen((prev) => !prev)}
        onLogoutClick={() => alert('hi')}
      />
      {/* Outlet으로 상세 화면 표시 */}
      <div className='flex-1 p-4'>
        <Button className='w-fit p-0 md:hidden' size='xs' variant='none' onClick={() => setSidebarOpen(true)}>
          <ChevronIcon className='h-16' direction='left' />
        </Button>
        <Outlet />
      </div>
    </div>
  );
}

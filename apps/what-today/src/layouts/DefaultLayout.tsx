import { Outlet, useLocation } from 'react-router-dom';

import Header from '@/components/Header';

export default function DefaultLayout() {
  const location = useLocation();
  const isActivityDetailPage = location.pathname.startsWith('/activities/');

  return (
    <div className='flex w-full flex-col items-center gap-8 bg-white'>
      <header className='w-full max-w-7xl px-[5vw]'>
        <Header />
      </header>
      {/* @Taeil08 Footer 추가하실 때 min-h만 수정 부탁드려요! */}
      <main
        className={`min-h-[90vh] w-full ${
          isActivityDetailPage
            ? 'max-w-7xl px-16 sm:px-24 md:px-32 lg:px-48 xl:max-w-7xl' // 상세 페이지: 반응형 패딩
            : 'max-w-6xl px-[5vw] xl:max-w-5xl' // 기본 페이지: 기존 스타일
        }`}
      >
        <Outlet />
      </main>
      <div className='w-full border-t-1 border-gray-50'>
        <footer className='w-full max-w-7xl px-[5vw]'>{/* <Footer /> */}</footer>
      </div>
    </div>
  );
}

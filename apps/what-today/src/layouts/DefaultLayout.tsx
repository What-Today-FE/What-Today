import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from '@what-today/design-system';

import Header from '@/components/Header';

export default function DefaultLayout() {
  const location = useLocation();
  const isActivityDetailPage = location.pathname.startsWith('/activities/');

  return (
    <div className='flex w-full flex-col items-center gap-8 bg-white'>
      <header className='w-full max-w-7xl px-[5vw]'>
        <Header />
      </header>
      <main
        className={`min-h-[90vh] w-full ${
          isActivityDetailPage
            ? 'max-w-7xl px-16 sm:px-24 md:px-32 lg:px-48 xl:max-w-7xl' // 상세 페이지: 반응형 패딩
            : 'max-w-6xl px-[5vw] xl:max-w-5xl' // 기본 페이지: 기존 스타일
        }`}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

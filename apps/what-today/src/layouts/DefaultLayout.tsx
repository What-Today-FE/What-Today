import { Footer } from '@what-today/design-system';
import { Outlet, useLocation } from 'react-router-dom';
import { twJoin } from 'tailwind-merge';

import FloatingTranslateButton from '@/components/FloatingTranslateButton';
import Header from '@/components/Header';
import { useResponsive } from '@/hooks/useResponsive';

export default function DefaultLayout() {
  const location = useLocation();
  const { isDesktop } = useResponsive();
  const isActivityDetailPage = location.pathname.startsWith('/activities/');

  // const footerMarginBottom = isActivityDetailPage && !isDesktop ? 'w-full mb-120' : 'w-full';

  // FloatingTranslateButton의 bottom 위치 조건부 설정
  const floatingButtonClass = !isDesktop && isActivityDetailPage ? 'bottom-160' : undefined;

  return (
    <div className='flex w-full min-w-375 flex-col items-center gap-8'>
      <header className='w-full max-w-7xl px-[5vw]'>
        <Header />
      </header>

      <main className='w-full max-w-7xl px-16 sm:px-24 md:px-32 lg:px-48'>
        <Outlet />
      </main>

      <div className={twJoin('w-full', isActivityDetailPage && !isDesktop && 'mb-120', 'mt-30')}>
        <Footer />
      </div>

      {/* 플로팅 번역 버튼 */}
      <FloatingTranslateButton className={floatingButtonClass} />
    </div>
  );
}

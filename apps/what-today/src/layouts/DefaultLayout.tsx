import { Footer } from '@what-today/design-system';
import { Outlet, useLocation } from 'react-router-dom';

import FloatingTranslateButton from '@/components/FloatingTranslateButton';
import Header from '@/components/Header';
import { useResponsive } from '@/hooks/useResponsive';

export default function DefaultLayout() {
  const location = useLocation();
  const { isDesktop } = useResponsive();
  const isActivityDetailPage = location.pathname.startsWith('/activities/');

  const footerMarginBottom = isActivityDetailPage && !isDesktop ? 'w-full mb-125' : 'w-full';

  // FloatingTranslateButton의 bottom 위치 조건부 설정
  const floatingButtonClass = !isDesktop && isActivityDetailPage ? 'bottom-160' : undefined;

  return (
    <div className='flex w-full flex-col items-center gap-8 overflow-x-hidden'>
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

      <div className={footerMarginBottom}>
        <Footer />
      </div>

      {/* 플로팅 번역 버튼 */}
      <FloatingTranslateButton className={floatingButtonClass} />
    </div>
  );
}

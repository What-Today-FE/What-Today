import { Footer } from '@what-today/design-system';
import { Outlet } from 'react-router-dom';

import Header from '@/components/Header';

export default function DefaultLayout() {
  return (
    <div className='flex w-full flex-col items-center gap-8 bg-white'>
      <header className='w-full max-w-7xl px-[5vw]'>
        <Header />
      </header>
      <main className='min-h-[90vh] w-full max-w-6xl px-[5vw] xl:max-w-5xl'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

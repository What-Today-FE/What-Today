import { Outlet } from 'react-router-dom';

import ScrollToTop from '@/components/ScrollToTop';

export default function App() {
  return (
    <main>
      <ScrollToTop />
      <Outlet />
    </main>
  );
}

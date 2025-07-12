import SidebarNavItem from '@layouts/SidebarNavItem';
import { Link, Outlet } from 'react-router-dom';

export default function DesignSystemLayout() {
  return (
    <div className='flex min-h-[100vh] bg-white'>
      <aside className='w-[17vw] min-w-[12rem] border-r border-gray-200 bg-gray-50 p-24'>
        <Link to='/docs'>
          <h2 className='text-primary-500 mb-36 text-lg font-light'>WhatToday Design System</h2>
        </Link>
        <nav>
          <ul className='m-0 list-none p-0'>
            <SidebarNavItem label='Button (Example Doc)' to='/docs/button-example' />
            {/* ✅ 아래에 <SidebarNavItem>을 활용한 컴포넌트 문서 링크를 추가해주세요. */}
            <SidebarNavItem label='Calendar' to='/docs/Calendar' />
          </ul>
        </nav>
      </aside>

      <main className='flex-1 p-[2rem]'>
        <Outlet />
      </main>
    </div>
  );
}

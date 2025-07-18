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
            <SidebarNavItem label='Button' to='/docs/button' />
            {/* ✅ 아래에 <SidebarNavItem>을 활용한 컴포넌트 문서 링크를 추가해주세요. */}
            <SidebarNavItem label='Input' to='/docs/Input' />
            <SidebarNavItem label='Icon' to='/docs/Icon' />
            <SidebarNavItem label='Logo' to='/docs/Logo' />
            <SidebarNavItem label='Pagination' to='/docs/Pagination' />
            <SidebarNavItem label='RadioGroup' to='/docs/RadioGroup' />
            <SidebarNavItem label='Calendar' to='/docs/Calendar' />
            <SidebarNavItem label='MypageSidebar' to='/docs/MypageSidebar' />
            <SidebarNavItem label='Textarea' to='/docs/Textarea' />
            <SidebarNavItem label='Dropdown' to='/docs/Dropdown' />
            <SidebarNavItem label='Select' to='/docs/Select' />
            <SidebarNavItem label='Popover' to='/docs/Popover' />
            <SidebarNavItem label='ExperienceCard' to='/docs/ExperienceCard' />
            <SidebarNavItem label='NoResult' to='/docs/NoResult' />
            <SidebarNavItem label='UserBadge' to='/docs/UserBadge' />
            <SidebarNavItem label='MainCard' to='/docs/MainCard' />
            <SidebarNavItem label='ReservationCard' to='/docs/ReservationCard' />
            <SidebarNavItem label='OwnerBadge' to='/docs/OwnerBadge' />
          </ul>
        </nav>
      </aside>

      <main className='flex-1 p-[2rem]'>
        <Outlet />
      </main>
    </div>
  );
}

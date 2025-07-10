import { Link, Outlet, useLocation } from 'react-router-dom';

export default function MyPageLayout() {
  const location = useLocation();

  const tabs = [
    { name: '내 정보', path: '/mypage/edit-profile' },
    { name: '예약 내역', path: '/mypage/reservations-list' },
    { name: '내 체험 관리', path: '/mypage/manage-activities' },
    { name: '예약 현황', path: '/mypage/reservations-status' },
  ];

  return (
    <div className='flex h-full w-full flex-col md:flex-row'>
      {/* 사이드 탭 - PC/Tablet */}
      <div className='hidden w-64 border-r bg-gray-50 md:block'>
        <div className='p-4 text-lg font-bold'>마이페이지</div>
        <nav className='flex flex-col'>
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              className={`p-4 hover:bg-gray-100 ${location.pathname === tab.path ? 'font-bold text-blue-600' : ''}`}
              to={tab.path}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* 모바일 탭 메뉴 */}
      <div className='flex overflow-x-auto border-b md:hidden'>
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            className={`flex-1 p-3 text-center ${
              location.pathname === tab.path ? 'border-b-2 border-blue-500 font-bold' : ''
            }`}
            to={tab.path}
          >
            {tab.name}
          </Link>
        ))}
      </div>

      {/* Outlet으로 상세 화면 표시 */}
      <div className='flex-1 p-4'>
        <Outlet />
      </div>
    </div>
  );
}

import { useQuery } from '@tanstack/react-query';
import {
  CalendarIcon,
  ListIcon,
  MypageProfileHeader,
  MypageSummaryCard,
  OngoingExperienceCard,
  SettingIcon,
  UpcomingSchedule,
  UserIcon,
  useToast,
} from '@what-today/design-system';
import { useNavigate } from 'react-router-dom';

import { fetchMyReservations } from '@/apis/myReservations';
import MypageMainSidebar from '@/components/MypageMainSideBar';
import useAuth from '@/hooks/useAuth';
import { useInfiniteMyActivitiesQuery } from '@/hooks/useMyActivitiesQuery';
import type { MyReservationsResponse } from '@/schemas/myReservations';
import { useWhatTodayStore } from '@/stores';

/**
 * 사이드바에 표시할 고정 메뉴 항목 목록
 * 각 항목은 라벨, 아이콘 컴포넌트, 이동 경로로 구성됩니다.
 */
const items = [
  { icon: UserIcon, label: '내 정보', to: '/mypage/edit-profile' },
  { icon: ListIcon, label: '예약 내역', to: '/mypage/reservations-list' },
  { icon: SettingIcon, label: '내 체험 관리', to: '/mypage/manage-activities' },
  { icon: CalendarIcon, label: '예약 현황', to: '/mypage/reservations-status' },
];

export default function MyPage() {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const { user } = useWhatTodayStore();
  const { toast } = useToast();
  // 등록한 체험 갯수
  const { data: activityData } = useInfiniteMyActivitiesQuery(1);
  // 완료한 체험 갯수
  const { data: completedData } = useQuery<MyReservationsResponse>({
    queryKey: ['reservations'],
    queryFn: () =>
      fetchMyReservations({
        cursorId: null, // 첫 페이지부터 가져옴
        size: 1000, // 충분히 큰 숫자로 설정 (전체 데이터 한 번에)
        status: 'completed', // 완료된 체험만 받아오기
      }),
    staleTime: 1000 * 30,
  });

  const handleLogout = () => {
    logoutUser();
    toast({
      title: '로그아웃 성공',
      description: '다음에 또 만나요! 👋🏻',
      type: 'success',
    });
    navigate('/login');
  };
  return (
    <div className='flex gap-30'>
      <MypageMainSidebar />
      <div className='flex w-full flex-col gap-24'>
        <MypageProfileHeader
          name={user?.nickname}
          profileImageUrl={user?.profileImageUrl ?? undefined}
          onLogoutClick={handleLogout}
        />
        <div className='flex gap-24'>
          <MypageSummaryCard.Root>
            <MypageSummaryCard.Item count={activityData?.pages[0]?.totalCount || 0} label='등록한 체험' />
            <MypageSummaryCard.Item count={100} label='승인 대기' />
          </MypageSummaryCard.Root>
          <MypageSummaryCard.Root className='bg-[#4D6071]'>
            <MypageSummaryCard.Item
              count={completedData?.totalCount || 0}
              countClassName='text-white'
              label='완료한 체험'
              labelClassName='text-gray-200'
            />
            <MypageSummaryCard.Item
              count={100}
              countClassName='text-white'
              label='리뷰 대기'
              labelClassName='text-gray-200'
            />
          </MypageSummaryCard.Root>
        </div>
        <div className='flex h-540 flex-col gap-16 overflow-hidden rounded-3xl border border-gray-50 px-40 pt-32'>
          <p className='body-text font-bold'>다가오는 일정</p>
          <UpcomingSchedule className='pl-32' />
        </div>
        <div className='flex flex-col gap-16 pt-20'>
          <p className='body-text font-bold'>모집 중인 체험</p>
          <OngoingExperienceCard />
        </div>
      </div>
    </div>
  );
}

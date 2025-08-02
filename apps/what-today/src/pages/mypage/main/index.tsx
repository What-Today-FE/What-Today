import { useQuery } from '@tanstack/react-query';
import {
  MypageProfileHeader,
  MypageSummaryCard,
  OngoingExperienceCard,
  UpcomingSchedule,
  useToast,
} from '@what-today/design-system';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { fetchMyReservations } from '@/apis/myReservations';
import { useInfiniteMyActivitiesQuery } from '@/hooks/myActivity/useMyActivitiesQuery';
import { useMonthlyScheduleQuery } from '@/hooks/myReservation/useMonthlyScheduleQuery';
import useAuth from '@/hooks/useAuth';
import type { MyReservationsResponse } from '@/schemas/myReservations';
import { useWhatTodayStore } from '@/stores';

export default function MyPage() {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const { user } = useWhatTodayStore();
  const { toast } = useToast();
  // 등록한 체험 갯수
  const { data: activityData } = useInfiniteMyActivitiesQuery(1000);
  const totalActivity = activityData?.pages[0]?.totalCount;
  // 예약 승인 대기 갯수
  const activityIds =
    activityData?.pages.flatMap((page: { activities: { id: number }[] }) =>
      page.activities.map((activity) => activity.id),
    ) ?? [];
  const { data: monthlyReservations = [] } = useMonthlyScheduleQuery({
    activityId: activityIds[0],
    year: dayjs().format('YYYY'),
    month: dayjs().format('MM'),
  });
  const totalPending = monthlyReservations.reduce((sum, item) => sum + item.reservations.pending, 0);
  console.log(monthlyReservations);
  // 완료한 체험 갯수
  const { data: completedData } = useQuery<MyReservationsResponse>({
    queryKey: ['reservations', 'completed'],
    queryFn: () =>
      fetchMyReservations({
        cursorId: null, // 첫 페이지부터 가져옴
        size: 1000, // 충분히 큰 숫자로 설정 (전체 데이터 한 번에)
        status: 'completed', // 완료된 체험만 받아오기
      }),
    staleTime: 1000 * 30,
  });
  // 완료한 체험 중 리뷰 미작성 갯수
  const reviewRequired = completedData?.reservations.filter((res) => res.reviewSubmitted === false).length ?? 0;

  // 다가오는 체험 데이터
  const { data: confirmedData } = useQuery<MyReservationsResponse>({
    queryKey: ['reservations', 'confirmed'],
    queryFn: () =>
      fetchMyReservations({
        cursorId: null, // 첫 페이지부터 가져옴
        size: 1000, // 충분히 큰 숫자로 설정 (전체 데이터 한 번에)
        status: 'confirmed', // 확정된 체험만 받아오기
      }),
    staleTime: 1000 * 30,
  });
  console.log(activityData);
  console.log(activityIds);

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
      {/* <MypageMainSidebar /> */}
      <div className='flex w-full flex-col gap-24'>
        <MypageProfileHeader
          name={user?.nickname}
          profileImageUrl={user?.profileImageUrl ?? undefined}
          onLogoutClick={handleLogout}
        />
        <div className='flex gap-24'>
          <MypageSummaryCard.Root>
            <MypageSummaryCard.Item count={totalActivity || 0} label='등록한 체험' />
            <MypageSummaryCard.Item count={totalPending} label={`${dayjs().format('M')}월 승인 대기`} />
          </MypageSummaryCard.Root>
          <MypageSummaryCard.Root className='bg-[#4D6071]'>
            <MypageSummaryCard.Item
              count={completedData?.totalCount || 0}
              countClassName='text-white'
              label='완료한 체험'
              labelClassName='text-gray-200'
            />
            <MypageSummaryCard.Item
              count={reviewRequired}
              countClassName='text-white'
              label='리뷰 대기'
              labelClassName='text-gray-200'
            />
          </MypageSummaryCard.Root>
        </div>
        <div className='flex max-h-540 flex-col gap-16 rounded-3xl border border-gray-50 px-32 pt-24'>
          <p className='body-text font-bold'>다가오는 일정</p>
          <UpcomingSchedule className='w-full overflow-scroll' reservation={confirmedData?.reservations || []} />
        </div>
        <div className='flex h-300 flex-col gap-16 rounded-3xl border border-gray-50 px-40 py-24'>
          <p className='body-text font-bold'>모집 중인 체험</p>
          <OngoingExperienceCard />
        </div>
      </div>
    </div>
  );
}

import { useQueries, useQuery } from '@tanstack/react-query';
import {
  MypageProfileHeader,
  MypageSummaryCard,
  OngoingExperienceCard,
  UpcomingSchedule,
  useToast,
} from '@what-today/design-system';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { fetchReservationAvailableSchedule } from '@/apis/activityDetail';
import { getMonthlySchedule } from '@/apis/myActivities';
import { fetchMyReservations } from '@/apis/myReservations';
import { useInfiniteMyActivitiesQuery } from '@/hooks/myActivity/useMyActivitiesQuery';
import useAuth from '@/hooks/useAuth';
import type { monthlyScheduleResponse } from '@/schemas/myActivities';
import type { MyReservationsResponse } from '@/schemas/myReservations';
import { useWhatTodayStore } from '@/stores';

export default function MyPage() {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const { user } = useWhatTodayStore();
  const { toast } = useToast();

  const MAX_PAGE_SIZE = 1000;
  const year = dayjs().format('YYYY');
  const month = dayjs().format('MM');

  // 등록한 체험 갯수
  const { data: activityData } = useInfiniteMyActivitiesQuery(MAX_PAGE_SIZE);
  const totalActivity = activityData?.pages[0]?.totalCount;

  // 이번달 예약 승인 대기 갯수
  const activityIds =
    activityData?.pages.flatMap((page: { activities: { id: number }[] }) =>
      page.activities.map((activity) => activity.id),
    ) ?? [];

  const monthlyReservationsResults = useQueries({
    queries: activityIds.map((id) => ({
      queryKey: ['monthlySchedule', id, year, month],
      queryFn: () => getMonthlySchedule(id, { year, month }),
      enabled: !!id,
    })),
  });
  const monthlyReservations = monthlyReservationsResults
    .map((result) => result.data)
    .filter(Boolean) as monthlyScheduleResponse[];
  const totalPending = monthlyReservations.flat().reduce((sum, item) => sum + item.reservations.pending || 0, 0);

  // 완료한 체험 갯수
  const { data: completedData } = useQuery<MyReservationsResponse>({
    queryKey: ['reservations', 'completed'],
    queryFn: () =>
      fetchMyReservations({
        cursorId: null, // 첫 페이지부터 가져옴
        size: MAX_PAGE_SIZE, // 충분히 큰 숫자로 설정 (전체 데이터 한 번에)
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
        size: MAX_PAGE_SIZE, // 충분히 큰 숫자로 설정 (전체 데이터 한 번에)
        status: 'confirmed', // 확정된 체험만 받아오기
      }),
    staleTime: 1000 * 30,
  });

  // 이번 달 모집 중인 체험
  const reservationAvailableResults = useQueries({
    queries: activityIds.map((id) => ({
      queryKey: ['availableSchedule', id, year, month],
      queryFn: () => {
        return fetchReservationAvailableSchedule(id, { year, month });
      },
      enabled: !!id,
    })),
  });
  const availableActivityIds = reservationAvailableResults
    .map((result, index) => ({ data: result.data, activityId: activityIds[index] }))
    .filter(({ data }) => Array.isArray(data) && data.length > 0)
    .map(({ activityId }) => activityId);
  // 1. useInfiniteMyActivitiesQuery에서 받은 모든 pages를 펼침
  const allActivities = activityData?.pages.flatMap((page) => page.activities) ?? [];
  // 2. 예약 가능 activityId와 일치하는 항목만 필터링
  const availableActivities = allActivities.filter((activity) => availableActivityIds.includes(activity.id));

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
        <div className='flex max-h-540 min-h-300 flex-col gap-16 rounded-3xl border border-gray-50 px-32 pt-24'>
          <p className='body-text font-bold'>다가오는 일정</p>
          <UpcomingSchedule
            className='w-full overflow-y-scroll'
            reservation={confirmedData?.reservations || []}
            onClick={() => navigate('/')}
            onClickReservation={(id) => navigate(`/activities/${id}`)}
          />
        </div>
        <div className='flex h-300 w-full flex-col gap-16 overflow-hidden rounded-3xl border border-gray-50 px-40 py-24'>
          <p className='body-text font-bold'>{`${dayjs().format('M')}월 모집 중인 체험`}</p>
          <OngoingExperienceCard
            activities={availableActivities}
            onClick={() => navigate('/experiences/create')}
            onClickActivity={(id) => navigate(`/activities/${id}`)}
          />
        </div>
      </div>
    </div>
  );
}

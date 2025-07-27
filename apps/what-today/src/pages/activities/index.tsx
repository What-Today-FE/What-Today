import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchActivityDetail } from '@/apis/activityDetail';
import ActivitiesDescription from '@/components/activities/ActivitiesDescription';
import ActivitiesInformation from '@/components/activities/ActivitiesInformation';
import ActivitiesMap from '@/components/activities/ActivitiesMap';
import ActivityImages from '@/components/activities/ActivityImages';
import Divider from '@/components/activities/Divider';
import ReservationBottomBar from '@/components/activities/ReservationBottomBar';
import ReviewSection from '@/components/activities/ReviewSection';
import { useResponsive } from '@/hooks/useResponsive';
import { type ActivityWithSubImagesAndSchedules } from '@/schemas/activities';

export default function ActivityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<ActivityWithSubImagesAndSchedules | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isMobile, isTablet, isDesktop } = useResponsive();

  useEffect(() => {
    if (!id) return;

    const fetchActivity = async () => {
      try {
        const data = await fetchActivityDetail(id);
        setActivity(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '활동 정보를 불러오는 중 오류가 발생했습니다.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류: {error}</p>;
  if (!activity) return <p>데이터 없음</p>;

  return (
    <>
      <main className='p-4'>
        {isDesktop ? (
          <div className='grid grid-cols-[1fr_410px] gap-40'>
            <div className='flex flex-col gap-40'>
              <ActivityImages bannerImageUrl={activity.bannerImageUrl} subImages={activity.subImages} />
              <ActivitiesDescription description={activity.description} />
              <Divider />
              <ActivitiesMap address={activity.address} />
              <Divider />
              <ReviewSection />
            </div>
            <div className='sticky top-16 flex h-fit flex-col gap-38'>
              <ActivitiesInformation
                address={activity.address}
                category={activity.category}
                rating={activity.rating}
                reviewCount={activity.reviewCount}
                title={activity.title}
              />
              <section className='flex h-856 items-center justify-center rounded-xl bg-pink-100 text-xl font-bold'>
                6. 예약 선택(내부 컴포넌트 높이에 맞출 예정)
              </section>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-30'>
            <ActivityImages bannerImageUrl={activity.bannerImageUrl} subImages={activity.subImages} />
            <Divider className='border-gray-200' />
            <ActivitiesInformation
              address={activity.address}
              category={activity.category}
              rating={activity.rating}
              reviewCount={activity.reviewCount}
              title={activity.title}
            />
            <Divider className='border-t border-gray-200' />
            <ActivitiesDescription description={activity.description} />
            <Divider className='border-t border-gray-200' />
            <ActivitiesMap address={activity.address} className='h-415' />
            <Divider className='border-t border-gray-200' />
            <ReviewSection />
          </div>
        )}
      </main>

      {!isDesktop && (
        <ReservationBottomBar
          price={activity.price}
          onSelectDate={() => {
            if (isMobile) alert('모바일 바텀시트 클릭');
            else if (isTablet) alert('태블릿 바텀시트 클릭');
          }}
        />
      )}
    </>
  );
}

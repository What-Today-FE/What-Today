import { useToast } from '@what-today/design-system';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import ActivitiesDescription from '@/components/activities/ActivitiesDescription';
import ActivitiesInformation from '@/components/activities/ActivitiesInformation';
import ActivitiesMap from '@/components/activities/ActivitiesMap';
import ActivityImages from '@/components/activities/ActivityImages';
import Divider from '@/components/activities/Divider';
import MobileReservationSheet from '@/components/activities/reservation/MobileReservationSheet';
import ReservationForm from '@/components/activities/reservation/ReservationForm';
import TabletReservationSheet from '@/components/activities/reservation/TabletReservationSheet';
import type { ReservationSummary } from '@/components/activities/reservation/types';
import ReservationBottomBar from '@/components/activities/ReservationBottomBar';
import ReviewSection from '@/components/activities/ReviewSection';
import { useActivityDetail, useCreateReservation } from '@/hooks/activityDetail';
import { useResponsive } from '@/hooks/useResponsive';
import { useWhatTodayStore } from '@/stores';

export default function ActivityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { user } = useWhatTodayStore();

  const [isTabletSheetOpen, setIsTabletSheetOpen] = useState(false);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const [reservationSummary, setReservationSummary] = useState<ReservationSummary | null>(null);

  const { isMobile, isTablet, isDesktop } = useResponsive();

  const { data: activity, isLoading: loading, error } = useActivityDetail(id);

  const createReservationMutation = useCreateReservation(Number(id));

  if (loading) return <p>로딩 중...</p>;
  if (error)
    return <p>오류: {error instanceof Error ? error.message : '활동 정보를 불러오는 중 오류가 발생했습니다.'}</p>;
  if (!activity) return <p>데이터 없음</p>;

  const handleConfirmTabletReservation = (reservation: ReservationSummary) => {
    setReservationSummary(reservation);
    setIsTabletSheetOpen(false);
  };

  const handleConfirmMobileReservation = (reservation: ReservationSummary) => {
    setReservationSummary(reservation);
    setIsMobileSheetOpen(false);
  };

  const handleSubmitReservation = async () => {
    if (!reservationSummary) return;

    createReservationMutation.mutate(
      {
        scheduleId: reservationSummary.scheduleId,
        headCount: reservationSummary.headCount,
      },
      {
        onSuccess: (data) => {
          toast({
            title: '예약 완료',
            description: `예약 ID: ${data.id}`,
            type: 'success',
          });
          setReservationSummary(null); // 예약 완료 후 상태 초기화
        },
        onError: (error) => {
          const errorMessage = error instanceof Error ? error.message : '예약 중 오류가 발생했습니다.';
          toast({
            title: '예약 실패',
            description: errorMessage,
            type: 'error',
          });
        },
      },
    );
  };

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
              <ReviewSection activityId={activity.id} />
            </div>
            <div className='sticky top-16 flex h-fit flex-col gap-38'>
              <ActivitiesInformation
                address={activity.address}
                category={activity.category}
                id={id}
                isAuthor={user?.id ? activity?.userId === user.id : false}
                rating={activity.rating}
                reviewCount={activity.reviewCount}
                title={activity.title}
              />
              <ReservationForm
                activityId={activity.id}
                isAuthor={user?.id ? activity?.userId === user.id : false}
                isLoggedIn={!!user}
                price={activity.price}
                schedules={activity.schedules}
              />
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-30'>
            <ActivityImages bannerImageUrl={activity.bannerImageUrl} subImages={activity.subImages} />
            <Divider className='border-gray-200' />
            <ActivitiesInformation
              address={activity.address}
              category={activity.category}
              id={id}
              isAuthor={user?.id ? activity?.userId === user.id : false}
              rating={activity.rating}
              reviewCount={activity.reviewCount}
              title={activity.title}
            />
            <Divider className='border-t border-gray-200' />
            <ActivitiesDescription description={activity.description} />
            <Divider className='border-t border-gray-200' />
            <ActivitiesMap address={activity.address} className='h-415' />
            <Divider className='border-t border-gray-200' />
            <ReviewSection activityId={activity.id} />
          </div>
        )}
      </main>

      {!isDesktop && (
        <>
          <ReservationBottomBar
            isAuthor={user?.id ? activity?.userId === user.id : false}
            isLoggedIn={!!user}
            isSubmitting={createReservationMutation.isPending}
            price={activity.price}
            reservation={
              reservationSummary
                ? {
                    date: reservationSummary.date,
                    startTime: reservationSummary.startTime,
                    endTime: reservationSummary.endTime,
                    headCount: reservationSummary.headCount,
                  }
                : null
            }
            onReserve={handleSubmitReservation}
            onSelectDate={() => {
              if (isMobile) setIsMobileSheetOpen(true);
              else if (isTablet) setIsTabletSheetOpen(true);
            }}
          />

          {/* 태블릿 바텀시트 */}
          {isTablet && (
            <TabletReservationSheet
              isAuthor={user?.id ? activity?.userId === user.id : false}
              isLoggedIn={!!user}
              isOpen={isTabletSheetOpen}
              price={activity.price}
              schedules={activity.schedules}
              onClose={() => setIsTabletSheetOpen(false)}
              onConfirm={handleConfirmTabletReservation}
            />
          )}

          {/* 모바일 바텀시트 */}
          {isMobile && (
            <MobileReservationSheet
              isAuthor={user?.id ? activity?.userId === user.id : false}
              isLoggedIn={!!user}
              isOpen={isMobileSheetOpen}
              price={activity.price}
              schedules={activity.schedules}
              onClose={() => setIsMobileSheetOpen(false)}
              onConfirm={handleConfirmMobileReservation}
            />
          )}
        </>
      )}
    </>
  );
}

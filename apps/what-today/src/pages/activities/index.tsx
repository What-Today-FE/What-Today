import KakaoMap from '@components/map';
import { Button } from '@what-today/design-system';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { twJoin } from 'tailwind-merge';

import axiosInstance from '@/apis/axiosInstance';
import { useResponsive } from '@/hooks/useResponsive';

type SubImage = {
  id: number;
  imageUrl: string;
};

type Schedule = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
};

type ActivityDetail = {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  subImages: SubImage[];
  schedules: Schedule[];
};

export default function ActivityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<ActivityDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const screenSize = useResponsive();
  const isMobile = screenSize === 'sm';
  const isTablet = screenSize === 'md';
  const isDesktop = screenSize === 'lg';

  const bottomOffset = !isDesktop ? 'pb-140' : 'pb-0';

  useEffect(() => {
    if (!id) return;

    const fetchActivity = async () => {
      try {
        const res = await axiosInstance.get(`/activities/${id}`);
        setActivity(res.data);
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
              <section className='flex h-400 items-center justify-center rounded-xl bg-red-100 text-xl font-bold'>
                {/* 1. 체험 이미지 */}
                <img
                  alt={activity.title}
                  className='h-full w-full rounded-xl object-cover'
                  src={activity.bannerImageUrl}
                />
              </section>
              <section className='flex h-300 flex-col items-center justify-center rounded-xl bg-yellow-100 text-xl font-bold'>
                {/* 2. 체험 설명 */}
                <div className='text-2xl font-bold'>체험 설명</div>
                <p className='text-lg'>{activity.description}</p>
              </section>
              <div className='rounded-3xl border-t border-gray-100' />
              <section className='flex h-511 flex-col items-center justify-center rounded-xl bg-green-100 text-xl font-bold'>
                {/* 3. 오시는 길 */}
                <div className='text-2xl font-bold'>오시는 길</div>
                <div className='text-md font-semibold'>{activity.address}</div>
                <KakaoMap address={activity.address} />
              </section>
              <div className='rounded-3xl border-b border-gray-100' />
              <section className='flex h-830 items-center justify-center rounded-xl bg-blue-100 text-xl font-bold'>
                4. 후기(평점, 후기 박스 포함) api 수정 후 반영 예정
              </section>
            </div>
            <div className='sticky top-16 flex h-fit flex-col gap-38'>
              <section className='flex h-120 flex-col items-center justify-center rounded-xl bg-purple-100 text-xl font-bold'>
                {/* 5. 체험 정보 박스 */}
                <p className='text-md'>{activity.category}</p>
                <p className='text-2xl font-bold'>{activity.title}</p>
                <p className='text-md'>{`${activity.rating} (${activity.reviewCount})`}</p>
                <p className='text-md'>{activity.address}</p>
              </section>
              <section className='flex h-856 items-center justify-center rounded-xl bg-pink-100 text-xl font-bold'>
                6. 예약 선택(내부 컴포넌트 높이에 맞출 예정)
              </section>
            </div>
          </div>
        ) : (
          <div className={twJoin('flex flex-col gap-30', bottomOffset)}>
            <section className='flex h-400 items-center justify-center rounded-xl bg-red-100 text-xl font-bold'>
              {/* 1. 체험 이미지 */}
              <img
                alt={activity.title}
                className='h-full w-full rounded-xl object-cover'
                src={activity.bannerImageUrl}
              />
            </section>
            <div className='rounded-3xl border-t border-gray-200' />
            <section className='flex h-140 flex-col items-center justify-center rounded-xl bg-purple-100 text-xl font-bold'>
              {/* 5. 체험 정보 박스 */}
              <p className='text-md'>{activity.category}</p>
              <p className='text-2xl font-bold'>{activity.title}</p>
              <p className='text-md'>{`${activity.rating} (${activity.reviewCount})`}</p>
              <p className='text-md'>{activity.address}</p>
            </section>
            <div className='rounded-3xl border-t border-gray-200' />
            <section className='flex h-280 flex-col items-center justify-center rounded-xl bg-yellow-100 text-xl font-bold'>
              {/* 2. 체험 설명 */}
              <div className='text-2xl font-bold'>체험 설명</div>
              <p className='text-lg'>{activity.description}</p>
            </section>
            <div className='rounded-3xl border-t border-gray-200' />
            <section className='flex h-415 flex-col items-center justify-center rounded-xl bg-green-100 text-xl font-bold'>
              {/* 3. 오시는 길 */}
              <div className='text-2xl font-bold'>오시는 길</div>
              <div className='text-md font-semibold'>{activity.address}</div>
              <KakaoMap address={activity.address} />
            </section>
            <div className='rounded-3xl border-t border-gray-200' />
            <section className='flex h-830 items-center justify-center rounded-xl bg-blue-100 text-xl font-bold'>
              4. 후기(평점, 후기 박스 포함) api 수정 후 반영 예정
            </section>
          </div>
        )}
      </main>

      {!isDesktop && (
        <div className='fixed bottom-0 left-0 z-50 w-full border-t border-[#E6E6E6] bg-white px-48 pt-18 pb-18 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]'>
          {/* 금액 + 날짜 선택 묶음 */}
          <div className='mb-12 flex items-center justify-between'>
            <p className='text-2lg font-bold'>
              ₩ {activity.price.toLocaleString()} <span className='text-lg font-normal'>/ 1명</span>
            </p>
            <button
              className='text-primary-500 px-0 text-lg font-bold underline'
              onClick={() => {
                if (isMobile) alert('모바일 바텀시트 클릭');
                else if (isTablet) alert('태블릿 바텀시트 클릭');
              }}
            >
              날짜 선택하기
            </button>
          </div>

          {/* 예약하기 버튼 */}
          <Button disabled className='w-full' size='lg' variant='fill'>
            예약하기
          </Button>
        </div>
      )}
    </>
  );
}

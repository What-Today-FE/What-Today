import { Button, ChevronIcon, ExperienceCard, NoResult } from '@what-today/design-system';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useInfiniteMyActivitiesQuery } from '@/hooks/useMyActivitiesQuery';

export default function ManageActivitiesPage() {
  const navigate = useNavigate();

  // const { data, isLoading, isError, error } = useQuery<myActivitiesResponse>({
  //   queryKey: ['myActivities', { size: 10 }],
  //   queryFn: () => getMyActivities({ size: 10 }),
  // });

  // const [data, setData] = useState<myActivitiesResponse | null>(null);
  // const [loading, setLoading] = useState(true);

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteMyActivitiesQuery(3);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const allActivities = data?.pages.flatMap((page) => page.activities) ?? [];

  const handleNavigateToMypage = () => {
    navigate('/mypage');
  };

  let content;
  if (isLoading) {
    content = <div className='flex justify-center p-40 text-gray-500'>로딩 중...</div>;
  } else if (isError) {
    content = <div className='flex justify-center p-40 text-red-500'>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  } else if (allActivities.length === 0) {
    content = (
      <div className='flex justify-center p-40'>
        <NoResult dataName='등록한 체험이' />
      </div>
    );
  } else {
    content = (
      <>
        {allActivities.map(({ id, title, price, bannerImageUrl, rating, reviewCount }) => (
          <ExperienceCard
            key={id}
            bannerImageUrl={bannerImageUrl}
            price={price}
            rating={rating}
            reviewCount={reviewCount}
            title={title}
            onDelete={() => navigate('/')}
            onEdit={() => navigate('/')}
          />
        ))}
        <div ref={observerRef} />
        {isFetchingNextPage && <div className='text-center text-gray-400'>체험목록 불러오는 중...</div>}
      </>
    );
  }

  return (
    <div className='flex flex-col gap-13 md:gap-30'>
      <header className='flex flex-col gap-10'>
        <div className='flex items-center gap-4 border-b border-b-gray-50 pb-20'>
          <Button className='h-fit w-fit' variant='none' onClick={handleNavigateToMypage}>
            <ChevronIcon color='var(--color-gray-300)' direction='left' />
          </Button>
          <h1 className='text-xl font-bold text-gray-950'>내 체험 관리</h1>
        </div>
        <div className='flex flex-col justify-between gap-10 pt-10 md:flex-row'>
          <p className='text-md font-medium text-gray-500'>체험을 등록하거나 수정 및 삭제가 가능합니다.</p>
          <Button className='w-full md:w-138' onClick={() => navigate('/')}>
            체험 등록하기
          </Button>
        </div>
      </header>
      <section aria-label='체험 카드 목록' className='flex flex-col gap-30 xl:gap-24'>
        {content}
      </section>
    </div>
  );
}

import { Button, ChevronIcon, ExperienceCard, NoResult } from '@what-today/design-system';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getMyActivities } from '@/apis/myActivities';
import type { myActivitiesResponse } from '@/schemas/myActivities';

export default function ManageActivitiesPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<myActivitiesResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const handleNavigateToMypage = () => {
    navigate('/mypage');
  };

  const fetchMyActivities = async () => {
    try {
      const result = await getMyActivities({ size: 10 });
      setData(result);
    } catch (err) {
      console.error('내 체험 조회 실패:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMyActivities();
  }, []);

  let content;
  if (loading) {
    content = <div className='flex justify-center p-40 text-gray-500'>로딩 중...</div>;
  } else if (data && data.activities.length > 0) {
    content = data.activities.map(({ id, title, price, bannerImageUrl, rating, reviewCount }) => {
      return (
        <ExperienceCard
          key={id}
          bannerImageUrl={bannerImageUrl}
          price={price}
          rating={rating}
          reviewCount={reviewCount}
          title={title}
          // 추후 삭제알림 모달창 뜨는 것으로 수정 예정
          onDelete={() => navigate('/')}
          // 추후 체험등록 페이지로 수정 예정
          onEdit={() => navigate(`/experiences/create/${id}`)}
        />
      );
    });
  } else {
    content = (
      <div className='flex justify-center p-40'>
        <NoResult dataName='등록한 체험이' />
      </div>
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
          <Button className='w-full md:w-138' onClick={() => navigate('/experiences/create')}>
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

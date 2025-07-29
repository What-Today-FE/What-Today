import { Button, ChevronIcon, ExperienceCard, Modal, NoResult, WarningLogo } from '@what-today/design-system';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteMyActivityMutation, useInfiniteMyActivitiesQuery } from '@/hooks/useMyActivitiesQuery';

export default function ManageActivitiesPage() {
  const navigate = useNavigate();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteMyActivitiesQuery(3);
  const { mutate: deleteActivity } = useDeleteMyActivityMutation();

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

  const handleDelete = (activityId: number) => {
    deleteActivity(activityId);
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
            onDelete={() => {
              setDeleteTargetId(id);
              setIsDeleteOpen(true);
            }}
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
      <Modal.Root open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <Modal.Content className='flex max-w-300 flex-col items-center gap-6 text-center md:max-w-350 lg:max-w-400'>
          <div className='flex flex-col items-center gap-6 text-center'>
            <WarningLogo className='md:size-110 lg:size-150' size={88} />
            <p className='text-2lg font-bold'>체험을 삭제하시겠습니까?</p>
          </div>
          <Modal.Actions>
            <Modal.CancelButton>아니요</Modal.CancelButton>
            <Modal.ConfirmButton
              onClick={() => {
                if (deleteTargetId !== null) {
                  deleteActivity(deleteTargetId);
                  setIsDeleteOpen(false);
                }
              }}
            >
              네
            </Modal.ConfirmButton>
          </Modal.Actions>
        </Modal.Content>
      </Modal.Root>
    </div>
  );
}

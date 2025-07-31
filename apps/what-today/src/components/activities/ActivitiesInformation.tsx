import { Dropdown, LocationIcon, Modal, StarIcon, useToast, WarningLogo } from '@what-today/design-system';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { useDeleteMyActivityMutation } from '@/hooks/useMyActivitiesQuery';

interface ActivitiesInformationProps {
  category: string;
  title: string;
  rating: number;
  reviewCount: number;
  address: string;
  className?: string;
  id?: string;
  isAuthor: boolean;
}

/**
 * @description 체험 상세 페이지 상단의 체험 정보 요약 박스 컴포넌트입니다.
 */
export default function ActivitiesInformation({
  id,
  category,
  title,
  rating,
  reviewCount,
  address,
  className,
  isAuthor,
}: ActivitiesInformationProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { mutate: deleteActivity } = useDeleteMyActivityMutation();

  const handleDeleteConfirm = () => {
    if (id && !isNaN(Number(id))) {
      deleteActivity(Number(id), {
        onSuccess: () => {
          setIsDeleteOpen(false);
          navigate('/');
        },
        onError: (error) => {
          const errorMessage = error instanceof Error ? error.message : '삭제 중 오류가 발생했습니다.';
          toast({
            title: '삭제 실패',
            description: errorMessage,
            type: 'error',
          });
        },
      });
    }
  };

  return (
    <>
      <section className={twMerge('flex h-fit w-full flex-col items-start gap-8', className)}>
        <div className='flex w-full items-center justify-between'>
          <p className='text-md text-gray-950'>{category}</p>
          {isAuthor && (
            <Dropdown.Root>
              <Dropdown.Trigger />
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate(`/experiences/create/${id}`)}>수정하기</Dropdown.Item>
                <Dropdown.Item onClick={() => setIsDeleteOpen(true)}>삭제하기</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Root>
          )}
        </div>
        <p className='text-2xl font-bold'>{title}</p>
        <div className='mt-9 flex items-center gap-6 text-base text-gray-700'>
          <StarIcon filled />
          <span>
            {rating.toFixed(1)} ({reviewCount})
          </span>
        </div>
        <div className='mt-2 ml-2 flex items-center gap-4 text-base text-gray-700'>
          <LocationIcon />
          <span>{address}</span>
        </div>
      </section>
      <Modal.Root open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <Modal.Content className='flex max-w-300 flex-col items-center gap-6 text-center md:max-w-350 lg:max-w-400'>
          <div className='flex flex-col items-center gap-6 text-center'>
            <WarningLogo className='md:size-110 lg:size-150' size={88} />
            <p className='text-2lg font-bold'>체험을 삭제하시겠습니까?</p>
          </div>
          <Modal.Actions>
            <Modal.CancelButton>아니요</Modal.CancelButton>
            <Modal.ConfirmButton onClick={handleDeleteConfirm}>네</Modal.ConfirmButton>
          </Modal.Actions>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}

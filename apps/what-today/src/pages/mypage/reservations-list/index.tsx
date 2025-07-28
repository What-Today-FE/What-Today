import { Button, Input, Modal, NoResult, RadioGroup, ReservationCard, StarRating } from '@what-today/design-system';
import { WarningLogo } from '@what-today/design-system';
import { useToast } from '@what-today/design-system';
import { useEffect, useState } from 'react';
import { twJoin } from 'tailwind-merge';

import { cancelMyReservation, createReview, fetchMyReservations } from '@/apis/myReservations';
import type { Reservation } from '@/schemas/myReservations';

export default function ReservationsListPage() {
  const { toast } = useToast();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const [cancelTarget, setCancelTarget] = useState<Reservation | null>(null);
  const isDeleteOpen = cancelTarget !== null;

  const [reviewTarget, setReviewTarget] = useState<Reservation | null>(null);
  const isReviewOpen = reviewTarget !== null;

  const [reviewContent, setReviewContent] = useState('');
  const [starRating, setStarRating] = useState(0);
  const isReviewValid = starRating > 0 && reviewContent.trim().length > 0;

  const fetchReservations = async (status?: string) => {
    setLoading(true);
    try {
      const result = await fetchMyReservations({
        size: 10,
        status: status || undefined,
      });
      setReservations(result.reservations);
    } catch (err) {
      console.error('예약 목록 조회 실패:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReservations(selectedStatus || undefined);
  }, [selectedStatus]);

  const handleConfirmCancel = async () => {
    if (!cancelTarget) return;

    try {
      await cancelMyReservation(cancelTarget.id, { status: 'canceled' });
      toast({
        title: '예약 취소 완료',
        description: `예약 '${cancelTarget.activity.title}'이(가) 취소되었습니다.`,
        type: 'success',
      });
      setCancelTarget(null);
      fetchReservations(selectedStatus || undefined); // 목록 갱신
    } catch (error) {
      const message =
        error instanceof Error ? error.message : `예약 '${cancelTarget.activity.title}'이(가) 취소되지 않았습니다.`;
      toast({
        title: '예약 취소 실패',
        description: message,
        type: 'error',
      });
    }
  };

  const handleConfirmReview = async () => {
    if (!reviewTarget) return;

    const body = {
      rating: starRating,
      content: reviewContent,
    };

    try {
      await createReview(reviewTarget.id, body);

      toast({
        title: '후기 작성 완료',
        description: `'${reviewTarget.activity.title}'에 대한 후기가 등록되었습니다.`,
        type: 'success',
      });

      setStarRating(0);
      setReviewContent('');
      setReviewTarget(null);

      fetchReservations(selectedStatus || undefined); // 목록 새로고침
    } catch (error) {
      const message = error instanceof Error ? error.message : '후기 작성에 실패했습니다. 다시 시도해주세요.';

      toast({
        title: '후기 작성 실패',
        description: message,
        type: 'error',
      });
    }
  };

  const renderGroupedReservations = (items: Reservation[]) => {
    // 날짜별로 예약들을 그룹핑합니다. (예: '2025-07-25': [예약1, 예약2])
    const grouped = items.reduce<Record<string, Reservation[]>>((acc, cur) => {
      const date = cur.date;
      if (!acc[date]) acc[date] = [];
      acc[date].push(cur);
      return acc;
    }, {});

    // 날짜 기준으로 내림차순 정렬 (최근 날짜가 먼저)
    const sortedByDateDesc = Object.entries(grouped).sort(([dateA], [dateB]) => {
      const shouldSwap = dateA < dateB;
      return shouldSwap ? 1 : -1;
    });

    return sortedByDateDesc.map(([date, group], index) => (
      <section key={date} className={twJoin('space-y-12 pt-20 pb-30', index !== 0 && 'border-t border-gray-50')}>
        {/* 날짜 헤더 */}
        <h3 className='text-lg font-bold text-gray-800'>{date}</h3>
        <ul>
          {group.map((res) => {
            const showCancelButton = res.status === 'confirmed';
            const showReviewButton = res.status === 'completed' && res.reviewSubmitted === false;

            return (
              <li key={res.id}>
                <ReservationCard
                  bannerImageUrl={res.activity.bannerImageUrl}
                  endTime={res.endTime}
                  headCount={res.headCount}
                  startTime={res.startTime}
                  status={res.status}
                  title={res.activity.title}
                  totalPrice={res.totalPrice}
                />

                {(showCancelButton || showReviewButton) && (
                  <div className='mt-12 flex gap-12'>
                    {showCancelButton && (
                      <Button
                        className='text-md w-full bg-gray-50 font-medium text-gray-600'
                        size='md'
                        variant='fill'
                        onClick={() => {
                          setCancelTarget(res);
                        }}
                      >
                        예약 취소
                      </Button>
                    )}
                    {showReviewButton && (
                      <Button
                        className='text-md w-full font-medium text-white'
                        size='md'
                        variant='fill'
                        onClick={() => {
                          setReviewTarget(res);
                        }}
                      >
                        후기 작성
                      </Button>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    ));
  };

  let content;
  if (loading) {
    content = <div className='flex justify-center p-40 text-gray-500'>로딩 중...</div>;
  } else if (reservations.length > 0) {
    content = <div className='space-y-10'>{renderGroupedReservations(reservations)}</div>;
  } else {
    content = (
      <div className='flex justify-center p-40'>
        <NoResult dataName='예약한 체험이' />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-13 md:gap-20'>
      <header className='flex flex-col justify-between gap-14 py-1 md:flex-row md:items-center'>
        <div className='flex flex-col gap-10'>
          <h1 className='text-2lg font-bold text-gray-950'>예약내역</h1>
          <p className='text-md font-medium text-gray-500'>예약내역 변경 및 취소할 수 있습니다.</p>
        </div>
      </header>

      <section className='mb-10'>
        <RadioGroup
          radioGroupClassName='gap-6'
          selectedValue={selectedStatus}
          titleClassName='text-lg font-semibold mb-2'
          onSelect={(value) => setSelectedStatus(String(value))}
        >
          <div className='flex flex-wrap gap-6'>
            <RadioGroup.Radio value='pending'>예약 대기</RadioGroup.Radio>
            <RadioGroup.Radio value='confirmed'>예약 승인</RadioGroup.Radio>
            <RadioGroup.Radio value='declined'>예약 거절</RadioGroup.Radio>
            <RadioGroup.Radio value='canceled'>예약 취소</RadioGroup.Radio>
            <RadioGroup.Radio value='completed'>체험 완료</RadioGroup.Radio>
          </div>
        </RadioGroup>
      </section>

      <section aria-label='예약 카드 목록' className='flex flex-col gap-30 xl:gap-24'>
        {content}
      </section>

      {/* 예약 취소 확인 모달 */}
      <Modal.Root open={isDeleteOpen} onClose={() => setCancelTarget(null)}>
        <Modal.Content className='flex max-w-300 flex-col items-center gap-6 text-center md:max-w-350 lg:max-w-400'>
          <div className='flex flex-col items-center gap-6 text-center'>
            <WarningLogo className='md:size-110 lg:size-150' size={88} />
            <p className='text-2lg font-bold'>예약을 취소하시겠어요?</p>
          </div>
          <Modal.Actions>
            <Modal.CancelButton>아니요</Modal.CancelButton>
            <Modal.ConfirmButton onClick={handleConfirmCancel}>취소하기</Modal.ConfirmButton>
          </Modal.Actions>
        </Modal.Content>
      </Modal.Root>

      <Modal.Root open={isReviewOpen} onClose={() => setReviewTarget(null)}>
        {reviewTarget && (
          <Modal.Content className='flex max-w-385 flex-col items-center gap-6 text-center'>
            <Modal.CloseButton />
            <h2 className='mt-22 text-lg font-bold'>{reviewTarget.activity.title}</h2>
            <p className='text-md text-gray-500'>
              {reviewTarget.date}/ {reviewTarget.startTime} ~ {reviewTarget.endTime} ({reviewTarget.headCount}명)
            </p>

            {/* 별점 선택 영역 */}
            <div className='flex flex-row items-center gap-16'>
              <StarRating value={starRating} onChange={setStarRating} />
            </div>

            {/* 텍스트 입력 영역 */}
            <Input.Root size='xs'>
              <Input.Label className='mt-24 mb-16 self-start text-left font-bold'>소중한 경험을 들려주세요</Input.Label>
              <Input.Wrapper className='shadow-sm'>
                <Input.Textarea
                  className='h-180'
                  maxLength={100}
                  placeholder='체험에서 느낀 경험을 자유롭게 남겨주세요.'
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                />
              </Input.Wrapper>
              <Input.TextCounter length={reviewContent.length} maxLength={100} />
            </Input.Root>

            <Modal.Actions>
              <Modal.ConfirmButton disabled={!isReviewValid} onClick={handleConfirmReview}>
                작성하기
              </Modal.ConfirmButton>
            </Modal.Actions>
          </Modal.Content>
        )}
      </Modal.Root>
    </div>
  );
}

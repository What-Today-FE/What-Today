import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  ChevronIcon,
  Input,
  Modal,
  NoResult,
  RadioGroup,
  ReservationCard,
  StarRating,
} from '@what-today/design-system';
import { WarningLogo } from '@what-today/design-system';
import { useToast } from '@what-today/design-system';
import { motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { twJoin } from 'tailwind-merge';

import { cancelMyReservation, createReview, fetchMyReservations } from '@/apis/myReservations';
import { ReservationCardSkeleton, ReservationsListPageSkeleton } from '@/components/skeletons';
import type { MyReservationsResponse, Reservation, ReservationStatus } from '@/schemas/myReservations';

// 필터링 가능한 상태 타입 (전체 상태 + 빈 문자열)
type FilterStatus = ReservationStatus | '';

// 예약 상태별 NoResult 메시지 상수 (컴포넌트 외부에 정의하여 최적화)
const NO_RESULT_MESSAGES: Record<FilterStatus, string> = {
  '': '예약한 체험이',
  pending: '대기 중인 예약이',
  confirmed: '승인된 예약이',
  declined: '거절된 예약이',
  canceled: '취소된 예약이',
  completed: '완료된 체험이',
};

export default function ReservationsListPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [selectedStatus, setSelectedStatus] = useState<FilterStatus>('');

  const [cancelTarget, setCancelTarget] = useState<Reservation | null>(null);
  const isDeleteOpen = cancelTarget !== null;

  const [reviewTarget, setReviewTarget] = useState<Reservation | null>(null);
  const isReviewOpen = reviewTarget !== null;

  const [reviewContent, setReviewContent] = useState('');
  const [starRating, setStarRating] = useState(0);
  const isReviewValid = starRating > 0 && reviewContent.trim().length > 0;

  // 🎯 수동 페이지네이션 상태 관리
  const [allReservations, setAllReservations] = useState<Reservation[]>([]);
  const [currentCursor, setCurrentCursor] = useState<number | null>(null);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const pageSize = 10;

  // 🎯 첫 페이지 로드 (일반 useQuery 사용)
  const { data: firstPageData, isLoading } = useQuery<MyReservationsResponse>({
    queryKey: ['reservations', selectedStatus],
    queryFn: () =>
      fetchMyReservations({
        cursorId: null,
        size: pageSize,
        status: selectedStatus ? (selectedStatus as ReservationStatus) : null,
      }),
    staleTime: 1000 * 30,
  });

  // 🎯 첫 페이지 데이터가 로드되면 상태 업데이트 (중복 제거 포함)
  useEffect(() => {
    if (firstPageData) {
      const reservations = firstPageData.reservations || [];
      // 🎯 id + scheduleId 조합으로 중복 체크
      const uniqueReservations = reservations.filter(
        (res, index, arr) =>
          arr.findIndex((r) => `${r.id}_${r.scheduleId}` === `${res.id}_${res.scheduleId}`) === index,
      );
      setAllReservations(uniqueReservations);
      setCurrentCursor(firstPageData.cursorId);
      setHasMoreData(!!firstPageData.cursorId);
    }
  }, [firstPageData]);

  // 🎯 선택된 상태가 변경되면 리셋
  useEffect(() => {
    setAllReservations([]);
    setCurrentCursor(null);
    setHasMoreData(true);
  }, [selectedStatus]);

  // 🎯 수동 다음 페이지 로드 함수
  const loadMoreData = useCallback(async () => {
    if (!hasMoreData || isFetchingMore) return;

    setIsFetchingMore(true);
    try {
      const nextPageData = await fetchMyReservations({
        cursorId: currentCursor,
        size: pageSize,
        status: selectedStatus ? (selectedStatus as ReservationStatus) : null,
      });

      // 🎯 id + scheduleId 조합으로 중복 체크
      setAllReservations((prev) => {
        const newReservations = nextPageData.reservations || [];
        const existingKeys = new Set(prev.map((r) => `${r.id}_${r.scheduleId}`));
        const uniqueNewReservations = newReservations.filter((r) => !existingKeys.has(`${r.id}_${r.scheduleId}`));
        return [...prev, ...uniqueNewReservations];
      });
      setCurrentCursor(nextPageData.cursorId);
      setHasMoreData(!!nextPageData.cursorId);
    } catch (error) {
      toast({
        title: '데이터 로드 실패',
        description: error instanceof Error ? error.message : '더 많은 데이터를 불러오는 중 오류가 발생했습니다.',
        type: 'error',
      });
    } finally {
      setIsFetchingMore(false);
    }
  }, [hasMoreData, isFetchingMore, currentCursor, pageSize, selectedStatus, toast]);

  const noResultMessage = NO_RESULT_MESSAGES[selectedStatus];

  // 리뷰 모달 닫기 핸들러
  const handleCloseReviewModal = () => {
    setReviewTarget(null);
    setReviewContent('');
    setStarRating(0);
  };

  // 🎯 자체 무한스크롤 observer 구현 (수동 페이지네이션용)
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = observerRef.current;
    if (!target || isFetchingMore || !hasMoreData) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreData();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [loadMoreData, hasMoreData, isFetchingMore]);

  const cancelReservation = useMutation({
    mutationFn: (id: number) => cancelMyReservation(id, { status: 'canceled' }),
    onSuccess: () => {
      toast({
        title: '예약 취소 완료',
        description: '예약이 성공적으로 취소되었습니다.',
        type: 'success',
      });
      setCancelTarget(null);
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
    onError: (error) => {
      toast({
        title: '예약 취소 실패',
        description: error instanceof Error ? error.message : '예약 취소 중 오류가 발생했습니다.',
        type: 'error',
      });
    },
  });

  const submitReview = useMutation({
    mutationFn: ({ id, rating, content }: { id: number; rating: number; content: string }) =>
      createReview(id, { rating, content }),
    onSuccess: () => {
      toast({
        title: '후기 작성 완료',
        description: '소중한 후기가 등록되었습니다.',
        type: 'success',
      });
      setReviewTarget(null);
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
    onError: (error) => {
      toast({
        title: '후기 작성 실패',
        description: error instanceof Error ? error.message : '후기 작성 중 문제가 발생했습니다.',
        type: 'error',
      });
    },
  });

  const renderGroupedReservations = (items: Reservation[]) => {
    // 날짜별로 예약들을 그룹핑합니다. (예: '2025-07-25': [예약1, 예약2])
    const grouped = items.reduce<Record<string, Reservation[]>>((acc, cur) => {
      const date = cur.date;
      if (!acc[date]) acc[date] = [];
      acc[date].push(cur);
      return acc;
    }, {});

    // 🎯 날짜별 그룹핑만 하고 정렬 제거 (자연스러운 순서 유지)
    return Object.entries(grouped).map(([date, group], index) => (
      <motion.section
        key={date}
        className={twJoin('space-y-12 pt-20 pb-30', index !== 0 && 'border-t border-gray-50')}
        initial={{ opacity: 0, y: 80 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.2 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h3 className='section-text'>{date}</h3>
        <ul>
          {group.map((res) => {
            const showCancelButton = res.status === 'pending';
            const showReviewButton = res.status === 'completed' && !res.reviewSubmitted;
            const showReviewCompletedButton = res.status === 'completed' && res.reviewSubmitted;

            return (
              <li key={res.id} className='mb-24'>
                <ReservationCard
                  bannerImageUrl={res.activity.bannerImageUrl}
                  endTime={res.endTime}
                  headCount={res.headCount}
                  startTime={res.startTime}
                  status={res.status}
                  title={res.activity.title}
                  totalPrice={res.totalPrice}
                  onClick={() => navigate(`/activities/${res.activity.id}`)}
                />

                {(showCancelButton || showReviewButton || showReviewCompletedButton) && (
                  <div className='mt-8 mb-24'>
                    {showCancelButton && (
                      <Button
                        className='caption-text w-full bg-gray-50 text-gray-400'
                        size='md'
                        variant='fill'
                        onClick={() => setCancelTarget(res)}
                      >
                        예약 취소
                      </Button>
                    )}
                    {showReviewButton && (
                      <Button
                        className='caption-text w-full'
                        size='md'
                        variant='fill'
                        onClick={() => setReviewTarget(res)}
                      >
                        후기 작성
                      </Button>
                    )}
                    {showReviewCompletedButton && (
                      <Button disabled className='caption-text w-full' size='md' variant='fill'>
                        후기 작성 완료
                      </Button>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </motion.section>
    ));
  };

  let content;
  if (isLoading) {
    content = <ReservationsListPageSkeleton />;
  } else if (allReservations.length > 0) {
    content = <div className='space-y-10'>{renderGroupedReservations(allReservations)}</div>;
  } else {
    content = (
      <div className='flex justify-center p-40'>
        <NoResult dataName={noResultMessage} />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-13 md:gap-20'>
      <header className='mb-16 flex flex-col gap-12'>
        <div className='flex items-center gap-4 border-b border-b-gray-50 pb-8 md:pb-12'>
          <Button className='w-30 p-0' size='sm' variant='none' onClick={() => navigate('/mypage')}>
            <ChevronIcon color='var(--color-gray-300)' direction='left' />
          </Button>
          <h1 className='subtitle-text'>예약 내역</h1>
        </div>
        <p className='body-text text-gray-400 md:pt-10'>예약내역 변경 및 취소할 수 있습니다.</p>
      </header>

      <section className='mb-10 overflow-x-hidden'>
        <RadioGroup
          radioGroupClassName='flex flex-nowrap gap-6 overflow-x-auto no-scrollbar'
          selectedValue={selectedStatus}
          onSelect={(value) => setSelectedStatus(value as FilterStatus)}
        >
          <RadioGroup.Radio value='pending'>예약 대기</RadioGroup.Radio>
          <RadioGroup.Radio value='confirmed'>예약 승인</RadioGroup.Radio>
          <RadioGroup.Radio value='declined'>예약 거절</RadioGroup.Radio>
          <RadioGroup.Radio value='canceled'>예약 취소</RadioGroup.Radio>
          <RadioGroup.Radio value='completed'>체험 완료</RadioGroup.Radio>
        </RadioGroup>
      </section>

      <section aria-label='예약 카드 목록' className='flex flex-col gap-30 xl:gap-24'>
        {content}
        <div ref={observerRef} className='h-4' />

        {/* 무한스크롤 로딩 중 스켈레톤 */}
        {isFetchingMore && (
          <div>
            <ReservationCardSkeleton />
            <ReservationCardSkeleton />
          </div>
        )}
      </section>

      {/* 예약 취소 확인 모달 */}
      <Modal.Root open={isDeleteOpen} onClose={() => setCancelTarget(null)}>
        <Modal.Content className='flex max-w-300 flex-col items-center gap-6 text-center md:max-w-350 lg:max-w-400'>
          <div className='flex flex-col items-center gap-10 text-center'>
            <WarningLogo className='md:size-110 lg:size-150' size={88} />
            <p className='section-text'>예약을 취소하시겠어요?</p>
          </div>
          <Modal.Actions className='w-full'>
            <Modal.CancelButton className='w-full px-0'>아니요</Modal.CancelButton>
            <Modal.ConfirmButton
              className='w-full px-0'
              onClick={() => cancelTarget && cancelReservation.mutate(cancelTarget.id)}
            >
              취소하기
            </Modal.ConfirmButton>
          </Modal.Actions>
        </Modal.Content>
      </Modal.Root>

      <Modal.Root open={isReviewOpen} onClose={handleCloseReviewModal}>
        {reviewTarget && (
          <Modal.Content className='flex max-w-385 flex-col items-center gap-6 text-center'>
            <Modal.CloseButton />
            <h2 className='section-text mt-22 font-bold'>{reviewTarget.activity.title}</h2>
            <p className='caption-text mb-6 text-gray-400'>
              {reviewTarget.date}/ {reviewTarget.startTime} ~ {reviewTarget.endTime} ({reviewTarget.headCount}명)
            </p>

            {/* 별점 선택 영역 */}
            <div className='flex flex-row items-center gap-16'>
              <StarRating value={starRating} onChange={setStarRating} />
            </div>

            {/* 텍스트 입력 영역 */}
            <Input.Root size='xs'>
              <Input.Label className='body-text mt-24 mb-12 self-start text-left font-bold'>
                소중한 경험을 들려주세요
              </Input.Label>
              <Input.Wrapper className='shadow-sm'>
                <Input.Textarea
                  className='h-140'
                  maxLength={100}
                  placeholder='체험에서 느낀 경험을 자유롭게 남겨주세요.'
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                />
              </Input.Wrapper>
              <Input.TextCounter length={reviewContent.length} maxLength={100} />
            </Input.Root>

            <Modal.Actions>
              <Modal.ConfirmButton
                disabled={!isReviewValid}
                onClick={() =>
                  reviewTarget &&
                  submitReview.mutate({
                    id: reviewTarget.id,
                    content: reviewContent,
                    rating: starRating,
                  })
                }
              >
                작성하기
              </Modal.ConfirmButton>
            </Modal.Actions>
          </Modal.Content>
        )}
      </Modal.Root>
    </div>
  );
}

import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  BellIcon,
  Button,
  NotificationCard,
  NotificationCardSkeleton,
  Popover,
  useToast,
} from '@what-today/design-system';
import type { AxiosError } from 'axios';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteMyNotifications } from '@/apis/myNotifications';
import { getMyNotifications } from '@/apis/myNotifications';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import type { NotificationsResponse } from '@/schemas/myNotifications';

interface NotificationPopoverProps {
  isMobile: boolean;
}

export default function NotificationPopover({ isMobile }: NotificationPopoverProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  /**
   * @function fetchNotifications
   * @description 무한 스크롤을 위한 알림 데이터를 요청합니다.
   * - `cursorId`를 기반으로 다음 페이지의 알림 목록을 받아오며,
   * - 빈 배열이나 cursorId가 null이면 더 이상 불러올 페이지가 없다고 판단합니다.
   *
   * @param {number | null} cursorId - 마지막으로 불러온 알림 ID (페이지네이션 기준값)
   * @returns {Promise<NotificationsResponse>} 알림 목록, 커서 ID, 전체 알림 개수를 포함한 응답 객체
   */
  const fetchNotifications = async ({ cursorId }: { cursorId: number | null }): Promise<NotificationsResponse> => {
    const params = {
      size: 10,
      cursorId: cursorId || null,
    };

    const response = await getMyNotifications(params);

    return {
      notifications: response.notifications || [],
      cursorId: response.cursorId,
      totalCount: response.totalCount,
    };
  };

  /**
   * @description 무한 스크롤 기반으로 알림 목록을 불러오는 React Query 훅입니다.
   *
   * @returns {
   *   data: 알림 페이지 데이터 목록
   *   fetchNextPage: 다음 페이지를 불러오는 함수
   *   hasNextPage: 다음 페이지 유무
   *   isFetchingNextPage: 다음 페이지 불러오는 중 여부
   *   isLoading: 초기 로딩 여부
   * }
   */
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery<
    NotificationsResponse,
    Error
  >({
    queryKey: ['notifications'],
    queryFn: ({ pageParam = null }) =>
      fetchNotifications({
        cursorId: pageParam as number | null,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: NotificationsResponse) => {
      if (lastPage.cursorId === null || lastPage.notifications.length === 0) {
        return undefined;
      }
      return lastPage.cursorId;
    },
    staleTime: 30 * 1000,
    enabled: open, // 팝오버가 열렸을 때만 API 요청
  });

  /**
   * @description 내 알림을 삭제하는 mutation 함수입니다.
   *
   * @onSuccess 삭제 성공 시 알림 목록 쿼리 무효화 및 성공 토스트 출력
   * @onError 삭제 실패 시 에러 메시지를 파싱하여 에러 토스트 출력
   */
  const deleteNotification = useMutation({
    mutationFn: deleteMyNotifications,
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message ?? '알 수 없는 오류가 발생했습니다.';
      toast({
        title: '내 알림 삭제 실패',
        description: message,
        type: 'error',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast({
        title: '내 알림 삭제 성공',
        description: '알림 삭제에 성공했습니다.',
        type: 'success',
      });
    },
  });

  const observerRef = useIntersectionObserver(
    fetchNextPage,
    isFetchingNextPage,
    !hasNextPage,
    scrollContainerRef.current,
    open,
  );

  return (
    <Popover.Root direction={isMobile ? 'bottom-center' : 'bottom-right'} open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild className='flex items-center'>
        <Button
          aria-describedby='notification-dot'
          aria-label='알림'
          className='relative flex h-fit w-fit p-0'
          variant='none'
          onClick={() => setOpen((prev) => !prev)}
        >
          {/* <DotIcon
            aria-label='새 알림 있음'
            className='absolute top-2 left-12 size-8'
            color='var(--color-red-500)'
            id='notification-dot'
          /> */}
          <BellIcon className='size-20' color={open ? 'var(--color-primary-500)' : 'var(--color-gray-600)'} />
        </Button>
      </Popover.Trigger>
      <Popover.Content className='mt-8 rounded-2xl border border-gray-100 bg-white p-10 shadow-[0_4px_24px_rgba(156,180,202,0.2)]'>
        <h1 className='my-8 ml-auto px-16 font-bold text-gray-950'>알림 {data?.pages[0].totalCount ?? 0}개</h1>

        <section ref={scrollContainerRef} className='relative max-h-400 w-300 overflow-y-auto'>
          {isLoading && (
            <>
              <NotificationCardSkeleton />
              <NotificationCardSkeleton />
              <NotificationCardSkeleton />
              <NotificationCardSkeleton />
            </>
          )}
          <div className='divide-y divide-gray-50'>
            {data?.pages.map((page) =>
              page.notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  content={notification.content}
                  onClickDetail={() => {
                    navigate('/mypage/reservations-list');
                    setOpen((prev) => !prev);
                  }}
                  onDelete={() => deleteNotification.mutate(notification.id)}
                />
              )),
            )}
          </div>
          {!isLoading && data?.pages.every((page) => page.notifications.length === 0) && (
            <p className='text-md my-70 text-center text-gray-400'>알림이 없습니다.</p>
          )}
          <div ref={observerRef} className='h-6 w-full' /> {/* 무한 스크롤 감지용 */}
          {isFetchingNextPage && <NotificationCardSkeleton />}
        </section>
      </Popover.Content>
    </Popover.Root>
  );
}

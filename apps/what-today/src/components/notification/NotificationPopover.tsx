import { useInfiniteQuery } from '@tanstack/react-query';
import { BellIcon, Button, DotIcon, NotificationCard, Popover } from '@what-today/design-system';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
          <DotIcon
            aria-label='새 알림 있음'
            className='absolute top-2 left-12 size-8'
            color='var(--color-red-500)'
            id='notification-dot'
          />
          <BellIcon className='size-20' color={open ? 'var(--color-primary-500)' : 'var(--color-gray-600)'} />
        </Button>
      </Popover.Trigger>
      <Popover.Content className='mt-8 rounded-2xl border border-gray-100 bg-white p-10 shadow-sm'>
        <h1 className='my-8 ml-auto px-16 font-bold text-gray-950'>알림 {data?.pages[0].totalCount ?? 0}개</h1>

        <div ref={scrollContainerRef} className='relative max-h-400 w-300 overflow-y-scroll'>
          {isLoading && <p className='text-md my-70 text-center text-gray-400'>Loading...</p>}
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
                  onDelete={() => alert(`삭제 API 요청: ${notification.id}`)}
                />
              )),
            )}
          </div>
          {!isLoading && !data?.pages.length && (
            <p className='text-md my-70 text-center text-gray-400'>알림이 없습니다.</p>
          )}
          <div ref={observerRef} className='h-6 w-full' />
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}

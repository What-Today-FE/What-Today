import { BellIcon, Button, DotIcon, NotificationCard, Popover } from '@what-today/design-system';
import { useNavigate } from 'react-router-dom';

interface NotificationPopoverProps {
  isMobile: boolean;
}

export default function NotificationPopover({ isMobile }: NotificationPopoverProps) {
  const navigate = useNavigate();

  return (
    <Popover.Root direction={isMobile ? 'bottom-center' : 'bottom-right'}>
      <Popover.Trigger className='flex items-center'>
        <Button
          aria-describedby='notification-dot'
          aria-label='알림'
          className='relative flex h-fit w-fit p-0'
          variant='none'
        >
          <DotIcon
            aria-label='새 알림 있음'
            className='absolute top-2 left-12 size-8'
            color='var(--color-red-500)'
            id='notification-dot'
          />
          <BellIcon className='size-20' color='var(--color-gray-600)' />
        </Button>
      </Popover.Trigger>
      <Popover.Content className='mt-8 rounded-2xl border border-gray-100 bg-white p-10 shadow-sm'>
        <h1 className='my-8 ml-auto px-16 font-bold'>알림 6개</h1>

        <div className='max-h-400 w-300 divide-y divide-gray-50 overflow-y-scroll'>
          {/* 더미데이터 */}
          <NotificationCard
            content='바람과 함께하는 한강 요가(2025-07-20 07:00~08:00) 예약이 승인되었습니다.'
            onClickDetail={() => navigate('/mypage/reservations-list')}
            onDelete={() => alert('삭제 API 요청')}
          />
          <NotificationCard
            content='전통 다도 체험 클래스(2025-09-12 14:00~15:30) 예약이 승인되었습니다.'
            onClickDetail={() => navigate('/mypage/reservations-list')}
            onDelete={() => alert('삭제 API 요청')}
          />
          <NotificationCard
            content='한강 야외 영화 상영회(2025-07-27 20:00~22:00) 예약이 거절되었습니다.'
            onClickDetail={() => navigate('/mypage/reservations-list')}
            onDelete={() => alert('삭제 API 요청')}
          />
          <NotificationCard
            content='전통 다도 체험 클래스(2025-09-12 14:00~15:30) 예약이 승인되었습니다.'
            onClickDetail={() => navigate('/mypage/reservations-list')}
            onDelete={() => alert('삭제 API 요청')}
          />
          <NotificationCard
            content='한강 야외 영화 상영회(2025-07-27 20:00~22:00) 예약이 거절되었습니다.'
            onClickDetail={() => navigate('/mypage/reservations-list')}
            onDelete={() => alert('삭제 API 요청')}
          />
          <NotificationCard
            content='메시지 파싱에 실패하면 이렇게 보여집니다.'
            onClickDetail={() => navigate('/mypage/reservations-list')}
            onDelete={() => alert('삭제 API 요청')}
          />
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}

import Button from '@components/button';
import { ClockIcon, DeleteIcon, DocumentIcon } from '@components/icons';
import UserBadge from '@components/UserBadge';

interface ParsedNotification {
  title: string;
  date: {
    year: string;
    month: string;
    day: string;
    startTime: string;
    endTime: string;
  };
  confirm: boolean;
}

interface NotificationCardProps {
  content: string;
  onDelete: () => void;
  onClickDetail: () => void;
}

/** parseNotificationContent
 * @description 알림 메시지 string에서 예약 정보를 추출해 객체로 반환하는 함수입니다.
 *
 * @param {string} content - 내 알림 API로 응답받은 메시지 내용 (content)
 * @returns {ParsedNotification | null} 파싱된 예약 정보 객체 또는 형식이 맞지 않을 경우 null
 */
const parseNotificationContent = (content: string): ParsedNotification | null => {
  try {
    const match = content.match(/^(.+?)\((\d{4}-\d{2}-\d{2} \d{2}:\d{2}~\d{2}:\d{2})\)\s*(.+)$/);
    if (!match) return null;

    const [, title, dateTimeStr, statusText] = match;
    const dateTimeMatch = dateTimeStr.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}:\d{2})~(\d{2}:\d{2})$/);
    if (!dateTimeMatch) return null;

    const [_, year, rawMonth, rawDay, startTime, endTime] = dateTimeMatch;
    const month = String(Number(rawMonth));
    const day = String(Number(rawDay));

    return {
      title,
      date: { year, month, day, startTime, endTime },
      confirm: statusText.includes('승인'),
    };
  } catch (error) {
    console.warn('content 파싱에 실패했습니다.:', error);
    return null;
  }
};

/** NotificationCard
 * @description 알림창에서 쓰일 알림 내용 하나의 컴포넌트입니다.
 *
 * @param {string} content - 알림 메시지
 * @param {(id: number) => void} onDelete - 삭제 버튼 클릭 시 실행할 콜백
 * @param {() => void} onClickDetail - 마이페이지-예약 내역으로 이동할 콜백
 */
export default function NotificationCard({ content, onDelete, onClickDetail }: NotificationCardProps) {
  const parsedNotification = parseNotificationContent(content);

  // parsedNotification 실패시 기본 content를 메시지로 보여줍니다.
  if (!parsedNotification) {
    return (
      <div className='text-md flex flex-col gap-4 p-16'>
        <div className='flex items-center justify-between'>
          <h1 className='text-md font-semibold text-gray-900 md:text-lg'>알림</h1>
          <Button className='h-fit w-fit p-0' variant='none' onClick={onDelete}>
            <DeleteIcon className='size-10' color='var(--color-gray-300)' />
          </Button>
        </div>
        <p className='text-gray-600'>{content}</p>
      </div>
    );
  }

  const { title, date, confirm } = parsedNotification;

  return (
    <div className='text-md flex flex-col gap-8 p-16'>
      <div className='flex items-center justify-between'>
        <div className='flex gap-8'>
          {confirm ? <UserBadge status='confirmed' /> : <UserBadge status='declined' />}
          <h1 className='text-md font-semibold text-gray-900 md:text-lg'>
            {confirm ? '예약이 승인되었어요!' : '예약이 거절되었어요.'}
          </h1>
        </div>
        <Button className='h-fit w-fit p-0' variant='none' onClick={onDelete}>
          <DeleteIcon className='size-10' color='var(--color-gray-300)' />
        </Button>
      </div>
      <div className='cursor-pointer' onClick={onClickDetail}>
        <div className='flex items-center gap-4 text-gray-600'>
          <DocumentIcon className='size-14' />
          <p>{title}</p>
        </div>
        <div className='flex items-center gap-4 text-gray-600'>
          <ClockIcon className='size-14' />
          <p>
            {date.year}년 {date.month}월 {date.day}일 {date.startTime}~{date.endTime}
          </p>
        </div>
      </div>
      <div className='flex justify-between text-xs'>
        <p className='text-gray-300'>1분 전</p> {/* api에 따라 수정 예정 */}
      </div>
    </div>
  );
}

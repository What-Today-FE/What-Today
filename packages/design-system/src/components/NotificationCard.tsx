import Button from './button';
import { ClockIcon, DeleteIcon, DocumentIcon } from './icons';

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
  const parts = content.split(/[()]/);

  const title = parts[0].trim();
  const dateTimeStr = parts[1].trim();
  const statusText = parts[2].trim();

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
  if (!parsedNotification) return null;
  const { title, date, confirm } = parsedNotification;

  return (
    <div className='text-md flex flex-col gap-4 p-16'>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-bold text-gray-900'>{confirm ? '예약이 승인되었어요!' : '예약이 거절되었어요.'}</h1>
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

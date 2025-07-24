import { twMerge } from 'tailwind-merge';

import Button from '@/components/button';
import UserBadge from '@/components/UserBadge';
type Status = 'declined' | 'pending' | 'confirmed';
interface ReservationInfoCardProps {
  nickname: string;
  headCount: number;
  ownerStatus: Status;
  userStatus: Status;
  onApprove?: () => void;
  onReject?: () => void;
}
export default function ReservationInfoCard({
  nickname,
  headCount,
  ownerStatus,
  userStatus,
  onApprove,
  onReject,
}: ReservationInfoCardProps) {
  const ActionButton = 'h-29 w-68 text-gray-600 hover:outline-2 hover:outline-gray-200';
  return (
    <div className='flex w-full items-center justify-between rounded-2xl border border-gray-100 px-16 py-13'>
      <dl className='flex flex-col gap-4 text-sm'>
        <dt className='flex gap-8'>
          <span className='font-bold text-gray-500'>닉네임</span>
          <span className='font-medium text-gray-950'>{nickname}</span>
        </dt>
        <dt className='flex gap-8'>
          <span className='font-bold text-gray-500'>인원</span>
          <span className='font-medium text-gray-950'>{headCount}명</span>
        </dt>
      </dl>
      {ownerStatus === 'pending' ? (
        <div className='flex flex-col gap-8' role='group'>
          <Button className={twMerge(ActionButton, 'border border-gray-50')} variant='none' onClick={onApprove}>
            승인하기
          </Button>
          <Button className={twMerge(ActionButton, 'bg-gray-50')} variant='none' onClick={onReject}>
            거절하기
          </Button>
        </div>
      ) : (
        <UserBadge status={userStatus} />
      )}
    </div>
  );
}

import { twMerge } from 'tailwind-merge';

import Button from '@/components/button';
import UserBadge from '@/components/UserBadge';
type Status = 'declined' | 'pending' | 'confirmed';
interface ReservationInfoCardProps {
  /**
   * 예약한 사용자의 닉네임
   */
  nickname: string;
  /**
   * 예약 인원 수
   */
  headCount: number;
  /**
   * 호스트 본인의 예약 처리 상태
   */
  ownerStatus: Status;
  /**
   * 신청자의 예약 상태
   */
  userStatus: Status;
  /**
   * 예약 승인 버튼 클릭 시 실행될 콜백 함수
   */
  onApprove?: () => void;
  /**
   * 예약 거절 버튼 클릭 시 실행될 콜백 함수
   */
  onReject?: () => void;
}

/**
 * 예약 정보 카드 컴포넌트
 *
 * 닉네임과 인원 정보를 표시하고, 방장의 상태가 'pending'일 경우
 * 승인/거절 버튼을 보여주며, 그 외에는 유저 상태 뱃지를 출력합니다.
 *
 * @param {ReservationInfoCardProps} props
 * @returns {JSX.Element}
 */
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
          <Button
            className={twMerge(ActionButton, 'border border-gray-50')}
            variant='none'
            onClick={onApprove || (() => {})}
          >
            승인하기
          </Button>
          <Button className={twMerge(ActionButton, 'bg-gray-50')} variant='none' onClick={onReject || (() => {})}>
            거절하기
          </Button>
        </div>
      ) : (
        <UserBadge status={userStatus} />
      )}
    </div>
  );
}

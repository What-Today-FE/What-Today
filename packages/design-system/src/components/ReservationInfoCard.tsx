import Button from '@/components/button';
import type { ManageableReservationStatus } from '@/components/calendar';
import UserBadge from '@/components/UserBadge';
interface ReservationInfoCardProps {
  /**
   * 예약 ID
   */
  reservationId: number;
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
  ownerStatus: ManageableReservationStatus;
  /**
   * 신청자의 예약 상태
   */
  userStatus: ManageableReservationStatus;
  /**
   * 예약 승인 버튼 클릭 시 실행될 콜백 함수
   */
  onApprove?: (id: number) => void;
  /**
   * 예약 거절 버튼 클릭 시 실행될 콜백 함수
   */
  onReject?: (id: number) => void;
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
  reservationId,
  nickname,
  headCount,
  ownerStatus,
  userStatus,
  onApprove,
  onReject,
}: ReservationInfoCardProps) {
  return (
    <div className='flex w-full items-center justify-between rounded-xl border border-gray-100 bg-white px-16 py-13'>
      <dl className='caption-text flex flex-col gap-4'>
        <dt className='flex gap-8'>
          <span className='text-gray-400'>닉네임</span>
          <span className=''>{nickname}</span>
        </dt>
        <dt className='flex gap-8'>
          <span className='text-gray-400'>인원</span>
          <span className=''>{headCount}명</span>
        </dt>
      </dl>
      {ownerStatus === 'pending' ? (
        <div className='caption-text flex flex-col gap-8' role='group'>
          <Button className='h-29 w-auto' variant='outline' onClick={() => onApprove?.(reservationId)}>
            승인하기
          </Button>
          <Button
            className='h-29 w-auto bg-gray-50 text-gray-600'
            variant='fill'
            onClick={() => onReject?.(reservationId)}
          >
            거절하기
          </Button>
        </div>
      ) : (
        <UserBadge status={userStatus} />
      )}
    </div>
  );
}

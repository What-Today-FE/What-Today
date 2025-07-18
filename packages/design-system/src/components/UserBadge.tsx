import { twMerge } from 'tailwind-merge';

type UserStatusProps = 'pending' | 'confirmed' | 'completed' | 'declined' | 'canceled';
interface UserBadgeProps {
  /**
   * 예약 상태 구분('pending' | 'confirmed' | 'completed' | 'declined' | 'canceled')
   */
  status: UserStatusProps;
}
const reservationStatus: Record<UserStatusProps, { label: string; style: string }> = {
  pending: { label: '신청 완료', style: 'bg-[#DAF0FF] text-[#0D6CD1]' },
  confirmed: { label: '예약 승인', style: 'bg-[#DDF9F9] text-[#1790A0]' },
  declined: { label: '예약 거절', style: 'bg-[#FCECEA] text-[#F96767]' },
  canceled: { label: '예약 취소', style: 'bg-[#E0E0E5] text-[#707177]' },
  completed: { label: '체험 완료', style: 'bg-[#E9FBE4] text-[#2BA90D]' },
};

/**
 * UserBadge 컴포넌트
 * 예약 내역 상태에 따라 시각적 뱃지를 렌더링하는 컴포넌트입니다.
 *
 * @component
 * @param {BadgeProps} props - 뱃지에 전달되는 props
 * @param {UserStatusProps} props.status - 예약 상태 구분
 *
 * @returns {JSX.Element} 예약 상태에 따른 스타일링된 뱃지 요소
 *
 * @example
 * <Badge status="confirmed" />
 */
export default function UserBadge({ status }: UserBadgeProps) {
  const { label, style } = reservationStatus[status];

  const baseClass = ' flex items-center justify-center gap-2 w-63 rounded-full px-6 py-1 text-center text-sm font-bold';

  return (
    <span className={twMerge(baseClass, style)} role='status'>
      <span>{label}</span>
    </span>
  );
}

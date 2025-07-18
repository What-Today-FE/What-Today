import { twMerge } from 'tailwind-merge';

type OwnerStatusProps = 'pending' | 'confirmed' | 'completed';
interface BadgeProps {
  /**
   * 예약 상태 구분('pending' | 'confirmed' | 'completed')
   */
  status: OwnerStatusProps;
  /**
   * 예약 상태별 수치 정보
   */
  count: number;
}
const reservationStatus: Record<OwnerStatusProps, { label: string; style: string }> = {
  pending: { label: '예약', style: 'bg-[#E5F3FF] text-[#3D92F2]' },
  confirmed: { label: '승인', style: 'bg-[#FFF8DD] text-[#FFB051]' },
  completed: { label: '완료', style: 'bg-[#EDEEF2] text-[#84858C]' },
};

/**
 * OwnerBadge 컴포넌트
 * 일자별 예약 현황에 따라 시각적 뱃지를 렌더링하는 컴포넌트입니다.
 *
 * @component
 * @param {BadgeProps} props - 뱃지에 전달되는 props
 * @param {OwnerStatusProps} [props.status] - 예약 상태 구분
 * @param {number} [props.count] - 예약 상태별 수치 정보
 *
 * @returns {JSX.Element} 예약 상태에 따른 스타일링된 뱃지 요소
 *
 * @example
 * <OwnerBadge status="confirmed" count={3} />
 */
export default function OwnerBadge({ status, count }: BadgeProps) {
  const { label, style } = reservationStatus[status];
  const baseClass =
    'flex w-full items-center justify-center gap-2 rounded-sm text-center text-xs font-medium md:text-sm';
  return (
    <span className={twMerge(baseClass, style)} role='status'>
      <span>{label}</span>
      <span>{count}</span>
    </span>
  );
}

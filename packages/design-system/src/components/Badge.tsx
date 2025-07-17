import { twMerge } from 'tailwind-merge';

type OwnerStatusProps = 'pending' | 'confirmed' | 'completed';
type UserStatusProps = OwnerStatusProps | 'declined' | 'canceled';
type BadgeTypeProps = 'user' | 'owner';
interface BadgeProps {
  /**
   * 사용자 타입에 따른 뱃지 스타일 구분('user' | 'owner')
   */
  type: BadgeTypeProps;
  /**
   * 예약 상태 구분('pending' | 'confirmed' | 'completed' | 'declined' | 'canceled')
   */
  status: UserStatusProps | OwnerStatusProps;
  /**
   * `type`이 `owner`일 경우에만 노출되는 수치 정보
   */
  count?: number;
}

/**
 * Badge 컴포넌트
 * 예약 상태에 따라 시각적 뱃지를 렌더링하는 컴포넌트입니다.
 *
 * @component
 * @param {BadgeProps} props - 뱃지에 전달되는 props
 * @param {BadgeTypeProps} props.type - 사용자 타입에 따른 뱃지 스타일 구분
 * @param {UserStatusProps} props.status - 예약 상태
 *   - `owner`일 경우에는 `'canceled'`와 `'declined'`는 사용할 수 없습니다.
 * @param {number} [props.count] - `type`이 `owner`일 경우에만 노출되는 수치 정보
 *
 * @returns {JSX.Element} 예약 상태에 따른 스타일링된 뱃지 요소
 *
 * @example
 * <Badge type="user" status="confirmed" />
 *
 * @example
 * <Badge type="owner" status="pending" count={3} />
 */
export default function Badge({ type, status, count }: BadgeProps) {
  const isOwner = type === 'owner';

  // Owner 일 경우, 미사용 뱃지 검사
  if (isOwner && ['declined', 'canceled'].includes(status)) {
    return null;
  }
  if (isOwner) {
    if (['declined', 'canceled'].includes(status)) return null;
    if (count === 0 || !count) return null;
  }

  const reservationStatus = {
    user: {
      pending: { label: '신청 완료', style: 'bg-[#DAF0FF] text-[#0D6CD1]' },
      confirmed: { label: '예약 승인', style: 'bg-[#DDF9F9] text-[#1790A0]' },
      declined: { label: '예약 거절', style: 'bg-[#FCECEA] text-[#F96767]' },
      canceled: { label: '예약 취소', style: 'bg-[#E0E0E5] text-[#707177]' },
      completed: { label: '체험 완료', style: 'bg-[#E9FBE4] text-[#2BA90D]' },
    },
    owner: {
      pending: { label: '예약', style: 'bg-[#E5F3FF] text-[#3D92F2]' },
      confirmed: { label: '승인', style: 'bg-[#FFF8DD] text-[#FFB051]' },
      completed: { label: '완료', style: 'bg-[#EDEEF2] text-[#84858C]' },
    },
  };

  let badgeStatus: { label: string; style: string };
  switch (type) {
    case 'user':
      badgeStatus = reservationStatus.user[status as UserStatusProps];
      break;
    case 'owner':
      badgeStatus = reservationStatus.owner[status as OwnerStatusProps];
      break;
  }
  if (!badgeStatus) return null;

  const badgeClass = {
    user: twMerge('w-63 rounded-full px-6 py-1 text-center text-sm font-bold', badgeStatus.style),
    owner: twMerge('w-full rounded-sm text-xs md:text-sm font-medium text-center', badgeStatus.style),
  };

  return (
    <span className={`flex items-center justify-center gap-2 ${badgeClass[type]}`} role='status'>
      <span>{badgeStatus.label}</span>
      {isOwner && <span>{count}</span>}
    </span>
  );
}

import { twMerge } from 'tailwind-merge';

type OwnerStatusProps = 'pending' | 'confirmed' | 'completed';
type UserStatusProps = OwnerStatusProps | 'declined' | 'canceled';
type BadgeTypeProps = 'user' | 'owner';
interface BadgeProps {
  type: BadgeTypeProps;
  status: UserStatusProps | OwnerStatusProps;
  count?: number;
}

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

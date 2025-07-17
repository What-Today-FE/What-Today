interface BadgeProps {
  type: 'user' | 'owner';
  status: 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';
}

export default function Badge({ type, status }: BadgeProps) {
  const totalStatus = {
    user: {
      pending: '신청 완료',
      confirmed: '예약 승인',
      declined: '예약 거절',
      canceled: '예약 취소',
      completed: '체험 완료',
    },
    owner: {
      pending: '신청 완료',
      confirmed: '예약 승인',
      declined: '예약 거절',
    },
  };

  let label: string;

  if (type === 'user') {
    label = totalStatus.user[status];
  } else {
    label = totalStatus.owner[status as 'pending' | 'confirmed' | 'declined'];
  }
  return (
    <div>
      <span>{label}</span>
    </div>
  );
}

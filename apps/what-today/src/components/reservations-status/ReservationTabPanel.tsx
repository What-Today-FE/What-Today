import { EmptyLogo, type ManageableReservationStatus, ReservationInfoCard } from '@what-today/design-system';

import type { reservation } from '@/schemas/myActivities';
interface ReservationTabPanel {
  reservationData: reservation[];
  ownerStatus: ManageableReservationStatus;
  onApprove: (id: number) => Promise<void>;
  onReject: (id: number) => Promise<void>;
}
export default function ReservationTabPanel({
  reservationData,
  ownerStatus,
  onApprove,
  onReject,
}: ReservationTabPanel) {
  return (
    <div className='flex h-[60vh] grow flex-col gap-12 overflow-scroll xl:h-full'>
      <h3 className='body-text font-bold'>예약 내역</h3>
      {reservationData.length > 0 ? (
        reservationData.map(({ id, nickname, headCount, status }) => {
          return (
            <ReservationInfoCard
              key={id}
              headCount={headCount}
              nickname={nickname}
              ownerStatus={ownerStatus}
              reservationId={id}
              userStatus={status}
              onApprove={onApprove}
              onReject={onReject}
            />
          );
        })
      ) : (
        <div className='flex flex-col items-center justify-center gap-20 pt-40'>
          <EmptyLogo size={80} />
          내역이 없습니다.
        </div>
      )}
    </div>
  );
}

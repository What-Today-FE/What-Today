import { EmptyLogo, type ManageableReservationStatus, ReservationInfoCard } from '@what-today/design-system';

import type { reservation } from '@/schemas/myActivities';
interface ReservationTabPanel {
  reservationData: reservation[];
  ownerStatus: ManageableReservationStatus;
}
export default function ReservationTabPanel({ reservationData, ownerStatus }: ReservationTabPanel) {
  return (
    <div className='flex grow flex-col gap-12'>
      <h3 className='text-md font-bold'>예약 내역</h3>
      {reservationData.length > 0 ? (
        reservationData.map(({ id, nickname, headCount, status }) => {
          return (
            <ReservationInfoCard
              key={id}
              headCount={headCount}
              nickname={nickname}
              ownerStatus={ownerStatus}
              userStatus={status}
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

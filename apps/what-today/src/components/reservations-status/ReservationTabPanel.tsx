import { ReservationInfoCard } from '@what-today/design-system';

export default function ReservationTabPanel() {
  return (
    // 추후 api 연결하면 상태에 따라 card 변경 예정
    <div className='flex grow flex-col gap-12'>
      <h3 className='text-md font-bold'>예약 내역</h3>
      <ReservationInfoCard headCount={7} nickname='김지현' ownerStatus='pending' userStatus='pending' />
      <ReservationInfoCard headCount={7} nickname='김지현' ownerStatus='pending' userStatus='pending' />
      <ReservationInfoCard headCount={7} nickname='김지현' ownerStatus='pending' userStatus='pending' />
    </div>
  );
}

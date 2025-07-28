import { createReservation } from '@/apis/activityDetail';

import ReservationForm from './ReservationForm';
import type { DesktopReservationProps, ReservationRequest } from './types';

export default function DesktopReservation({ activityId, price, schedules }: DesktopReservationProps) {
  const handleSubmit = async (request: ReservationRequest) => {
    try {
      const reservation = await createReservation(activityId, request);
      alert(`예약이 완료되었습니다! (예약 ID: ${reservation.id})`);
    } catch (error) {
      console.error('예약 중 오류 발생:', error);
      const errorMessage = error instanceof Error ? error.message : '예약 중 오류가 발생했습니다.';
      alert(`예약 실패: ${errorMessage}`);
    }
  };

  return (
    <section className='flex flex-col justify-between rounded-3xl border border-[#DDDDDD] p-30 shadow-sm'>
      <ReservationForm showSubmitButton price={price} schedules={schedules} onSubmit={handleSubmit} />
    </section>
  );
}

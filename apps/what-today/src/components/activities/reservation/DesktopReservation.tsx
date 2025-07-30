import { useToast } from '@what-today/design-system';

import { useCreateReservation } from '@/hooks/activityDetail';

import Divider from '../Divider';
import ReservationForm from './ReservationForm';
import type { DesktopReservationProps, ReservationRequest } from './types';

export default function DesktopReservation({ activityId, price, schedules }: DesktopReservationProps) {
  const { toast } = useToast();
  const createReservationMutation = useCreateReservation(activityId);

  const handleSubmit = async (request: ReservationRequest) => {
    createReservationMutation.mutate(request, {
      onSuccess: (data) => {
        toast({
          title: '예약 완료',
          description: `예약 ID: ${data.id}`,
          type: 'success',
        });
      },
      onError: (error) => {
        console.error('예약 중 오류 발생:', error);
        const errorMessage = error instanceof Error ? error.message : '예약 중 오류가 발생했습니다.';
        toast({
          title: '예약 실패',
          description: errorMessage,
          type: 'error',
        });
      },
    });
  };

  return (
    <section className='flex flex-col justify-between rounded-3xl border border-[#DDDDDD] p-30 shadow-sm'>
      <ReservationForm
        showSubmitButton
        isSubmitting={createReservationMutation.isPending}
        price={price}
        schedules={schedules}
        onSubmit={handleSubmit}
      />

      <Divider className='my-24' />
    </section>
  );
}

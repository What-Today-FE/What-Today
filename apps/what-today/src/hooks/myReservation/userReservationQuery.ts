import { useQuery } from '@tanstack/react-query';
import type { ManageableReservationStatus } from '@what-today/design-system';

import { getReservation } from '@/apis/myActivities';
import type { timeSlotReservationResponse } from '@/schemas/myActivities';

export function useReservationQuery(activityId: number, scheduleId: number, status: ManageableReservationStatus) {
  return useQuery<timeSlotReservationResponse>({
    queryKey: ['reservation', activityId, scheduleId, status],
    queryFn: () =>
      getReservation(activityId, {
        scheduleId,
        status,
      }),
    enabled: !!activityId && !!scheduleId && !!status,
  });
}

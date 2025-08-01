import { useQuery } from '@tanstack/react-query';

import { getDailySchedule } from '@/apis/myActivities';
import type { dailyScheduleResponse } from '@/schemas/myActivities';

export function useDailyScheduleQuery(activityId: number, date: string) {
  return useQuery<dailyScheduleResponse>({
    queryKey: ['dailySchedule', activityId, date],
    queryFn: () => getDailySchedule(activityId, { date }),
    enabled: !!activityId && !!date, // 값이 있을 때만 실행
  });
}

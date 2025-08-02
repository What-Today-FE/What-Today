import { useQuery } from '@tanstack/react-query';

import { getMonthlySchedule } from '@/apis/myActivities';

export const useMonthlyScheduleQuery = ({
  activityId,
  year,
  month,
}: {
  activityId: number;
  year: string;
  month: string;
}) => {
  return useQuery({
    queryKey: ['monthlySchedule', activityId, year, month],
    queryFn: () => getMonthlySchedule(activityId, { year, month }),
    enabled: !!activityId && !!year && !!month, // activityId가 존재할 때만 호출
  });
};

import { useInfiniteQuery } from '@tanstack/react-query';

import { getMyActivities } from '@/apis/myActivities';
import type { myActivitiesResponse } from '@/schemas/myActivities';
import { useWhatTodayStore } from '@/stores';

export const useInfiniteMyActivitiesQuery = (size = 10) => {
  const { user } = useWhatTodayStore();
  return useInfiniteQuery<myActivitiesResponse>({
    queryKey: ['myActivitiesInfinite', { size }],
    initialPageParam: undefined,
    queryFn: ({ pageParam }) => getMyActivities({ cursorId: pageParam as number, size }),
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
    enabled: Boolean(user),
  });
};

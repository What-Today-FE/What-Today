import { useInfiniteQuery } from '@tanstack/react-query';

import { getMyActivities } from '@/apis/myActivities';
import type { myActivitiesResponse } from '@/schemas/myActivities';

export const useInfiniteMyActivitiesQuery = (size = 10) => {
  return useInfiniteQuery<myActivitiesResponse>({
    queryKey: ['myActivitiesInfinite', { size }],
    initialPageParam: undefined,
    queryFn: ({ pageParam }) => getMyActivities({ cursorId: pageParam as number, size }),
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
  });
};

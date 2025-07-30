import { useQuery } from '@tanstack/react-query';

import { fetchActivityDetail } from '@/apis/activityDetail';

/**
 * @description 체험 상세 정보 조회 쿼리 훅
 * @param activityId 체험 ID
 */
export const useActivityDetail = (activityId: number | string | undefined) => {
  return useQuery({
    queryKey: ['activity', activityId],
    queryFn: () => fetchActivityDetail(activityId!),
    enabled: !!activityId, // activityId가 있을 때만 실행
    retry: 3, // 전역 설정(1번)보다 더 많이 재시도
  });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteMyActivity } from '@/apis/myActivities';

export const useDeleteMyActivityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMyActivity,
    onSuccess: () => {
      // 내 체험 관리 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['myActivitiesInfinite'] });

      // 메인 페이지 체험 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
    },
  });
};

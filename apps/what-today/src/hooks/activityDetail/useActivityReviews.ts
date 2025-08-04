import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchActivityReviewsInfinite } from '@/apis/activityDetail';
import type { ActivityReviewsResponse } from '@/schemas/activityReview';

/**
 * @description 체험 리뷰 무한스크롤 조회 쿼리 훅
 * @param activityId 체험 ID
 * @param pageSize 페이지 크기 (기본값: 10)
 */
export const useActivityReviews = (activityId: number | string | undefined, pageSize: number = 10) => {
  const query = useInfiniteQuery<ActivityReviewsResponse>({
    queryKey: ['activityReviews', activityId, pageSize],
    queryFn: ({ pageParam = 1 }) => fetchActivityReviewsInfinite(Number(activityId!), pageParam as number, pageSize),
    enabled: !!activityId,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // 🎯 간단하게: 현재 페이지에 데이터가 pageSize만큼 있고,
      // 전체 카운트보다 로드된 게 적으면 다음 페이지 있음
      const currentPageReviewCount = lastPage.reviews.length;
      const totalLoadedCount = allPages.reduce((total, page) => total + page.reviews.length, 0);

      // 현재 페이지가 full이고, 아직 더 있으면 다음 페이지
      return currentPageReviewCount === pageSize && totalLoadedCount < lastPage.totalCount
        ? allPages.length + 1
        : undefined;
    },
  });

  // 🎯 간단하게: 필요한 데이터만 추출
  const allReviews = query.data?.pages.flatMap((page) => page.reviews) ?? [];
  const firstPage = query.data?.pages[0];

  return {
    ...query,
    // 가공된 데이터를 직접 제공
    allReviews,
    averageRating: firstPage?.averageRating ?? 0,
    totalCount: firstPage?.totalCount ?? 0,
  };
};

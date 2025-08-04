import { useQuery } from '@tanstack/react-query';
import type { SelectItem } from '@what-today/design-system';
import {
  ActivityCardGridSkeleton,
  ArtIcon,
  BusIcon,
  Carousel,
  CarouselSkeleton,
  FoodIcon,
  MainBanner,
  MainCard,
  MainSearchInput,
  NoResult,
  Pagination,
  RadioGroup,
  Select,
  SportIcon,
  TourIcon,
  WellbeingIcon,
} from '@what-today/design-system';
import { motion } from 'motion/react';
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { type Activity, getActivities } from '@/apis/activities';

const MemoizedMainCard = React.memo(MainCard.Root);

// ✅ 화면 너비에 따른 카드 개수 (모든 체험용)
const getCount = () => {
  const w = window.innerWidth;
  if (w < 768) return 6; // 모바일
  if (w < 1280) return 4; // 태블릿
  return 8; // 데스크탑
};

// ✅ 인기 체험용 반응형 카드 개수
const MOBILE_BREAK = 768;
const TABLET_BREAK = 1280;

const getPopularPerPage = () => {
  const w = window.innerWidth;
  if (w < MOBILE_BREAK) return 4; // 모바일
  if (w < TABLET_BREAK) return 2; // 태블릿
  return 4; // 데스크탑
};

export default function MainPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(() => getCount());
  const [popularPerPage, setPopularPerPage] = useState(() => getPopularPerPage());
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState<'latest' | 'asc' | 'desc'>('latest');
  const [selectedValue, setSelectedValue] = useState<SelectItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | number>('');
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // 페이지 마운트 시 무조건 맨 위로
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  // 반응형 카드 수
  const handleResize = useCallback(() => {
    setItemsPerPage(getCount());
    setPopularPerPage(getPopularPerPage());
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // ✅ 데이터 불러오기
  const {
    data: activities = [],
    isLoading,
    isFetching,
  } = useQuery<Activity[]>({
    queryKey: ['activities'],
    queryFn: () => getActivities({ size: 100 }),
    refetchOnMount: 'always',
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  // 인기 체험
  const popularActivities = useMemo(() => {
    if (!activities.length) return [];
    return activities
      .slice()
      .sort((a, b) =>
        b.reviewCount === a.reviewCount
          ? new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
          : b.reviewCount - a.reviewCount,
      )
      .slice(0, 12);
  }, [activities]);

  // 1단계: 필터링
  const filteredItems = useMemo(() => {
    if (!searchKeyword && selectedCategory === '') return activities;
    return activities.filter((item) => {
      const matchesSearch = !searchKeyword || item.title.toLowerCase().includes(searchKeyword.toLowerCase());
      const matchesCategory = selectedCategory === '' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [activities, searchKeyword, selectedCategory]);

  // 2단계: 정렬
  const sortedItems = useMemo(() => {
    if (sortOrder === 'latest') {
      return [...filteredItems].sort(
        (a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime(),
      );
    }
    return [...filteredItems].sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));
  }, [filteredItems, sortOrder]);

  // 3단계: 페이지 아이템
  const pagedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedItems.slice(start, start + itemsPerPage);
  }, [sortedItems, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => Math.ceil(sortedItems.length / itemsPerPage), [sortedItems.length, itemsPerPage]);

  // 이벤트 핸들러
  const handlePageChange = useCallback(
    (page: number) => {
      if (page !== currentPage) {
        setCurrentPage(page);
      }
    },
    [currentPage],
  );

  const handleSearch = useCallback((keyword: string) => {
    setSearchKeyword(keyword);
    setCurrentPage(1);
    setSortOrder('latest');
    setSelectedValue(null);
    setSelectedCategory('');
  }, []);

  const handleSortChange = useCallback((item: SelectItem | null) => {
    setSelectedValue(item);
    if (item) setSortOrder(item.value as 'asc' | 'desc');
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((category: string | number) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, []);

  return (
    <>
      <div className='to-primary-500/40 absolute top-0 left-0 h-1/2 w-full bg-gradient-to-t from-transparent' />
      <div className='relative z-10 flex h-auto flex-col gap-100'>
        <MainBanner />

        {/* 인기 체험 */}
        <div className='flex flex-col gap-20'>
          <h2 className='title-text'>🔥 인기 체험</h2>
          {isLoading ? (
            <CarouselSkeleton />
          ) : (
            <Carousel
              items={popularActivities}
              itemsPerPage={popularPerPage}
              onClick={(id) => navigate(`/activities/${id}`)}
            />
          )}
        </div>

        {/* 검색 */}
        <div className='flex flex-col gap-20'>
          <h2 className='title-text flex justify-center'>무엇을 체험하고 싶으신가요?</h2>
          <MainSearchInput onClick={handleSearch} />
        </div>

        {/* 모든 체험 */}
        <div className='flex flex-col gap-20'>
          {/* 제목 */}
          <div className='flex flex-wrap items-center justify-between gap-12 md:hidden'>
            <h2 className='title-text flex items-center gap-12'>🛼 모든 체험</h2>
            {/* 모바일에서만 보이는 가격 드롭다운 */}
            <Select.Root value={selectedValue} onChangeValue={handleSortChange}>
               <Select.Trigger className='flex min-w-fit gap-6 rounded-xl border border-gray-100 bg-white py-6'>
                 <Select.Value className='body-text text-gray-950' placeholder='가격' />
               </Select.Trigger>
               <Select.Content>
                 <Select.Group className='text-center whitespace-nowrap'>
                   <Select.Item className='flex justify-center' value='desc'>
                     높은순
                    </Select.Item>
                    <Select.Item className='flex justify-center' value='asc'>
                      낮은순
                    </Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
          </div>

          {/* 데스크톱/태블릿에서만 보이는 제목 */}
          <h2 className='title-text hidden items-center gap-12 md:flex'>🛼 모든 체험</h2>

          {/* 카테고리 + 가격 드롭다운 */}
          <div className='flex items-center justify-between gap-12 overflow-x-hidden'>
            <RadioGroup
              radioGroupClassName='items-center min-w-0 max-w-full overflow-x-auto no-scrollbar'
              selectedValue={selectedCategory}
              onSelect={handleCategoryChange}
            >
              <RadioGroup.Radio className='flex gap-8 font-normal' value='문화 · 예술'>
                <ArtIcon className='size-12' /> 문화 예술
              </RadioGroup.Radio>
              <RadioGroup.Radio className='font-normal' value='식음료'>
                <FoodIcon className='size-12' /> 식음료
              </RadioGroup.Radio>
              <RadioGroup.Radio className='font-normal' value='스포츠'>
                <SportIcon className='size-12' /> 스포츠
              </RadioGroup.Radio>
              <RadioGroup.Radio className='font-normal' value='투어'>
                <WellbeingIcon className='size-12' /> 투어
              </RadioGroup.Radio>
              <RadioGroup.Radio className='font-normal' value='관광'>
                <BusIcon className='size-12' /> 관광
              </RadioGroup.Radio>
              <RadioGroup.Radio className='font-normal' value='웰빙'>
                <TourIcon className='size-12' /> 웰빙
              </RadioGroup.Radio>
            </RadioGroup>
            
            {/* 데스크톱/태블릿에서만 보이는 가격 드롭다운 */}
            <div className='hidden md:block'>
              <Select.Root value={selectedValue} onChangeValue={handleSortChange}>
                <Select.Trigger className='flex min-w-fit gap-6 rounded-xl border border-gray-100 bg-white py-6'>
                 <Select.Value className='body-text text-gray-950' placeholder='가격' />
               </Select.Trigger>
               <Select.Content>
                 <Select.Group className='text-center whitespace-nowrap'>
                   <Select.Item className='flex justify-center' value='desc'>
                     높은순
                    </Select.Item>
                    <Select.Item className='flex justify-center' value='asc'>
                      낮은순
                    </Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </div>
          </div>

          {/* 카드 리스트 */}
          <div className='grid grid-cols-2 gap-12 md:grid-cols-2 xl:grid-cols-4'>
            {isLoading || isFetching ? (
              <ActivityCardGridSkeleton />
            ) : filteredItems.length === 0 ? (
              <div className='col-span-full flex justify-center py-40'>
                <NoResult />
              </div>
            ) : (
              pagedItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 100 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <MemoizedMainCard
                    bannerImageUrl={item.bannerImageUrl}
                    category={item.category}
                    price={item.price}
                    rating={item.rating}
                    reviewCount={item.reviewCount}
                    title={item.title}
                    onClick={() => navigate(`/activities/${item.id}`)}
                  >
                    <MainCard.Image />
                    <MainCard.Content />
                  </MemoizedMainCard>
                </motion.div>
              ))
            )}
          </div>

          {!isLoading && filteredItems.length > 0 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </div>
      </div>
    </>
  );
}

import { useQuery } from '@tanstack/react-query';
import type { SelectItem } from '@what-today/design-system';
import {
  ArtIcon,
  BusIcon,
  Carousel,
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
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Activity } from '@/apis/activities';
import { getActivities } from '@/apis/activities';

export default function MainPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [searchResult, setSearchResult] = useState<Activity[]>([]);
  const [sortOrder, setSortOrder] = useState<'latest' | 'asc' | 'desc'>('latest'); // 기본값 최신순
  const [selectedValue, setSelectedValue] = useState<SelectItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | number>('');
  const navigate = useNavigate();

  // 반응형 카드 수 조정
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 790) setItemsPerPage(6);
      else if (width < 1024) setItemsPerPage(4);
      else setItemsPerPage(8);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 활동 리스트 요청
  const { data: activities = [] } = useQuery({
    queryKey: ['activities'],
    queryFn: () => getActivities(),
    staleTime: 1000 * 60 * 5,
  });

  // ✅ 인기 체험: 리뷰 많은 순
  const popularActivities = [...activities]
    .sort((a, b) => {
      if (b.reviewCount === a.reviewCount) {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return b.reviewCount - a.reviewCount;
    })
    .slice(0, 12);

  // ✅ 모든 체험 초기값: 최신순
  useEffect(() => {
    if (activities.length > 0 && searchResult.length === 0) {
      const latestSorted = [...activities].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setSearchResult(latestSorted);
    }
  }, [activities]);

  // 검색
  const handleSearch = (keyword: string) => {
    const sortedLatest = (list: Activity[]) =>
      [...list].sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime());

    if (keyword === '') {
      setSearchResult(sortedLatest(activities));
      setCurrentPage(1);
      setSortOrder('latest');
      setSelectedValue(null);
      setSelectedCategory('');
      return;
    }

    const result = activities.filter((item) => item.title.toLowerCase().includes(keyword.toLowerCase()));

    setSearchResult(sortedLatest(result)); // ✅ 검색 후에도 최신순 유지
    setCurrentPage(1);
    setSortOrder('latest');
    setSelectedValue(null);
    setSelectedCategory('');
  };

  // 정렬 변경 시 페이지 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [sortOrder]);

  const filteredItems =
    selectedCategory !== '' ? searchResult.filter((item) => item.category === selectedCategory) : searchResult;

  // 정렬 로직
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === 'asc') return a.price - b.price;
    if (sortOrder === 'desc') return b.price - a.price;
    return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime(); // 최신순
  });

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const pagedItems = sortedItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <div className='to-primary-500/40 absolute top-0 left-0 h-1/2 w-full bg-gradient-to-t from-transparent' />
      <div className='relative z-10 mt-40 flex h-auto flex-col gap-60'>
        <MainBanner />

        {/* 인기 체험 */}
        <div className='flex flex-col gap-20'>
          <h2 className='title-text'>🔥 인기 체험</h2>
          <div className='-mx-15 flex'>
            <Carousel
              items={popularActivities}
              itemsPerPage={itemsPerPage}
              onClick={(id) => navigate(`/activities/${id}`)}
            />
          </div>
        </div>

        {/* 검색 */}
        <div className='flex flex-col gap-20'>
          <h2 className='title-text flex justify-center'>무엇을 체험하고 싶으신가요?</h2>
          <MainSearchInput onClick={handleSearch} />
        </div>

        {/* 모든 체험 */}
        <div className='flex flex-col gap-20'>
          {/* 제목 + 가격 드롭다운 */}
          <div className='flex flex-wrap items-center justify-between gap-12'>
            <h2 className='title-text flex items-center gap-12'>🛼 모든 체험</h2>

            <Select.Root
              value={selectedValue}
              onChangeValue={(item) => {
                setSelectedValue(item);
                if (item) {
                  setSortOrder(item.value as 'asc' | 'desc');
                }
              }}
            >
              <Select.Trigger className='flex min-w-fit gap-6 rounded-lg border border-gray-300 bg-white px-8 text-sm'>
                <Select.Value className='body-text text-gray-950' placeholder='가격' />
              </Select.Trigger>
              <Select.Content>
                <Select.Group className='caption-text text-center whitespace-nowrap'>
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

          {/* 카테고리 라디오 버튼 */}
          <div className='overflow-x-hidden'>
            <RadioGroup
              radioGroupClassName='items-center min-w-0 max-w-full overflow-x-auto no-scrollbar'
              selectedValue={selectedCategory}
              onSelect={setSelectedCategory}
            >
              <RadioGroup.Radio className='flex gap-8' value='문화 · 예술'>
                <ArtIcon className='size-12' />
                문화 예술
              </RadioGroup.Radio>
              <RadioGroup.Radio value='식음료'>
                <FoodIcon className='size-12' />
                식음료
              </RadioGroup.Radio>
              <RadioGroup.Radio value='스포츠'>
                <SportIcon className='size-12' />
                스포츠
              </RadioGroup.Radio>
              <RadioGroup.Radio value='투어'>
                <WellbeingIcon className='size-12' />
                투어
              </RadioGroup.Radio>
              <RadioGroup.Radio value='관광'>
                <BusIcon className='size-12' />
                관광
              </RadioGroup.Radio>
              <RadioGroup.Radio value='웰빙'>
                <TourIcon className='size-12' />
                웰빙
              </RadioGroup.Radio>
            </RadioGroup>
          </div>

          {/* 카드 리스트 */}
          <div className='grid grid-cols-2 gap-12 md:grid-cols-2 lg:grid-cols-4'>
            {filteredItems.length === 0 ? (
              <div className='col-span-full flex justify-center py-40'>
                <NoResult />
              </div>
            ) : (
              pagedItems.map((item) => (
                <MainCard.Root
                  key={item.id}
                  bannerImageUrl={item.bannerImageUrl}
                  price={item.price}
                  rating={item.rating}
                  reviewCount={item.reviewCount}
                  title={item.title}
                  onClick={() => navigate(`/activities/${item.id}`)}
                >
                  <MainCard.Image />
                  <MainCard.Content />
                </MainCard.Root>
              ))
            )}
          </div>

          {filteredItems.length > 0 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </div>
      </div>
    </>
  );
}

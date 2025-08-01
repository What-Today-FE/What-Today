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
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
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

  // react-query로 활동 리스트 요청
  const { data: activities = [] } = useQuery({
    queryKey: ['activities'],
    queryFn: () => getActivities(),
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });

  const popularActivities = [...activities].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 12);

  // activities가 바뀔 때 초기 상태 설정
  useEffect(() => {
    if (activities.length > 0) {
      setSearchResult(activities);
    }
  }, [activities]);

  // 검색 핸들러
  const handleSearch = (keyword: string) => {
    const result = activities.filter((item) => item.title.toLowerCase().includes(keyword.toLowerCase()));
    setSearchResult(result);
    setCurrentPage(1);
    setSortOrder('asc');
    setSelectedValue(null);
  };

  // 정렬 변경 시 페이지 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [sortOrder]);

  const filteredItems =
    selectedCategory !== '' ? searchResult.filter((item) => item.category === selectedCategory) : searchResult;

  const sortedItems = [...filteredItems].sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const pagedItems = sortedItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className='relative z-10 mt-40 flex h-auto flex-col gap-60 overflow-x-hidden'>
      <MainBanner />
      <div className='flex flex-col gap-20'>
        <h2 className='subtitle-text md:title-text'>🔥 인기 체험</h2>
        <div className='-mx-15 flex'>
          <Carousel
            items={popularActivities}
            itemsPerPage={itemsPerPage}
            onClick={(id) => navigate(`/activities/${id}`)}
          />
        </div>
      </div>

      <div className='flex flex-col gap-20'>
        <h2 className='subtitle-text md:title-text flex justify-center'>무엇을 체험하고 싶으신가요?</h2>
        <MainSearchInput onClick={handleSearch} />
      </div>

      <div className='flex flex-col gap-20'>
        {/* 제목 + 가격 드롭다운 */}
        <div className='flex flex-wrap items-center justify-between gap-12'>
          <h2 className='subtitle-text md:title-text flex items-center gap-12 text-gray-950'>🛼 모든 체험</h2>

          <Select.Root
            value={selectedValue}
            onChangeValue={(item) => {
              setSelectedValue(item);
              if (item) {
                setSortOrder(item.value as 'asc' | 'desc');
              }
            }}
          >
            <Select.Trigger className='text-2lg flex min-w-fit gap-6 border-none bg-white px-15 py-10'>
              <Select.Value className='text-gray-950' placeholder='가격' />
            </Select.Trigger>
            <Select.Content>
              <Select.Group className='body-text text-center whitespace-nowrap'>
                <Select.Item value='desc'> 높은순</Select.Item>
                <Select.Item value='asc'> 낮은순</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>

        {/* 라디오 버튼 가로 스크롤 */}
        <div className='overflow-x-hidden'>
          <RadioGroup
            radioGroupClassName='items-center min-w-0 max-w-full overflow-x-auto no-scrollbar'
            selectedValue={selectedCategory}
            onSelect={setSelectedCategory}
          >
            <RadioGroup.Radio className='flex gap-8' value='문화 · 예술'>
              <ArtIcon className='size-15' />
              문화 예술
            </RadioGroup.Radio>
            <RadioGroup.Radio value='음식'>
              <FoodIcon className='size-15' />
              음식
            </RadioGroup.Radio>
            <RadioGroup.Radio value='스포츠'>
              <SportIcon className='size-15' />
              스포츠
            </RadioGroup.Radio>
            <RadioGroup.Radio value='웰빙'>
              <WellbeingIcon className='size-15' />
              웰빙
            </RadioGroup.Radio>
            <RadioGroup.Radio value='버스'>
              <BusIcon className='size-15' />
              버스
            </RadioGroup.Radio>
            <RadioGroup.Radio value='투어'>
              <TourIcon className='size-15' />
              여행
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

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}

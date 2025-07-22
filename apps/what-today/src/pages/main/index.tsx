import { Button } from '@what-today/design-system';
import { MainCard } from '@what-today/design-system';
import { MainBanner } from '@what-today/design-system';
import { Carousel } from '@what-today/design-system';
import { Pagination } from '@what-today/design-system';
import { RadioGroup } from '@what-today/design-system';
import { ArtIcon, BusIcon, FoodIcon, SportIcon, TourIcon, WellbeingIcon } from '@what-today/design-system';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dummyData = [
  {
    id: 1,
    title: '서핑 클래스',
    price: 90000,
    rating: 4.8,
    reviewCount: 112,
    bannerImageUrl: 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    title: '패러글라이딩',
    price: 120000,
    rating: 4.7,
    reviewCount: 86,
    bannerImageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 3,
    title: '스카이다이빙',
    price: 200000,
    rating: 4.9,
    reviewCount: 74,
    bannerImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 4,
    title: '요트 투어',
    price: 75000,
    rating: 4.6,
    reviewCount: 88,
    bannerImageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 5,
    title: '요트 투어',
    price: 75000,
    rating: 4.6,
    reviewCount: 88,
    bannerImageUrl: 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 6,
    title: '스카이다이빙',
    price: 75000,
    rating: 4.6,
    reviewCount: 88,
    bannerImageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 7,
    title: '요트 투어',
    price: 75000,
    rating: 4.6,
    reviewCount: 88,
    bannerImageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 8,
    title: '요트 투어',
    price: 75000,
    rating: 4.6,
    reviewCount: 88,
    bannerImageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 18,
    title: '요트 투어',
    price: 75000,
    rating: 4.6,
    reviewCount: 88,
    bannerImageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 9,
    title: '요트 투어',
    price: 75000,
    rating: 4.6,
    reviewCount: 88,
    bannerImageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 10,
    title: '요트 투어',
    price: 75000,
    rating: 4.6,
    reviewCount: 88,
    bannerImageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 11,
    title: '서핑 클래스',
    price: 75000,
    rating: 4.6,
    reviewCount: 88,
    bannerImageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 12,
    title: '서핑 클래스',
    price: 75000,
    rating: 4.6,
    reviewCount: 88,
    bannerImageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 13,
    title: '요트 투어',
    price: 75000,
    rating: 4.6,
    reviewCount: 88,
    bannerImageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 14,
    title: '서핑 클래스',
    price: 275000,
    rating: 4.6,
    reviewCount: 88,
    bannerImageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 15,
    title: '요트 투어',
    price: 715000,
    rating: 4.6,
    reviewCount: 88,
    bannerImageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 16,
    title: '스카이다이빙',
    price: 95000,
    rating: 4.6,
    reviewCount: 88,
    bannerImageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 17,
    title: '스카이다이빙',
    price: 80000,
    rating: 4.6,
    reviewCount: 88,
    bannerImageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1000&q=80',
  },
];

export default function MainPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [searchResult, setSearchResult] = useState(dummyData);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedCategory1, setSelectedCategory1] = useState<string | number>('');
  // ✅ 검색
  const handleSearch = (keyword: string) => {
    const result = dummyData
      .filter((item) => item.title.toLowerCase().includes(keyword.toLowerCase()))
      .sort((a, b) => b.id - a.id); // 최신순
    setSearchResult(result);
    setCurrentPage(1);
    setSortOrder('asc'); // 검색 시 정렬 초기화
  };

  // ✅ 디바이스별 perPage 계산
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      if (width < 768)
        setItemsPerPage(6); // 모바일
      else if (width < 1024)
        setItemsPerPage(4); // 태블릿
      else setItemsPerPage(8); // 데스크탑
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ 정렬 변경 시 페이지 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [sortOrder]);

  // ✅ 정렬된 데이터
  const sortedItems = [...searchResult].sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const pagedItems = sortedItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const navigate = useNavigate();

  return (
    <>
      <Button variant='fill' onClick={() => navigate('/activities/5083')}>
        상세페이지 버튼
      </Button>

      <div className='to-primary-500/40 absolute top-0 left-0 z-0 h-1/2 w-full bg-gradient-to-t from-transparent' />

      <div className='relative z-10 flex h-2100 flex-col gap-60'>
        <div>
          <MainBanner />
        </div>
        <div className='flex flex-col gap-20'>
          <h2 className='flex justify-center text-2xl font-bold'>무엇을 체험하고 싶으신가요?</h2>
          <input className='boder-gray-50 w-full rounded-2xl border-1 p-20' type='text' />
        </div>
        <div className='flex flex-col gap-30'>
          <h2 className='text-2xl font-bold'>인기 체험</h2>
          <Carousel items={dummyData} itemsPerPage={itemsPerPage} />
        </div>

        <div className='flex flex-col gap-10'>
          <RadioGroup
            radioGroupClassName='gap-6'
            selectedValue={selectedCategory1}
            title='모든 체험'
            titleClassName='text-lg font-semibold mb-2'
            onSelect={setSelectedCategory1}
          >
            <div className='flex gap-12'>
              <RadioGroup.Radio className='flex gap-8' value='Art'>
                <ArtIcon />
                문화 예술
              </RadioGroup.Radio>
              <RadioGroup.Radio value='Food'>
                <FoodIcon />
                음식
              </RadioGroup.Radio>
              <RadioGroup.Radio value='Sport'>
                <SportIcon />
                스포츠
              </RadioGroup.Radio>
              <RadioGroup.Radio value='Wellbeing'>
                <WellbeingIcon />
                웰빙
              </RadioGroup.Radio>
              <RadioGroup.Radio value='Bus'>
                <BusIcon />
                버스
              </RadioGroup.Radio>
              <RadioGroup.Radio value='Tour'>
                <TourIcon />
                여행
              </RadioGroup.Radio>
            </div>
          </RadioGroup>
        </div>

        <div className='grid grid-cols-2 gap-[20px] md:grid-cols-2 lg:grid-cols-4'>
          {pagedItems.map((item) => (
            <MainCard
              key={item.id}
              bannerImageUrl={item.bannerImageUrl}
              className=''
              price={item.price}
              rating={item.rating}
              reviewCount={item.reviewCount}
              title={item.title}
            >
              <MainCard.Image className='rounded-t-3xl object-cover brightness-90 contrast-125' />
              <MainCard.Content />
            </MainCard>
          ))}
        </div>
        <div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </>
  );
}

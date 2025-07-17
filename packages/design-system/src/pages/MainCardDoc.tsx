import Playground from '@/layouts/Playground';

import { MainCard } from '../components/MainCard/MainCard';
import DocTemplate, { DocCode } from '../layouts/DocTemplate';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `예시 코드를 작성해주세요.`;

const dummyCards = [
  {
    title: '스카이다이빙',
    price: 200000,
    bannerImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    reviewCount: 121,
  },
  {
    title: '패러글라이딩',
    price: 180000,
    bannerImageUrl: 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1000&q=80',
    rating: 4.6,
    reviewCount: 98,
  },
  {
    title: '서핑 체험',
    price: 90000,
    bannerImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    rating: 4.7,
    reviewCount: 201,
  },
  {
    title: '스노클링 투어',
    price: 150000,
    bannerImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviewCount: 76,
  },
];

export default function MainCardDoc() {
  return (
    <>
      <DocTemplate
        description={`
# MainCard 컴포넌트

간단한 설명을 작성해주세요.
`}
        propsDescription={`
| 이름 | 타입 | 설명 |
|------|------|------|
| example | string | 예시 prop입니다. |
`}
        title='MainCard'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <h3 className='mb-20 text-2xl'>하드코딩 예시</h3>
      <DocCode
        code={`        <MainCard
          title='스카이다이빙'
          price={200000}
          bannerImageUrl='https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
          rating={4.8}
          reviewCount={121}
        >
          <MainCard.Image />
          <MainCard.Content />
        </MainCard>`}
      />

      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <Playground code={code} scope={{ MainCard }} />
      </div>

      <div className='flex gap-20'>
        <MainCard
          bannerImageUrl='https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
          className='w-[265px]'
          price={200000}
          rating={4.8}
          reviewCount={121}
          title='스카이다이빙'
        >
          <MainCard.Image />
          <MainCard.Content />
        </MainCard>

        <MainCard
          bannerImageUrl='https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
          className='w-[265px]'
          price={200000}
          rating={4.8}
          reviewCount={121}
          title='스카이다이빙'
        >
          <MainCard.Image />
          <MainCard.Content
            className='bg-red-100'
            iconColor='blue'
            priceClassName='text-green-300'
            ratingClassName='text-red-500'
            titleClassName='text-indigo-300'
          />
        </MainCard>
      </div>
      <DocCode
        code={`        <MainCard
        title='스카이다이빙'
        price={200000}
        bannerImageUrl='https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
        rating={4.8}
        reviewCount={121}
        className='w-[265px]'
      >
        <MainCard.Image />
        <MainCard.Content />
      </MainCard>`}
      />

      <div className='mb-50 grid max-w-6xl grid-cols-1 gap-30 md:grid-cols-2 lg:grid-cols-4'>
        {dummyCards.map((card, index) => (
          <MainCard
            key={index}
            bannerImageUrl={card.bannerImageUrl}
            price={card.price}
            rating={card.rating}
            reviewCount={card.reviewCount}
            title={card.title}
          >
            <MainCard.Image />
            <MainCard.Content />
          </MainCard>
        ))}
      </div>

      <div className='mb-100 grid max-w-6xl grid-cols-1 gap-30 md:grid-cols-2 lg:grid-cols-4'>
        {dummyCards.map((card, index) => (
          <MainCard
            key={index}
            bannerImageUrl={card.bannerImageUrl}
            price={card.price}
            rating={card.rating}
            reviewCount={card.reviewCount}
            title={card.title}
          >
            <MainCard.Image />
            <MainCard.Content
              className='bg-red-100'
              iconColor='blue'
              priceClassName='text-green-300'
              ratingClassName='text-red-500'
              titleClassName='text-indigo-300'
            />
          </MainCard>
        ))}
      </div>
      <DocCode
        code={`         <MainCard
        title='스카이다이빙'
        price={200000}
        bannerImageUrl='https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
        rating={4.8}
        reviewCount={121}
        className=''
      >
        <MainCard.Image />
        <MainCard.Content
          titleClassName='text-indigo-300'
          priceClassName='text-green-300'
          ratingClassName='text-red-500'
          iconColor='blue'
          className='bg-red-100'
        />
      </MainCard>`}
      />
    </>
  );
}

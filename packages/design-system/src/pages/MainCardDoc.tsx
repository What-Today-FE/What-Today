import Playground from '@/layouts/Playground';

import MainCard from '../components/MainCard';
import DocTemplate, { DocCode } from '../layouts/DocTemplate';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `<MainCard
  title='스카이다이빙'
  price={200000}
  bannerImageUrl='https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
  rating={4.8}
 reviewCount={121}
  className='w-[265px]'
>
  <MainCard.Image />
  <MainCard.Content />
</MainCard>`;

export default function MainCardDoc() {
  return (
    <>
      <DocTemplate
        description={`
# MainCard 컴포넌트

Main에서 쓰이는 인기체험 모든체험 Card입니다.
`}
        propsDescription={`
  | 이름               | 타입        | 설명                                                             |
  |--------------------|-------------|------------------------------------------------------------------|
  | title              | string      | 체험의 제목입니다.                                               |
  | price              | number      | 체험 가격 (₩ 단위 숫자)입니다.                                  |
  | bannerImageUrl     | string      | 배경 이미지 URL입니다.                                          |
  | rating             | number      | 평균 평점입니다 (예: 4.8).                                       |
  | reviewCount        | number      | 리뷰 수입니다.                                                   |
  | className          | string?     | 카드 전체 wrapper(MainCard)에 적용할 커스텀 Tailwind 클래스입니다. |
  
| MainCard.Image 전용 Props | 타입      | 설명                                                           |
|---------------------------|-----------|----------------------------------------------------------------|
| className                | string?   | 이미지에 적용할 Tailwind 클래스입니다.                         |
  
  | MainCard.Content 전용 Props | 타입      | 설명                                                           |
  |-----------------------------|-----------|----------------------------------------------------------------|
  | className                  | string?   | 컨텐츠 카드 (흰색 박스)에 적용할 Tailwind 클래스입니다.        |
  | titleClassName            | string?   | 제목 텍스트에 적용할 클래스입니다.                             |
  | ratingClassName           | string?   | 평점 숫자에 적용할 클래스입니다.                               |
  | priceClassName            | string?   | 가격 텍스트에 적용할 클래스입니다.                             |
  | iconColor                 | string?   | 별 아이콘 색상 (기본값: #FFC23D)입니다.                        |
  `}
        title='MainCard'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}

      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <Playground code={code} scope={{ MainCard }} />
      </div>
      <h3 className='text-2xl'>기본 MainCard 예시 입니다.</h3>
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

      <h3 className='text-2xl'>커스텀 MainCard 예시 입니다.</h3>

      <div>
        <MainCard
          bannerImageUrl='https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
          className='w-[265px]'
          price={200000}
          rating={4.8}
          reviewCount={121}
          title='스카이다이빙'
        >
          <MainCard.Image className='rounded-t-3xl brightness-90 contrast-125' />
          <MainCard.Content
            className='rounded-b-3xl border-t border-white/10 bg-gradient-to-t from-black/60 to-transparent px-16 py-12 shadow-xl'
            iconColor='#FFD700' // 골드 컬러
            priceClassName='text-pink-400 font-bold text-lg'
            ratingClassName='text-emerald-300 font-semibold'
            titleClassName='text-white font-extrabold tracking-wider drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]'
          />
        </MainCard>
      </div>

      <DocCode
        code={`         <MainCard
          bannerImageUrl='https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
          className='w-[265px]'
          price={200000}
          rating={4.8}
          reviewCount={121}
          title='스카이다이빙'
        >
          <MainCard.Image className='rounded-t-3xl brightness-90 contrast-125' />
          <MainCard.Content
            className='rounded-b-3xl border-t border-white/10 bg-gradient-to-t from-black/60 to-transparent px-16 py-12 shadow-xl'
            iconColor='#FFD700' // 골드 컬러
            titleClassName='text-white font-extrabold tracking-wider drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]'
            ratingClassName='text-emerald-300 font-semibold'
            priceClassName='text-pink-400 font-bold text-lg'
          />
        </MainCard>`}
      />
    </>
  );
}

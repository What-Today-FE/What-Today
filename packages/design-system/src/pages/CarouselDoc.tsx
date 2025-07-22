import Playground from '@/layouts/Playground';

import Carousel from '../components/Carousel/Carousel';
import DocTemplate, { DocCode } from '../layouts/DocTemplate';

export default function CarouselDoc() {
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
      title: '요트 투어',
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
      title: '요트 투어',
      price: 75000,
      rating: 4.6,
      reviewCount: 88,
      bannerImageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 12,
      title: '요트 투어',
      price: 75000,
      rating: 4.6,
      reviewCount: 88,
      bannerImageUrl: 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  const code = `<Carousel items={items} itemsPerPage={4} />`;

  return (
    <>
      <DocTemplate
        description={`
# Carousel 컴포넌트

Carousel 컴포넌트는 여러 개의 카드 컴포넌트를 슬라이드 형태로 보여주는 UI 컴포넌트입니다.

- 좌우 버튼을 눌러 페이지 단위로 이동할 수 있습니다.
- 한 페이지에 표시할 카드 개수는 \`itemsPerPage\`로 지정합니다.
- \`items\`에는 카드에 들어갈 데이터를 배열로 전달하면 됩니다.
- 반응형 설정 없이, 항상 고정된 개수로 보여주는 방식입니다.
        `}
        propsDescription={`
| 이름 | 타입 | 필수 | 설명 |
|------|------|------|------|
| items | T[] | yes | 렌더링할 카드 데이터 배열입니다. 각 아이템은 고유한 \`id\`를 포함해야 합니다. |
| itemsPerPage | number | yes | 한 번에 보여줄 카드의 개수를 지정합니다. |
        `}
        title='Carousel'
      />

      <DocCode code={code} />

      {/* Playground 예시 */}
      <div className='mt-20'>
        <Playground code={code} scope={{ Carousel, items: dummyData }} />
      </div>
    </>
  );
}

import Playground from '@/layouts/Playground';

import { ActivityCardGridSkeleton, CarouselSkeleton } from '../components/MainPageSkeleton/MainPageSkeleton';
import DocTemplate, { DocCode } from '../layouts/DocTemplate';

/* Playground에서 사용할 예시 코드 */
const code = `
<>
  {/* 인기 체험 섹션 */}
  <section>
    <h2 className='mb-12 text-2xl font-bold'>인기 체험</h2>
    <CarouselSkeleton count={4} />
  </section>

  {/* 모든 체험 섹션 */}
  <section className='mt-32'>
    <h2 className='mb-12 text-2xl font-bold'>모든 체험</h2>
    <div className='grid grid-cols-2 gap-12 md:grid-cols-2 xl:grid-cols-4'>
      <ActivityCardGridSkeleton />
    </div>
  </section>
</>
`;

export default function MainPageSkeletonDoc() {
  return (
    <>
      <DocTemplate
        description={`
# MainPageSkeleton 컴포넌트

MainPageSkeleton은 반응형 레이아웃에 맞춰 카드 스켈레톤을 표시하는 컴포넌트입니다.

- **ActivityCardGridSkeleton** : 메인 페이지 전체 카드 리스트 로딩 상태에서 사용
- **CarouselSkeleton** : 인기 체험 섹션 등 캐러셀 레이아웃 로딩 상태에서 사용
`}
        propsDescription={`
| 이름 | 타입 | 설명 |
|------|------|------|
| count | number | 캐러셀에서 한 번에 보여줄 카드 개수 (기본값: 4) |
`}
        title='MainPageSkeleton'
      />

      {/* 예시 코드 */}
      <DocCode code={code} />

      {/* Playground */}
      <div className='mt-24'>
        <Playground code={code} scope={{ ActivityCardGridSkeleton, CarouselSkeleton }} />
      </div>
    </>
  );
}

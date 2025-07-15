import ExperienceCard from '@/components/ExperienceCard';
import DocTemplate, { DocCode } from '@/layouts/DocTemplate';
import Playground from '@/layouts/Playground';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `<ExperienceCard title='내가 등록한 체험 제목입니다' price={8000} bannerImageUrl='https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/02/urban-20230228144115810458.jpg' rating={4.5} reviewCount={161} onEdit={()=>console.log('수정하기')} onDelete={()=>console.log('삭제하기')}/>`;

export default function ExperienceCardDoc() {
  return (
    <>
      <DocTemplate
        description={`
체험 카드 컴포넌트는 체험/클래스 상품 정보를 시각적으로 표현하기 위한 요소입니다.  
제목, 가격, 이미지, 평점, 리뷰 수, 그리고 수정/삭제 버튼 등의 기능을 포함합니다.

아래는 기본적인 사용 예시입니다:

\`\`\`tsx
import { ExperienceCard } from '@what-today/design-system';

<ExperienceCard
  title="도예 원데이 클래스"
  price={30000}
  bannerImageUrl="https://source.unsplash.com/random/300x200?ceramics"
  rating={4.8}
  reviewCount={92}
  onEdit={() => {}}
  onDelete={() => {}}
/>
\`\`\`
`}
        propsDescription={`
| Prop           | Type            | Required | Description                        |
|----------------|-----------------|----------|------------------------------------|
| title          | string          | Yes      | 체험 제목                          |
| price          | number          | Yes      | 1인 가격                           |
| bannerImageUrl | string          | Yes      | 배너 이미지 URL                    |
| rating         | number          | Yes      | 별점 (0~5)                         |
| reviewCount    | number          | Yes      | 리뷰 수                            |
| onEdit         | () => void      | Yes      | '수정하기' 버튼 클릭 시 핸들러     |
| onDelete       | () => void      | Yes      | '삭제하기' 버튼 클릭 시 핸들러     |
`}
        title='ExperienceCard'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <h3 className='mb-8 text-base font-semibold text-gray-600'>기본 예시</h3>
      <ExperienceCard
        bannerImageUrl='https://imgcp.aacdn.jp/img-a/1200/auto/global-aaj-front/article/2018/04/5ad9a61f500f3_5ad9a4902c586_1026847964.jpg'
        price={30000}
        rating={4.8}
        reviewCount={92}
        title='도예 원데이 클래스'
        onDelete={() => {}}
        onEdit={() => {}}
      />
      <DocCode
        code={`<ExperienceCard
  title="도예 원데이 클래스"
  price={30000}
  bannerImageUrl='https://imgcp.aacdn.jp/img-a/1200/auto/global-aaj-front/article/2018/04/5ad9a61f500f3_5ad9a4902c586_1026847964.jpg'
  rating={4.8}
  reviewCount={92}
  onEdit={() => {}}
  onDelete={() => {}}
/>`}
      />

      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <Playground code={code} scope={{ ExperienceCard }} />
      </div>
    </>
  );
}

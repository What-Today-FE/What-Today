import MypageSidebar from '@/components/MypageSidebar';
import DocTemplate, { DocCode } from '@/layouts/DocTemplate';
import Playground from '@/layouts/Playground';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `<MypageSidebar onClick={()=> alert('클릭!')} profileImgUrl='https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/02/urban-20230228144115810458.jpg' />`;

export default function MypageSidebarDoc() {
  return (
    <>
      <DocTemplate
        description={`MypageSidebar 컴포넌트는 마이페이지 전용 사이드 네비게이션 UI입니다.  
프로필 이미지와 함께 고정된 5개의 메뉴 항목(내 정보, 예약 내역, 내 체험 관리, 예약 현황, 로그아웃)을 보여주며, 각 항목 클릭 시 상위에서 지정한 콜백 함수가 실행됩니다.

아래는 기본적인 사용 예시입니다:
\`\`\`tsx
import MypageSidebar from '@what-today/design-system';

<MypageSidebar
  profileImgUrl="https://example.com/profile.png"
  onClick={(label) => console.log(label)}
/>
\`\`\`
`}
        propsDescription={`
| Prop          | Type                     | Required | Description                                   |
|---------------|--------------------------|----------|-----------------------------------------------|
| profileImgUrl | \`string\`                | No       | 사용자 프로필 이미지 URL                       |
| onClick       | \`(label: string) => void\` | Yes      | 메뉴 항목 클릭 시 호출되는 콜백 함수 (label 전달됨) |
`}
        title='MypageSidebar'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <h3 className='mb-8 text-base font-semibold text-gray-600'>기본 사용 예 (프로필 이미지 없는 경우)</h3>
      <MypageSidebar onClick={(label) => alert(label + ' 클릭됨')} />
      <DocCode code={`<MypageSidebar onClick={(label) => alert(label + ' 클릭됨')} />`} />

      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <Playground code={code} scope={{ MypageSidebar }} />
      </div>
    </>
  );
}

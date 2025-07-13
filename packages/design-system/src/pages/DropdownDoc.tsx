import Dropdown from '@/components/dropdown/Dropdown';
import DropdownItem from '@/components/dropdown/DropdownItem';
import DropdownMenu from '@/components/dropdown/DropdownMenu';
import DropdownTrigger from '@/components/dropdown/DropdownTrigger';
import DocTemplate, { DocCode } from '@/layouts/DocTemplate';
import Playground from '@/layouts/Playground';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `<Dropdown>
        <DropdownTrigger />
        <DropdownMenu>
          <DropdownItem onClick={() => alert('수정하기')}>수정하기</DropdownItem>
          <DropdownItem onClick={() => alert('삭제하기')}>삭제하기</DropdownItem>
        </DropdownMenu>
      </Dropdown>`;

export default function DropdownDoc() {
  return (
    <>
      <DocTemplate
        description={`
Dropdown은 버튼을 클릭했을 때 메뉴 리스트를 표시하는 컴포넌트입니다.  
합성 컴포넌트 패턴으로 구성되어 있어 선언적으로 사용하며 각 역할을 명확히 나눌 수 있습니다.

- Dropdown: 상태를 관리하고 Context를 제공하는 최상위 컴포넌트입니다.
- DropdownTrigger: 드롭다운을 열고 닫는 버튼 역할입니다.
- DropdownMenu: 드롭다운이 열렸을 때 표시되는 영역입니다.
- DropdownItem: 실제 메뉴 항목입니다. 클릭 시 드롭다운을 자동으로 닫을 수 있습니다.
`}
        propsDescription={`
### Dropdown

| 이름 | 타입 | 설명 |
|------|------|------|
| children | React.ReactNode | 드롭다운 하위 요소들을 포함합니다. |

### DropdownTrigger (button 확장)

| 이름 | 타입 | 설명 |
|------|------|------|
| ...props | ButtonHTMLAttributes | HTML button 요소에 전달되는 모든 속성을 지원합니다. |

### DropdownMenu (div 확장)

| 이름 | 타입 | 설명 |
|------|------|------|
| ...props | HTMLAttributes | HTML div 요소에 전달되는 모든 속성을 지원합니다. |

### DropdownItem (div 확장)

| 이름 | 타입 | 설명 |
|------|------|------|
| onClick | (e: MouseEvent) => void | 클릭 시 실행할 동작입니다. 클릭 후 드롭다운은 자동으로 닫힙니다. |
| ...props | HTMLAttributes | HTML div 요소에 전달되는 모든 속성을 지원합니다. |
`}
        title='Dropdown'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <DocCode
        code={`<Dropdown>
  <DropdownTrigger className="bg-blue-500 text-white px-4 py-2 rounded">
    메뉴 열기
  </DropdownTrigger>
  <DropdownMenu className="mt-2 w-40 bg-white rounded shadow">
    <DropdownItem onClick={() => alert('수정하기')}>수정하기</DropdownItem>
    <DropdownItem onClick={() => alert('삭제하기')}>삭제하기</DropdownItem>
  </DropdownMenu>
</Dropdown>`}
      />

      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <Playground code={code} scope={{ Dropdown, DropdownTrigger, DropdownMenu, DropdownItem }} />
      </div>
    </>
  );
}

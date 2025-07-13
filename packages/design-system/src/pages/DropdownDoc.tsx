import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@/components';
import DocTemplate, { DocCode } from '@/layouts/DocTemplate';

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

아래는 기본적인 사용 예시입니다:

\`\`\`tsx
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@what-today/design-system';

<Dropdown>
  <DropdownTrigger />
  <DropdownMenu className="">
    <DropdownItem onClick={() => alert('수정')}>수정하기</DropdownItem>
    <DropdownItem onClick={() => alert('삭제')}>삭제하기</DropdownItem>
  </DropdownMenu>
</Dropdown>
\`\`\`
`}
        propsDescription={`
### Dropdown

| 이름 | 타입 | 설명 |
|------|------|------|
| children | React.ReactNode | 드롭다운 하위 요소들을 포함합니다. |

### DropdownTrigger

| 이름 | 타입 | 설명 |
|------|------|------|
| children? | React.ReactNode | 버튼 내부에 표시할 내용입니다. |
| className? | string | 버튼에 적용할 CSS 클래스명입니다. |

### DropdownMenu

| 이름 | 타입 | 설명 |
|------|------|------|
| className? | string | 메뉴에 적용할 CSS 클래스명입니다. |
| children | React.ReactNode | 메뉴 내부에 표시할 내용입니다. |

### DropdownItem

| 이름 | 타입 | 설명 |
|------|------|------|
| className? | string | 메뉴 항목에 적용할 CSS 클래스명입니다. |
| children | React.ReactNode | 메뉴 항목에 표시할 내용입니다. |
| onClick | (e: MouseEvent) => void | 클릭 시 실행할 함수입니다. 실행 후 드롭다운은 자동으로 닫힙니다. |
`}
        title='Dropdown'
      />
      <h2 className='text-2xl'>기본 드롭다운</h2>
      <DocCode
        code={`<Dropdown>
  <DropdownTrigger />
  <DropdownMenu>
    <DropdownItem onClick={() => alert('수정하기')}>수정하기</DropdownItem>
    <DropdownItem onClick={() => alert('삭제하기')}>삭제하기</DropdownItem>
  </DropdownMenu>
</Dropdown>`}
      />
      <div className='h-200 pl-100'>
        <Dropdown>
          <DropdownTrigger />
          <DropdownMenu>
            <DropdownItem onClick={() => alert('수정하기')}>수정하기</DropdownItem>
            <DropdownItem onClick={() => alert('삭제하기')}>삭제하기</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <h2 className='text-2xl'>커스텀 드롭다운</h2>
      <DocCode
        code={`<Dropdown>
  <DropdownTrigger className='rounded-full border p-4 text-sm'>버튼</DropdownTrigger>
  <DropdownMenu className='top-full -left-30 mt-4'>
    <DropdownItem onClick={() => alert('등록하기')}>등록하기</DropdownItem>
    <DropdownItem className='hover:bg-red-200' onClick={() => alert('수정하기')}>
      수정하기
    </DropdownItem>
    <DropdownItem onClick={() => alert('삭제하기')}>삭제하기</DropdownItem>
  </DropdownMenu>
</Dropdown>`}
      />
      <div className='h-200 pl-100'>
        <Dropdown>
          <DropdownTrigger className='rounded-full border p-4 text-sm'>버튼</DropdownTrigger>
          <DropdownMenu className='top-full -left-30 mt-4'>
            <DropdownItem onClick={() => alert('등록하기')}>등록하기</DropdownItem>
            <DropdownItem className='hover:bg-red-200' onClick={() => alert('수정하기')}>
              수정하기
            </DropdownItem>
            <DropdownItem onClick={() => alert('삭제하기')}>삭제하기</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
}

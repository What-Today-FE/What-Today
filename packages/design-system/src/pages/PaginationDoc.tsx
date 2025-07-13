import { useState } from 'react';

import Pagination from '../components/Pagination';
import DocTemplate, { DocCode } from '../layouts/DocTemplate';

export default function PaginationDoc() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <DocTemplate
        description={`
페이지네이션 컴포넌트는 콘텐츠를 여러 페이지로 나누고, 사용자가 원하는 페이지로 이동할 수 있도록 돕는 UI 요소입니다. 각 페이지 번호를 클릭하면 해당 페이지의 콘텐츠가 표시됩니다.

아래는 기본적인 사용 예시입니다:

\`\`\`tsx
import { Pagination } from '@what-today/design-system';

<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
\`\`\`
        `}
        propsDescription={`
| Prop         | Type                         | Required | Description            |
|--------------|------------------------------|----------|------------------------|
| currentPage  | number                       | Yes      | 현재 선택된 페이지 번호      |
| totalPages   | number                       | Yes      | 전체 페이지 수             |  
| onPageChange | (page: number) => void       | Yes      | 페이지 변경 핸들러 
| classNames   | { prev?: string; next?: string; page?: string; activePage?: string; ellipsis?: string; } | No | 각 버튼에 적용할 클래스 이름들을 커스터마이징 가능 |
| isLoading    | boolean                      | No       | 로딩 중일 때 버튼 클릭을 방지하며, 모든 버튼이 비활성화됨          
        `}
        title='Pagination (Example Doc)'
      />

      <h2 className='text-2xl'>페이지네이션 버튼</h2>
      <div className='flex flex-col items-start gap-20'>
        <Pagination currentPage={currentPage} totalPages={20} onPageChange={setCurrentPage} />

        <h2 className='text-xl'>ClassName 사용예시</h2>
        <DocCode
          code={`<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  classNames={{
    prev: 'text-red-500', // 이전 버튼 커스텀 스타일
    next: 'text-green-500', // 다음 버튼 커스텀 스타일
    page: 'bg-white rounded-md', // 일반 페이지 버튼 -> 선택되지 않은 페이지 버튼
    activePage: 'bg-blue-100 font-bold', // 현재 페이지 버튼
    ellipsis: 'text-black opacity-70', // 생략 기호 (...)
  }}
/>`}
        />

        <Pagination
          classNames={{
            prev: 'text-red-500', // 이전 버튼 커스텀 스타일
            next: 'text-green-500', // 다음 버튼 커스텀 스타일
            page: 'bg-white rounded-md', // 일반 페이지 버튼
            activePage: 'bg-blue-100 font-bold', // 현재 페이지 버튼
            ellipsis: 'text-black opacity-70', // 생략 기호 (...)
          }}
          currentPage={currentPage}
          totalPages={20} //예시를 위해서 하드코딩
          onPageChange={setCurrentPage}
        />

        <div>
          <h2 className='text-xl'>isLoading 사용 예시</h2>
          <p className='text-gray-200'>isLoading 사용 시 useState로 상태관리</p>
          <DocCode
            code={`<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  isLoading={isLoading}
/>`}
          />
        </div>
      </div>
    </>
  );
}

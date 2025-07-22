import Playground from '@/layouts/Playground';

import MainSearchInput from '../components/MainSearchInput';
import DocTemplate, { DocCode } from '../layouts/DocTemplate';

/* Playground에서 사용할 예시 코드 */
const code = `<MainSearchInput/> `;

export default function MainSearchInputDoc() {
  return (
    <>
      <DocTemplate
        description={`
# MainSearchInput 컴포넌트

사용자가 입력한 검색어를 기반으로 동작하는 검색 입력창입니다.  
- 왼쪽에는 고정된 **돋보기 아이콘**이 있고  
- 오른쪽에는 **"검색하기" 버튼**이 배치되어 있습니다.  
- Enter 키 입력 또는 버튼 클릭 시 \`onSearch\` 콜백이 실행됩니다.
- 검색 후 input은 자동으로 비워집니다.
`}
        propsDescription={`
| 이름       | 타입                      | 설명                                                           |
|------------|---------------------------|----------------------------------------------------------------|
| onClick   | (keyword: string) => void | 검색어 입력 후 Enter 키 또는 검색 버튼 클릭 시 실행되는 함수입니다. |
`}
        title='MainSearchInput'
      />

      <DocCode code={code} />

      <DocCode
        code={`import MainSearchInput from '@what-today/design-system'
          
          <MainSearchInput
          onClick={handleSubmit}
          />
`}
      />

      <div className='mt-24'>
        <Playground code={code} scope={{ MainSearchInput }} />
      </div>
    </>
  );
}

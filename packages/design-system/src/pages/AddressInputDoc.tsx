import AddressInput from '@/components/addressInput/AddressInput';
import Playground from '@/layouts/Playground';

import DocTemplate, { DocCode } from '../layouts/DocTemplate';

/* Playground에서 사용할 예시 코드 */
const code = `
  <AddressInput />
`;

export default function AddressInputDoc() {
  return (
    <>
      <DocTemplate
        description={`
# AddressInput 컴포넌트

도로명 주소 검색을 위한 입력 UI입니다.  
사용자가 클릭 시 Daum 우편번호 검색 팝업이 열리고, 선택한 주소가 자동으로 입력됩니다.  
비제어 컴포넌트 방식으로 동작하며, \`react-hook-form\`과 함께 사용할 수 있도록 \`ref\`를 통해 DOM을 직접 제어합니다.  
필요 시 \`onChange\` 콜백을 통해 외부 상태로도 선택된 주소를 전달할 수 있습니다.
`}
        propsDescription={`
| 이름 | 타입 | 설명 |
|------|------|------|
| \`onChange\` | \`(value: string) => void\` | (선택) 주소가 선택되었을 때 외부로 값을 전달합니다. |
`}
        title='AddressInput'
      />

      <DocCode
        code={`// react-hook-form과 함께 사용
const { register, setValue } = useForm();
<AddressInput {...register('address')} onChange={(val) => setValue('address', val)} />

// 단독 사용
<AddressInput />`}
      />

      <div className='mt-24'>
        <Playground code={code} scope={{ AddressInput }} />
      </div>
    </>
  );
}

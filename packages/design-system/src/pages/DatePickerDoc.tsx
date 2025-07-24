import Playground from '@/layouts/Playground';

import DatePicker from '../components/DatePicker';
import DocTemplate, { DocCode } from '../layouts/DocTemplate';

/* Playground에서 사용할 예시 코드 */
const code = `<DatePicker />`;

export default function DatePickerDoc() {
  return (
    <>
      <DocTemplate
        description={`
# DatePicker 컴포넌트

사용자가 날짜를 선택할 수 있도록 달력을 표시하는 컴포넌트입니다.
클릭 시 달력이 팝업으로 열리며, 선택한 날짜는 input 필드에 표시됩니다.
`}
        propsDescription={`
| 이름 | 타입 | 설명 |
|------|------|------|
| - | - | 현재는 prop 없이 내부에서 상태 관리합니다. 추후 확장 가능 |
`}
        title='DatePicker'
      />

      {/* 예시 코드 출력 */}
      <DocCode code='<DatePicker />' />

      {/* Playground는 직접 DatePicker를 렌더링하는 부분 */}
      <div className='mt-24'>
        <Playground code={code} scope={{ DatePicker }} />
      </div>
    </>
  );
}

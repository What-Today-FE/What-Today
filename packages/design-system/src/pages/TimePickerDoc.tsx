import TimePicker from '@components/TimePicker';
import { useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

import DocTemplate, { DocCode } from '../layouts/DocTemplate';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `function Example() {
  const [selectedTime, setSelectedTime] = useState<{ hour: string; minute: string } | null>(null);

  return (
    <TimePicker value={selectedTime} onChange={setSelectedTime} />
  );
}

render(<Example />);`;

export default function TimePickerDoc() {
  const [selectedTime, setSelectedTime] = useState<{ hour: string; minute: string } | null>(null);

  return (
    <>
      <DocTemplate
        description={`
시간을 선택할 때 사용하는 TimePicker 컴포넌트입니다.  

외부에서는 **\`{ hour: string; minute: string }\`** 형식으로 상태 관리를 해야 합니다. (아래 코드를 참고해주세요.)
\`\`\`tsx
const [selectedTime, setSelectedTime] = useState<{ hour: string; minute: string } | null>(null);
\`\`\`

- 내부적으로 **Select 컴포넌트**를 확장하여 두 열(시/분)로 나뉘어 있습니다.
- 시(hour)는 **00~23**, 분(minute)은 **00, 05, 10, ..., 55**까지 5분 단위로 제공됩니다.

`}
        propsDescription={`
| 이름 | 타입 | 설명 |
|------|------|------|
| value      | \`{ hour: string; minute: string } \\| null\`                  | 선택된 시간을 나타내는 값입니다. 외부 상태에서 관리되어야 합니다.   |
| onChange   | \`Dispatch<SetStateAction<{ hour: string; minute: string } \\| null>>\` | 시간 선택 시 호출되는 콜백 함수입니다. 시 또는 분 중 하나만 변경됩니다. |

`}
        title='TimePicker'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <TimePicker value={selectedTime} onChange={setSelectedTime} />
      <p className='text-md text-gray-500'>
        선택된 시간: {selectedTime?.hour ?? '--'} : {selectedTime?.minute ?? '--'}
      </p>
      <DocCode code='<TimePicker value={selectedTime} onChange={setSelectedTime} />' />

      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <LiveProvider noInline code={code} language='tsx' scope={{ TimePicker, useState }}>
          <p className='mb-8 font-light text-gray-400'>4. Playground</p>
          <div className='rounded p-4'>
            <div className='mb-4'>
              <LiveEditor className='rounded-2xl bg-[#0B1522] p-10 font-mono text-sm' />
              <LiveError className='mt-2 text-sm text-red-500' />
            </div>
            <div className='mt-4 pt-4'>
              <p className='mb-8 font-light text-gray-400'>Output</p>
              <LivePreview />
            </div>
          </div>
        </LiveProvider>
      </div>
    </>
  );
}

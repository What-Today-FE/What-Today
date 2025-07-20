import { useToast } from '@components/Toast';
import { useNavigate } from 'react-router-dom';

import Playground from '@/layouts/Playground';

import DocTemplate, { DocCode } from '../layouts/DocTemplate';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `<button
          onClick={handleDefault}
          className="rounded bg-zinc-500 px-4 py-2 text-white hover:bg-zinc-600"
        >
          기본 토스트
        </button>
`;

export default function ToastDoc() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSuccess = () => {
    toast({
      title: '성공!',
      description: '정상적으로 처리되었습니다.',
      type: 'success',
    });
  };

  const handleError = () => {
    toast({
      title: '실패!',
      description: '문제가 발생했습니다.',
      type: 'error',
    });
  };

  const handleDefault = () => {
    toast({
      title: '안내',
      description: '이것은 기본 안내 메시지입니다.',
    });
  };

  const handleDefaultNavigate = () => {
    toast({
      title: '안내',
      description: '이것은 기본 안내 메시지입니다.',
    });
    navigate('/');
  };

  return (
    <>
      <DocTemplate
        description={`
# Toast 컴포넌트

\`toast\` 훅을 사용하여 다양한 상태의 알림 메시지를 사용자에게 보여줄 수 있습니다.

- 위치는 **화면 중앙 상단**이며, 지정한 시간만큼 표시된 뒤 사라집니다.
- 아이콘, 색상, 메시지를 상태에 따라 자동으로 다르게 보여줍니다.
- \`타입\` 값은 다음과 같습니다:
  - \`success\`: 초록 배경과 체크 아이콘
  - \`error\`: 빨간 배경과 경고 아이콘
  - \`default\`: 파란 배경과 정보 아이콘

- main.tsx의 router 위에 import { Toast } from '@components/Toast'; 로 불러온 <Toaster /> 컴포넌트를 추가해야 합니다.
- 이렇게 하면 페이지 이동 시에도 토스트가 유지됩니다.

## (사용자)사용 예시:
\`\`\`tsx
import { useToast } from '@components/Toast';

const { toast } = useToast(); // useToast 훅을 사용하여 toast 함수 호출해야 사용 가능합니다.

toast({
  title: "완료",
  description: "정상적으로 처리되었습니다.",
  type: "success"
});
\`\`\`
`}
        propsDescription={`
| 이름        | 타입        | 설명                               |
|-------------|-------------|------------------------------------|
| title       | string      | 토스트에 표시할 제목 텍스트입니다. |
| description | string      | 설명 텍스트입니다.                 |
| type        | ToastType   | 상태값: \`success , error , default\` (기본값: \`default\`) |
| duration    | number      | 표시 시간(ms). 기본: 3000ms       |
`}
        title='Toast'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <DocCode code={`toast({ title: "완료", description: "정상적으로 처리되었습니다.", type: "success" });`} />

      <div className='mb-8 flex gap-4'>
        <button className='rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600' onClick={handleSuccess}>
          성공 토스트
        </button>
        <button className='rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600' onClick={handleError}>
          실패 토스트
        </button>
        <button className='rounded bg-zinc-500 px-4 py-2 text-white hover:bg-zinc-600' onClick={handleDefault}>
          기본 토스트
        </button>
        <button
          className='bg-primary-500 rounded px-4 py-2 text-white hover:brightness-90'
          onClick={handleDefaultNavigate}
        >
          페이지 이동 테스트
        </button>
      </div>

      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <Playground code={code} scope={{ toast, handleSuccess, handleError, handleDefault }} />
      </div>
    </>
  );
}

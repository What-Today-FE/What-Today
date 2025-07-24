import { StarIcon } from '@components/icons';
import Modal from '@components/modal';
import { useRef, useState } from 'react';

import { WarningLogo } from '@/components';
import { Input } from '@/components/input';
import Playground from '@/layouts/Playground';

import DocTemplate, { DocCode } from '../layouts/DocTemplate';

const code = `
// useState 때문에 render가 안되는 것 같아서 playgound말고 DocCode에 설명하겠습니다
`;

const test1code = `
<Modal.Root open={isBasicOpen} onClose={() => setIsBasicOpen(false)}>
  <Modal.Content>
    <Modal.CloseButton />
    <h2 className='mb-4 text-xl font-semibold'>알림</h2>
    <p className='mb-6 text-gray-600'>
      이것은 기본 모달 예시입니다. X 버튼, ESC 키, 배경 클릭으로 닫을 수 있습니다.
    </p>
    <Modal.Actions>
      <Modal.CancelButton>닫기</Modal.CancelButton>
    </Modal.Actions>
  </Modal.Content>
</Modal.Root>`;

const test2code = `
<Modal.Root open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
  <Modal.Content>
    <div className='text-center'>
      <h2 className='mb-4 text-lg font-semibold'>정말로 삭제하시겠습니까?</h2>
      <p className='mb-6 text-gray-600'>이 작업은 되돌릴 수 없습니다.</p>
    </div>
    <Modal.Actions>
      <Modal.CancelButton>취소</Modal.CancelButton>
      <Modal.ConfirmButton onClick={() => alert('삭제되었습니다!')}>삭제</Modal.ConfirmButton>
    </Modal.Actions>
  </Modal.Content>
</Modal.Root>`;

const saveCode = `
<Modal.Root open={isSaveOpen} onClose={() => setIsSaveOpen(false)}>
  <Modal.Content className='flex max-w-300 flex-col items-center gap-6 text-center md:max-w-350 lg:max-w-400'>
    <WarningLogo className='md:size-110 lg:size-150' size={88} />
    <p className='text-2lg font-bold'>저장되지 않았습니다.</p>
    <p className='text-2lg font-bold'>정말 뒤로 가시겠습니까?</p>
    <Modal.Actions>
      <Modal.CancelButton>아니요</Modal.CancelButton>
      <Modal.ConfirmButton onClick={() => alert('체험이 삭제되었습니다!')}>네</Modal.ConfirmButton>
    </Modal.Actions>
  </Modal.Content>
</Modal.Root>`;

const deleteCode = `
<Modal.Root open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
  <Modal.Content className='flex max-w-300 flex-col items-center gap-6 text-center md:max-w-350 lg:max-w-400'>
    <div className='flex flex-col items-center gap-6 text-center'>
      <WarningLogo className='md:size-110 lg:size-150' size={88} />
      <p className='text-2lg font-bold'>체험을 삭제하시겠습니까?</p>
    </div>
    <Modal.Actions>
      <Modal.CancelButton>아니요</Modal.CancelButton>
      <Modal.ConfirmButton onClick={() => alert('체험이 삭제되었습니다!')}>네</Modal.ConfirmButton>
    </Modal.Actions>
  </Modal.Content>
</Modal.Root>`;

const reviewCode = `
<Modal.Root open={isReviewOpen} onClose={() => setIsReviewOpen(false)}>
  <Modal.Content className='flex max-w-385 flex-col items-center gap-6 text-center'>
    <Modal.CloseButton />
    <h2 className='mt-22 text-lg font-bold'>함께 배우면 즐거운 스트릿 댄스</h2>
    <p className='text-md text-gray-500'>2023. 02. 14/ 11:00 ~ 12:30 (10명)</p>
    <div className='flex flex-row items-center gap-16'>
      <StarIcon filled className='size-42' /> <StarIcon filled className='size-42' />{' '}
      <StarIcon filled className='size-42' /> <StarIcon className='size-42' />{' '}
      <StarIcon className='size-42' />
    </div>
    <Input.Root error='입력되지 않았습니다.' size='xs'>
      <Input.Label className='mt-24 mb-16 self-start text-left font-bold'>
        소중한 경험을 들려주세요
      </Input.Label>
      <Input.Wrapper>
        <Input.Textarea
          ref={textareaRef}
          className='h-180'
          maxLength={100}
          placeholder='크기 조정이 불가능한 textarea입니다.'
          value={value}
          onChange={handleChange}
        />
      </Input.Wrapper>
      <Input.ErrorMessage />
      <Input.TextCounter length={value.length} maxLength={100} />
    </Input.Root>
    <Modal.Actions>
      <Modal.ConfirmButton onClick={() => alert('리뷰가 작성되었습니다!')}>작성하기</Modal.ConfirmButton>
    </Modal.Actions>
  </Modal.Content>
</Modal.Root>`;

export default function ModalDoc() {
  const [isBasicOpen, setIsBasicOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <DocTemplate
        description={`
# Modal 컴포넌트

모달(Modal)은 사용자와의 중요한 상호작용을 유도하거나 정보를 전달할 때 사용되는 오버레이 UI입니다.

## 특징

- **합성 컴포넌트 패턴**: 필요한 부분만 조합하여 사용 가능
- **Context API 기반 상태 공유**
- **Portal 및 Overlay 구성 내장**
- **ESC 키 닫기 / 외부 클릭 감지 / 배경 스크롤 방지 포함**
- **선택적 CloseButton (X 버튼) 지원**
- **반응형 디자인 지원**

## 구성 요소

- \`Modal.Root\`: 모달 상태 및 제어 기능 제공
- \`Modal.Content\`: 모달 콘텐츠와 오버레이 구성
- \`Modal.CloseButton\`: 우측 상단 X 버튼 (선택적)
- \`Modal.Actions\`: 하단 버튼 정렬 컨테이너
- \`Modal.CancelButton\`: 단순 닫기 액션 수행
- \`Modal.ConfirmButton\`: 주요 액션 수행 후 모달 닫힘
        `}
        propsDescription={`
## Modal.Root Props

| 이름 | 타입 | 필수 | 설명 |
|------|------|------|------|
| open | boolean | ✅ | 모달의 열림 여부 |
| onClose | () => void | ✅ | 모달 닫기 함수 |
| children | ReactNode | ✅ | 모달 내부 내용 |

## Modal.Content Props

| 이름 | 타입 | 필수 | 설명 |
|------|------|------|------|
| children | ReactNode | ✅ | 모달 콘텐츠 |
| className | string | ❌ | 커스텀 클래스 |

## Modal.Actions Props

| 이름 | 타입 | 필수 | 설명 |
|------|------|------|------|
| children | ReactNode | ✅ | 버튼들 |
| className | string | ❌ | 추가 스타일 |

## Modal.CancelButton Props

| 이름 | 타입 | 필수 | 설명 |
|------|------|------|------|
| children | ReactNode | ✅ | 버튼 텍스트 |
| className | string | ❌ | 스타일 |

## Modal.ConfirmButton Props

| 이름 | 타입 | 필수 | 설명 |
|------|------|------|------|
| children | ReactNode | ✅ | 버튼 텍스트 |
| className | string | ❌ | 스타일 |
| onClick | () => void | ❌ | 클릭 시 실행될 로직 |
        `}
        title='Modal'
      />

      {/* 실사용 데모 */}
      <div className='mt-8 space-y-6'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>기본 사용법</h3>

          <button
            className='rounded bg-blue-500 px-4 py-2 text-white hover:brightness-90 active:brightness-75'
            onClick={() => setIsBasicOpen(true)}
          >
            기본 모달 열기
          </button>

          {/* 기본 모달 코드 블록 */}
          <DocCode code={test1code} />

          <button
            className='rounded bg-red-500 px-4 py-2 text-white hover:brightness-90 active:brightness-75'
            onClick={() => setIsConfirmOpen(true)}
          >
            확인 모달 열기
          </button>

          {/* 확인 모달 코드 블록 */}
          <DocCode code={test2code} />

          <button
            className='rounded bg-green-500 px-4 py-2 text-white hover:brightness-90 active:brightness-75'
            onClick={() => setIsDeleteOpen(true)}
          >
            삭제/취소 모달 열기
          </button>

          {/* 삭제/취소 모달 코드 블록 */}
          <DocCode code={deleteCode} />

          <button
            className='rounded bg-orange-500 px-4 py-2 text-white hover:brightness-90 active:brightness-75'
            onClick={() => setIsSaveOpen(true)}
          >
            임시 저장 모달 열기
          </button>

          {/* 임시 저장 모달 코드 블록 */}
          <DocCode code={saveCode} />

          <button
            className='rounded bg-purple-500 px-4 py-2 text-white hover:brightness-90 active:brightness-75'
            onClick={() => setIsReviewOpen(true)}
          >
            리뷰 모달
          </button>

          {/* 리뷰 모달 코드 블록 */}
          <DocCode code={reviewCode} />

          {/* 기본 모달 */}
          <Modal.Root open={isBasicOpen} onClose={() => setIsBasicOpen(false)}>
            <Modal.Content>
              <Modal.CloseButton />
              <h2 className='mb-4 text-xl font-semibold'>알림</h2>
              <p className='mb-6 text-gray-600'>
                이것은 기본 모달 예시입니다. X 버튼, ESC 키, 배경 클릭으로 닫을 수 있습니다.
              </p>
              <Modal.Actions>
                <Modal.CancelButton>닫기</Modal.CancelButton>
              </Modal.Actions>
            </Modal.Content>
          </Modal.Root>

          {/* 확인 모달 */}
          <Modal.Root open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
            <Modal.Content>
              <div className='text-center'>
                <h2 className='mb-4 text-lg font-semibold'>정말로 삭제하시겠습니까?</h2>
                <p className='mb-6 text-gray-600'>이 작업은 되돌릴 수 없습니다.</p>
              </div>
              <Modal.Actions>
                <Modal.CancelButton>취소</Modal.CancelButton>
                <Modal.ConfirmButton onClick={() => alert('삭제되었습니다!')}>삭제</Modal.ConfirmButton>
              </Modal.Actions>
            </Modal.Content>
          </Modal.Root>

          {/* 삭제/취소 모달 */}
          <Modal.Root open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
            <Modal.Content className='flex max-w-300 flex-col items-center gap-6 text-center md:max-w-350 lg:max-w-400'>
              <div className='flex flex-col items-center gap-6 text-center'>
                <WarningLogo className='md:size-110 lg:size-150' size={88} />
                <p className='text-2lg font-bold'>체험을 삭제하시겠습니까?</p>
              </div>
              <Modal.Actions>
                <Modal.CancelButton>아니요</Modal.CancelButton>
                <Modal.ConfirmButton onClick={() => alert('체험이 삭제되었습니다!')}>네</Modal.ConfirmButton>
              </Modal.Actions>
            </Modal.Content>
          </Modal.Root>

          {/* 임시 저장 모달 */}
          <Modal.Root open={isSaveOpen} onClose={() => setIsSaveOpen(false)}>
            <Modal.Content className='flex max-w-300 flex-col items-center gap-6 text-center md:max-w-350 lg:max-w-400'>
              <WarningLogo className='md:size-110 lg:size-150' size={88} />
              <p className='text-2lg font-bold'>저장되지 않았습니다.</p>
              <p className='text-2lg font-bold'>정말 뒤로 가시겠습니까?</p>
              <Modal.Actions>
                <Modal.CancelButton>아니요</Modal.CancelButton>
                <Modal.ConfirmButton onClick={() => alert('체험이 삭제되었습니다!')}>네</Modal.ConfirmButton>
              </Modal.Actions>
            </Modal.Content>
          </Modal.Root>

          {/* 리뷰 모달 */}
          <Modal.Root open={isReviewOpen} onClose={() => setIsReviewOpen(false)}>
            <Modal.Content className='flex max-w-385 flex-col items-center gap-6 text-center'>
              <Modal.CloseButton />
              <h2 className='mt-22 text-lg font-bold'>함께 배우면 즐거운 스트릿 댄스</h2>
              <p className='text-md text-gray-500'>2023. 02. 14/ 11:00 ~ 12:30 (10명)</p>
              <div className='flex flex-row items-center gap-16'>
                <StarIcon filled className='size-42' /> <StarIcon filled className='size-42' />{' '}
                <StarIcon filled className='size-42' /> <StarIcon className='size-42' />{' '}
                <StarIcon className='size-42' />
              </div>
              <Input.Root error='입력되지 않았습니다.' size='xs'>
                <Input.Label className='mt-24 mb-16 self-start text-left font-bold'>
                  소중한 경험을 들려주세요
                </Input.Label>
                <Input.Wrapper>
                  <Input.Textarea
                    ref={textareaRef}
                    className='h-180'
                    maxLength={100}
                    placeholder='크기 조정이 불가능한 textarea입니다.'
                    value={value}
                    onChange={handleChange}
                  />
                </Input.Wrapper>
                <Input.ErrorMessage />
                <Input.TextCounter length={value.length} maxLength={100} />
              </Input.Root>
              <Modal.Actions>
                <Modal.ConfirmButton onClick={() => alert('리뷰가 작성되었습니다!')}>작성하기</Modal.ConfirmButton>
              </Modal.Actions>
            </Modal.Content>
          </Modal.Root>
        </div>
      </div>

      {/* 편집 가능한 Playground */}
      <div className='mt-24'>
        <Playground code={code} scope={{ Modal }} />
      </div>
    </>
  );
}

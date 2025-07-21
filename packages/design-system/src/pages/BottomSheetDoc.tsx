import { useState } from 'react';

import Playground from '@/layouts/Playground';

import { BottomSheet } from '../components/bottomsheet';
import DocTemplate, { DocCode } from '../layouts/DocTemplate';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `
// 테스트는 위에 Example 버튼을 눌러서 해주세요.

<BottomSheet.Root isOpen={isOpen} onClose={onClose}>
  <BottomSheet.Content>
    <h2>제목</h2>
    <p>역할이 명확히 분리된 완전한 바텀시트!</p>
  </BottomSheet.Content>
</BottomSheet.Root>`;

export default function BottomSheetDoc() {
  const [isOpen, setIsOpen] = useState(false);
  const [contentType, setContentType] = useState<'short' | 'medium' | 'long'>('short');

  const shortContent = (
    <BottomSheet.Content>
      <h2 className='mb-4 text-lg font-bold'>짧은 콘텐츠 테스트</h2>
      <p className='mb-4'>적은 양의 콘텐츠입니다. 바텀시트가 콘텐츠에 맞게 작은 높이로 자동 조절됩니다.</p>
      <div className='mb-4 rounded bg-green-50 p-3'>
        <p className='text-sm text-green-700'>✅ 어디서든 드래그로 닫을 수 있습니다</p>
      </div>
      <button className='rounded bg-red-500 px-4 py-2 text-white' onClick={() => setIsOpen(false)}>
        닫기
      </button>
    </BottomSheet.Content>
  );

  const mediumContent = (
    <BottomSheet.Content>
      <h2 className='mb-4 text-lg font-bold'>중간 콘텐츠 테스트</h2>
      <div className='mb-4 rounded bg-blue-50 p-3'>
        <p className='text-sm text-blue-700'>✅ 어디서든 드래그로 닫을 수 있습니다</p>
      </div>
      <div className='mb-4 space-y-3'>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className='rounded bg-gray-100 p-3'>
            <p>중간 길이 콘텐츠 {i + 1} - 적당한 양의 콘텐츠로 중간 높이가 됩니다.</p>
          </div>
        ))}
      </div>
      <button className='rounded bg-red-500 px-4 py-2 text-white' onClick={() => setIsOpen(false)}>
        닫기
      </button>
    </BottomSheet.Content>
  );

  const longContent = (
    <BottomSheet.Content>
      <h2 className='mb-4 text-lg font-bold'>긴 콘텐츠 테스트 (헤더 + 스마트 드래그)</h2>
      <div className='mb-4 border-l-4 border-orange-400 bg-orange-50 p-3'>
        <h4 className='mb-2 font-semibold text-orange-800'>🎯 헤더 + 스마트 드래그 기능</h4>
        <ul className='space-y-1 text-sm text-orange-700'>
          <li>
            • <strong>헤더 드래그</strong>: 스크롤 위치와 관계없이 언제나 바텀시트 닫기 가능
          </li>
          <li>
            • <strong>콘텐츠 드래그 (스크롤 맨 위)</strong>: 바텀시트 닫기 가능
          </li>
          <li>
            • <strong>콘텐츠 드래그 (스크롤 중간/아래)</strong>: 스크롤만 동작 (바텀시트 안 닫힘)
          </li>
        </ul>
      </div>
      <div className='mb-4 space-y-3'>
        {Array.from({ length: 25 }, (_, i) => (
          <div key={i} className='rounded bg-blue-50 p-3'>
            <h3 className='font-semibold'>항목 {i + 1}</h3>
            <p>
              긴 콘텐츠 예시입니다. 스크롤을 내린 상태에서 콘텐츠를 드래그하면 바텀시트가 닫히지 않지만, 헤더를
              드래그하면 언제나 닫힙니다.
            </p>
            {i === 0 && (
              <div className='mt-2 space-y-1 text-sm'>
                <p className='text-red-600'>
                  🎯 <strong>헤더 드래그</strong>: 언제나 바텀시트 닫기 가능
                </p>
                <p className='text-green-600'>
                  ✅ <strong>콘텐츠 드래그</strong>: 현재 맨 위라서 바텀시트 닫기 가능
                </p>
              </div>
            )}
            {i === 10 && (
              <div className='mt-2 space-y-1 text-sm'>
                <p className='text-red-600'>
                  🎯 <strong>헤더 드래그</strong>: 언제나 바텀시트 닫기 가능
                </p>
                <p className='text-blue-600'>
                  🚫 <strong>콘텐츠 드래그</strong>: 스크롤을 내렸다면 바텀시트 안 닫힘
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <button className='sticky bottom-0 rounded bg-red-500 px-4 py-2 text-white' onClick={() => setIsOpen(false)}>
        닫기
      </button>
    </BottomSheet.Content>
  );

  const handleOpenBottomSheet = (type: 'short' | 'medium' | 'long') => {
    setContentType(type);
    setIsOpen(true);
  };

  return (
    <>
      <BottomSheet.Root isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {contentType === 'short' && shortContent}
        {contentType === 'medium' && mediumContent}
        {contentType === 'long' && longContent}
      </BottomSheet.Root>

      <DocTemplate
        description={`
# BottomSheet 컴포넌트

Root, Header, Content로 역할이 분리된 바텀시트 컴포넌트입니다.



## 컴포넌트 구조
- **BottomSheet.Root**: 기본 구조와 드래그 처리
- **BottomSheet.Header**: 드래그 핸들 (언제나 닫기 가능)  
- **BottomSheet.Content**: 동적 높이 + 스크롤 처리

## 사용 방법
### 권장 방법 (Content 사용)
\`\`\`tsx
<BottomSheet.Root isOpen={isOpen} onClose={onClose}>
  <BottomSheet.Content>
    <h2>제목</h2>
    <p>동적 높이와 스크롤이 자동 처리됩니다!</p>
  </BottomSheet.Content>
</BottomSheet.Root>
\`\`\`

### 커스텀 방법 (직접 스타일링)
\`\`\`tsx
<BottomSheet.Root isOpen={isOpen} onClose={onClose}>
  <div className="p-4 h-64 overflow-y-auto">
    <h2>제목</h2>
    <p>직접 높이와 스크롤을 제어할 수 있습니다.</p>
  </div>
</BottomSheet.Root>
\`\`\`

## 역할 분리
- 🎯 **Root**: Portal, Overlay, 드래그 처리, Context 제공
- 🎯 **Header**: iOS 스타일 핸들, 헤더 전용 드래그
- 🎯 **Content**: 동적 높이, 스크롤 처리, 기본 패딩

## 헤더 + 스마트 드래그 기능
- 🎯 **헤더 드래그**: 스크롤 위치와 관계없이 언제나 바텀시트 닫기 가능
- 🧠 **콘텐츠 스마트 드래그**: 스크롤 위치에 따라 조건부 바텀시트 닫기
- 🎯 **영역별 구분**: 터치 시작 위치를 자동 감지하여 다른 동작 적용
- 🧠 **UX 최적화**: 사용자 의도에 맞는 자연스러운 상호작용

## 드래그 동작 로직
1. **헤더 영역 드래그**: 언제나 바텀시트 닫기 (스크롤 위치 무관)
2. **콘텐츠 영역 드래그 (스크롤 맨 위)**: 바텀시트 닫기
3. **콘텐츠 영역 드래그 (스크롤 중간/아래)**: 스크롤만 동작 (바텀시트 안 닫힘)

## 실제 사용 시나리오
- 📱 **일반적인 사용**: 헤더를 잡고 아래로 드래그해서 닫기
- 📱 **긴 콘텐츠**: 스크롤을 내린 후에도 헤더로 언제든 닫기 가능
- 📱 **스크롤 중**: 콘텐츠 드래그는 스크롤, 헤더 드래그는 닫기

## 예정 기능
- ⏳ 스크롤 최적화
- ⏳ 접근성 기능 (포커스 트랩)
- ⏳ 커스텀 드래그 임계값 설정
`}
        propsDescription={`
| 컴포넌트 | 프로퍼티 | 타입 | 설명 |
|----------|----------|------|------|
| Root | isOpen | boolean | 바텀시트 열림 상태 |
| Root | onClose | () => void | 바텀시트 닫기 함수 |
| Root | children | ReactNode | 바텀시트 내부 콘텐츠 |
| Root | className | string? | 추가 CSS 클래스 |
| Header | className | string? | 추가 CSS 클래스 |
| Content | children | ReactNode | 콘텐츠 내용 |
| Content | className | string? | 추가 CSS 클래스 |
`}
        title='BottomSheet'
      />

      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      <div className='mb-4 space-x-2'>
        <button
          className='rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600'
          onClick={() => handleOpenBottomSheet('short')}
        >
          짧은 콘텐츠
        </button>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          onClick={() => handleOpenBottomSheet('medium')}
        >
          중간 콘텐츠
        </button>
        <button
          className='rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600'
          onClick={() => handleOpenBottomSheet('long')}
        >
          긴 콘텐츠 (🎯 헤더 + 스마트 드래그)
        </button>
      </div>

      {/* 스크롤 테스트를 위한 긴 콘텐츠 */}
      <div className='mb-8'>
        <h3 className='mb-4 text-lg font-bold'>헤더 + 스마트 드래그 테스트 설명</h3>
        <div className='space-y-4'>
          <div className='rounded bg-green-50 p-4'>
            <h4 className='font-semibold text-green-800'>🟢 짧은/중간 콘텐츠</h4>
            <p className='text-green-700'>스크롤이 없어서 어디서든 드래그로 닫기 가능</p>
          </div>
          <div className='rounded bg-red-50 p-4'>
            <h4 className='font-semibold text-red-800'>🎯 헤더 드래그 (모든 콘텐츠)</h4>
            <p className='text-red-700'>
              <strong>헤더 영역을 드래그하면 스크롤 위치와 관계없이 언제나 바텀시트 닫기</strong>
            </p>
          </div>
          <div className='rounded bg-orange-50 p-4'>
            <h4 className='font-semibold text-orange-800'>🧠 긴 콘텐츠 (콘텐츠 스마트 드래그)</h4>
            <div className='space-y-2 text-orange-700'>
              <p>
                <strong>✅ 콘텐츠 드래그 (스크롤 맨 위)</strong>: 아래로 드래그 → 바텀시트 닫기
              </p>
              <p>
                <strong>🚫 콘텐츠 드래그 (스크롤 중간/아래)</strong>: 아래로 드래그 → 스크롤만 동작 (바텀시트 안 닫힘)
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 예시 코드 */}
      <DocCode
        code={`<BottomSheet.Root isOpen={isOpen} onClose={onClose}>
  <BottomSheet.Content>
    <h2>제목</h2>
    <p>역할이 명확히 분리된 완전한 바텀시트!</p>
  </BottomSheet.Content>
</BottomSheet.Root>`}
      />

      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <Playground code={code} scope={{ BottomSheet, useState, isOpen, onClose: () => setIsOpen(false) }} />
      </div>

      {/* 스크롤 테스트를 위한 추가 콘텐츠 */}
      <div className='mt-24 space-y-4'>
        <h3 className='text-lg font-bold'>추가 스크롤 테스트 영역</h3>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i + 10} className='rounded bg-blue-50 p-4'>
            <p>추가 테스트 콘텐츠 {i + 1} - 헤더 + 스마트 드래그가 적용된 바텀시트를 테스트해보세요.</p>
          </div>
        ))}
      </div>
    </>
  );
}

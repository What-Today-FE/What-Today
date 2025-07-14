import { ImageLogo, TextLogo } from '@what-today/design-system';

import Playground from '@/layouts/Playground';

import DocTemplate, { DocCode } from '../layouts/DocTemplate';

const playgroundCode = `<ImageLogo className="size-200" />
<TextLogo className="size-200-100" />`;

export default function LogoDoc() {
  return (
    <>
      <DocTemplate
        description={`
# Logo 컴포넌트

\`ImageLogo\`와 \`TextLogo\` 두 가지 로고 컴포넌트를 제공합니다.  
TailwindCSS의 \`className\`을 통해 로고의 너비와 높이를 자유롭게 조절할 수 있습니다.

예시:

\`\`\`tsx
<ImageLogo/>
<TextLogo className="size-200-100" />
\`\`\`
        `}
        propsDescription={`
| 이름 | 타입 | 설명 |
|------|------|------|
| className | string | TailwindCSS 유틸리티 클래스로 크기 및 스타일을 제어할 수 있습니다. |
        `}
        title='Logo'
      />

      <div className='mt-10 flex flex-wrap items-center gap-8'>
        <div className='flex flex-col items-center rounded-lg border p-4'>
          <ImageLogo className='size-100' />
          <span className='mt-2 text-sm'>ImageLogo</span>
        </div>
        <div className='flex flex-col items-center rounded-lg border p-4'>
          <TextLogo className='size-100' />
          <span className='mt-2 text-sm'>TextLogo</span>
        </div>
      </div>

      <div className='mt-24'>
        <h2 className='mb-4 text-xl font-semibold'>Playground</h2>
        <DocCode code={playgroundCode} />
        <Playground code={playgroundCode} scope={{ ImageLogo, TextLogo }} />
      </div>
    </>
  );
}

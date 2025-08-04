import { EmptyLogo, ImageLogo, NotFoundLogo, ProfileLogo, TextLogo, WarningLogo } from '@components/logos';

import Playground from '@/layouts/Playground';

import DocTemplate, { DocCode } from '../layouts/DocTemplate';

const playgroundCode = `<ImageLogo size={120} />
<TextLogo size={160} />
<ProfileLogo />
<WarningLogo size={80} />`;

export default function LogoDoc() {
  return (
    <>
      <DocTemplate
        description={`
# Logo 컴포넌트

총 6종의 로고 컴포넌트를 제공합니다:

- \`ImageLogo\`
- \`TextLogo\`
- \`EmptyLogo\`
- \`ProfileLogo\`
- \`WarningLogo\`
- \`NotFoundLogo\`

로고는 다음 두 가지 방식으로 크기를 조절할 수 있습니다(2번 권장):

1. **\`className\`을 통한 TailwindCSS 유틸 사용**  
  예: \`className="w-32 h-10"\`, \`className="size-100"\`

2. **\`size\` prop을 사용하여 정수(px) 단위 지정**  
  예: \`size={120}\` → width: 120px, height는 비율에 맞춰 자동 조정

\`\`\`tsx
<ImageLogo size={120} />
<TextLogo />
<WarningLogo size={80} />
\`\`\`
        `}
        propsDescription={`
| 이름 | 타입 | 설명 |
|------|------|------|
| className | string | TailwindCSS 유틸리티 클래스로 크기 및 스타일을 제어할 수 있습니다. |
| size | number | 고정 크기를 \`px\` 단위로 지정합니다. 가로 기준으로 적용되며 세로는 비율에 맞춰 자동 조절됩니다. |
        `}
        title='Logo'
      />

      <div className='mt-10 flex flex-wrap items-center gap-8'>
        <div className='flex flex-col items-center rounded-lg border p-4'>
          <ImageLogo size={100} />
          <span className='mt-2 text-sm'>ImageLogo</span>
        </div>
        <div className='flex flex-col items-center rounded-lg border p-4'>
          <TextLogo size={100} />
          <span className='mt-2 text-sm'>TextLogo</span>
        </div>
        <div className='flex flex-col items-center rounded-lg border p-4'>
          <EmptyLogo size={100} />
          <span className='mt-2 text-sm'>EmptyLogo</span>
        </div>
        <div className='flex flex-col items-center rounded-lg border p-4'>
          <ProfileLogo size={100} />
          <span className='mt-2 text-sm'>ProfileLogo</span>
        </div>
        <div className='flex flex-col items-center rounded-lg border p-4'>
          <WarningLogo size={100} />
          <span className='mt-2 text-sm'>WarningLogo</span>
        </div>
        <div className='flex flex-col items-center rounded-lg border p-4'>
          <NotFoundLogo size={100} />
          <span className='mt-2 text-sm'>NotFoundLogo</span>
        </div>
      </div>

      <div className='mt-24'>
        <h2 className='mb-4 text-xl font-semibold'>Playground</h2>
        <DocCode code={playgroundCode} />
        <Playground
          code={playgroundCode}
          scope={{
            ImageLogo,
            TextLogo,
            EmptyLogo,
            ProfileLogo,
            WarningLogo,
            NotFoundLogo,
          }}
        />
      </div>
    </>
  );
}

import { KaKaoIcon, WellbeingIcon } from '@components/icons';

import Button from '@/components/button';
import Playground from '@/layouts/Playground';

import DocTemplate, { DocCode } from '../layouts/DocTemplate';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `<Button variant="fill">Click me</Button>`;

export default function ButtonDoc() {
  const variants = ['fill', 'outline', 'ghost', 'none'] as const;
  const sizes = ['xl', 'lg', 'md', 'sm', 'xs'] as const;

  return (
    <>
      <DocTemplate
        description={`
# Button 컴포넌트

여러 상태와 크기, 스타일을 갖는 공통 버튼 UI입니다.
`}
        propsDescription={`
| 이름 | 타입 | 설명 |
|------|------|------|
| variant | 'fill', 'outline', 'ghost', 'none' | 버튼 스타일 |
| size | 'xl', 'lg', 'md', 'sm', 'xs' | 버튼 크기 |
| loading | boolean | 로딩 상태 표시 |
| disabled | boolean | 비활성 상태 표시 |
| children | ReactNode | 버튼 내부 내용 |
`}
        title='button'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <DocCode code={`<Button variant="fill">Click me</Button>`} />

      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <Playground code={code} scope={{ Button }} />
      </div>

      <div className='mt-50 flex flex-col gap-20'>
        <DocCode
          code={`<Button className='w-full' size='xl' variant='fill'>
  로그인하기
</Button>`}
        />
        <DocCode
          code={`<Button disabled className='w-full' size='xl' variant='fill'>
  로그인하기
</Button>`}
        />
        <DocCode
          code={`<Button className='w-full font-medium' size='xl' variant='outline'>
  <KaKaoIcon /> &nbsp; 카카오 로그인
</Button>`}
        />
      </div>

      <div className='mt-20 flex w-640 flex-col gap-20'>
        <Button className='w-full' size='xl' variant='fill'>
          로그인하기
        </Button>

        <Button disabled className='w-full' size='xl' variant='fill'>
          로그인하기
        </Button>

        <Button className='w-full font-medium' size='xl' variant='outline'>
          <KaKaoIcon /> &nbsp; 카카오 로그인
        </Button>
      </div>

      <div className='mt-50 flex flex-col gap-20'>
        <DocCode
          code={`<Button className='w-full' size='lg' variant='outline'>
  14:00~15:00
</Button>`}
        />
        <DocCode
          code={`<Button
  className='hover:text-primary-500 active:text-primary-500 w-full hover:bg-[#E5F3FF] hover:ring-1 hover:ring-blue-300 hover:ring-offset-0 active:bg-blue-200'
  size='lg'
  variant='outline'
>
  15:00~16:00
</Button>`}
        />
      </div>

      <div className='mt-20 flex w-410 flex-col gap-20'>
        <Button className='w-full' size='lg' variant='outline'>
          14:00~15:00
        </Button>

        <Button
          className='hover:text-primary-500 active:text-primary-500 w-full hover:bg-[#E5F3FF] hover:ring-1 hover:ring-blue-300 hover:ring-offset-0 active:bg-blue-200'
          size='lg'
          variant='outline'
        >
          15:00~16:00
        </Button>
      </div>

      <div className='mt-50 flex flex-col gap-20'>
        <DocCode
          code={`<Button className='w-full' size='md' variant='fill'>
  후기 작성
</Button>`}
        />
        <DocCode
          code={`<Button className='w-232 text-gray-600' size='md' variant='outline'>
  예약 변경
</Button>`}
        />
        <DocCode
          code={`<Button className='w-232 text-gray-600' size='md' variant='outline'>
  예약 취소
</Button>`}
        />
      </div>

      <div className='mt-20 flex w-476 flex-col gap-20'>
        <Button className='w-full' size='md' variant='fill'>
          후기 작성
        </Button>
        <Button className='w-232 text-gray-600' size='md' variant='outline'>
          예약 변경
        </Button>
        <Button className='w-232 text-gray-600' size='md' variant='outline'>
          예약 취소
        </Button>
      </div>

      <div className='mt-50 flex flex-col gap-20'>
        <DocCode
          code={`<Button className='w-138' size='sm' variant='fill'>
  체험 등록하기
</Button>`}
        />
        <DocCode
          code={`<Button className='w-157.5 text-gray-600' size='sm' variant='outline'>
  취소하기
</Button>`}
        />
      </div>

      <div className='mt-20 flex w-476 flex-col gap-20'>
        <Button className='w-138' size='sm' variant='fill'>
          체험 등록하기
        </Button>
        <Button className='w-157.5 text-gray-600' size='sm' variant='outline'>
          취소하기
        </Button>
      </div>

      <div className='mt-50 space-y-12 p-8'>
        <h1 className='text-2xl font-bold'>Button 테스트</h1>

        {variants.map((variant) => (
          <section key={variant} className='space-y-4 rounded-md border p-4'>
            <h1 className='text-2xl font-bold'>Variant: {variant}</h1>
            <div className='space-y-2'>
              {sizes.map((size) => (
                <div key={size} className='space-y-2'>
                  <h2 className='font-medium'>Size: {size}</h2>
                  <div className='flex flex-wrap gap-3'>
                    {/* 기본 */}
                    <Button size={size} variant={variant}>
                      기본
                    </Button>
                    {/* 로딩 */}
                    <Button loading size={size} variant={variant}>
                      로딩 중...
                    </Button>
                    {/* 비활성화 */}
                    <Button disabled size={size} variant={variant}>
                      비활성화
                    </Button>
                    {/* 아이콘 + 텍스트 */}
                    <Button size={size} variant={variant}>
                      <WellbeingIcon /> &nbsp; 아이콘 텍스트
                    </Button>
                    {/* 아이콘만 */}
                    <Button size={size} variant={variant}>
                      <WellbeingIcon />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

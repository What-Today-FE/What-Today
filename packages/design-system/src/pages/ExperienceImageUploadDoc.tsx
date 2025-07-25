import ExperienceImageUpload from '@/components/ExperienceImageUpload';
import { BannerInput, IntroduceInput } from '@/components/ExperienceImageUpload';
import Playground from '@/layouts/Playground';

import DocTemplate, { DocCode } from '../layouts/DocTemplate';

/* Playground에서 사용할 예시 코드 */
const code = `<ExperienceImageUpload/>`;

export default function ExperienceImageUploadDoc() {
  return (
    <>
      <DocTemplate
        description={`
# ExperienceImageUpload 컴포넌트

여행, 체험 등과 관련된 콘텐츠에서 이미지를 업로드할 수 있는 컴포넌트입니다.  
사용자는 배너 이미지 또는 소개 이미지를 각각 업로드할 수 있으며, 업로드한 이미지는 미리보기로 표시되고 삭제도 가능합니다.

컴포넌트는 내부적으로 \`BannerInput\`과 \`IntroduceInput\`을 조합하여 구성되어 있으며, 각 입력 요소는 개별적으로 커스터마이징할 수 있습니다.
`}
        propsDescription={`
  | 이름 | 타입 | 설명 |
  |------|------|------|
  | wrapperClassName | string | 최상위 wrapper의 커스텀 클래스 |
  | labelClassName | string | 파일 업로드 버튼 영역의 클래스 |
  | inputClassName | string | input[type="file"] 요소의 클래스 |
  | previewClassName | string | 미리보기 wrapper의 클래스 |
  | imgClassName | string | 업로드된 이미지의 클래스 |
  | deleteButtonClassName | string | 삭제 버튼의 클래스 |
  | deleteIconClassName | string | 삭제 아이콘의 클래스 |
  | plusIconClassName | string | 플러스 아이콘의 클래스 |
  | plusIconColor | string | 플러스 아이콘 색상(hex 또는 color 이름) |
  | counterClassName | string | "0 / 1 사진 개수" 표시 텍스트 클래스 |
  `}
        title='ExperienceImageUpload'
      />

      <DocCode
        code={`
        import { BannerInput, IntroduceInput } from '@/components/ExperienceImageUpload';

        return(

      <div>
      <h3>매인 베너 입니다.</h3>
        <BannerInput />
      </div>


      <div>
      <h3>소개 베너 입니다.<h/3>
      <IntroduceInput />
      </div>
        )
        `}
      />

      <div className='mt-24'>
        <Playground code={code} scope={{ ExperienceImageUpload }} />
      </div>

      <h2 className='mt-40 text-2xl font-semibold'>아래는 커스텀 UI 예시입니다</h2>
      <p className='mt-2 text-gray-600'>
        \`BannerInput\`과 \`IntroduceInput\` 컴포넌트를 직접 조합하여 사용하는 예제입니다. 각각 고유한 스타일을 적용할
        수 있습니다.
      </p>

      <div className='mt-12 flex flex-col gap-12'>
        <BannerInput
          counterClassName='text-sm text-blue-400 font-semibold'
          deleteButtonClassName='bg-red-600 hover:bg-red-700'
          deleteIconClassName='size-6'
          imgClassName='rounded-xl border border-blue-200'
          labelClassName='bg-blue-50 hover:bg-blue-100'
          plusIconClassName='size-20'
          plusIconColor='red'
          wrapperClassName='gap-10'
        />

        <IntroduceInput
          counterClassName='text-sm text-green-500 font-semibold'
          deleteButtonClassName='bg-black/70 hover:bg-black'
          deleteIconClassName='size-7'
          imgClassName='rounded-lg'
          labelClassName='bg-green-50 hover:bg-green-100'
          plusIconClassName='size-18'
          plusIconColor='black'
          previewClassName='border border-green-200'
          wrapperClassName='gap-10'
        />
      </div>
    </>
  );
}

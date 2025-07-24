import { useEffect, useState } from 'react';

import { Button } from '@/components';
import Playground from '@/layouts/Playground';

import ProfileImageInput, { useImageToBase64 } from '../components/ProfileImageInput';
import DocTemplate, { DocCode } from '../layouts/DocTemplate';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `<ProfileImageInput />`;

export default function ProfileImageInputDoc() {
  const { convert } = useImageToBase64();

  const [profileImage, setProfileImage] = useState<string>('');
  const [profileImage2, setProfileImage2] = useState<string>(
    'https://daedamo.com/new/data/file/freestory/3024527036_YWOtZIUe_00fa46b6409a7f3a3a71d3a7d32b047cebce3813.jpg',
  );

  useEffect(() => {
    console.log('profileImage', profileImage);
    console.log('profileImage2', profileImage2);
  }, [profileImage, profileImage2]);

  const handleConvertImagesToBase64 = async () => {
    if (profileImage) {
      const base64_1 = await convert(profileImage);
      console.log('📷 profileImage (base64):', base64_1);
    }

    if (profileImage2) {
      const base64_2 = await convert(profileImage2);
      console.log('📷 profileImage2 (base64):', base64_2);
    }
  };

  const handleReset = () => {
    setProfileImage('');
    setProfileImage2(
      'https://daedamo.com/new/data/file/freestory/3024527036_YWOtZIUe_00fa46b6409a7f3a3a71d3a7d32b047cebce3813.jpg',
    );
  };

  return (
    <>
      <DocTemplate
        description={`
마이페이지 내 정보 페이지에서 프로필 이미지를 바꿀 때 사용하는 file input 컴포넌트입니다.

### 프로필 이미지가 없을 때
1. 기본 프로필 이미지가 보여집니다.
2. \`프로필 이미지 변경\` 버튼이 보여집니다.

### 프로필 이미지가 있을 때
1. 현재 프로필 이미지가 보여집니다.
2. \`기본 이미지로 변경\` 버튼이 보여집니다.

### 프로필 이미지 삭제 버튼
**새롭게 선택한 이미지만 삭제하는 버튼입니다. (기본 프로필 이미지로 초기화되지 않습니다.)**  
현재 프로필 이미지에서 새로운 이미지가 선택되거나, 기본 프로필 이미지가 아닐 때 보여집니다.  

### blob으로 선택한 파일 미리보기
\`ProfileImageInput\`에서 파일을 선택하면 \`URL.createObjectURL()\`로 변환하여 blob 형태로 미리보기를 지원합니다.  
blob 방식은 브라우저 메모리를 사용하기 때문에 빠르고 가볍다는 장점이 있지만, 브라우저 내부에서만 유효하기 때문에 백엔드 API로 이미지를 전송하려면 base64와 같이 문자열 형태로 변환하는 별도의 과정이 필요합니다.  
따라서 \`useImageToBase64\` 훅을 통해 이미지 URL을 fetch → blob → FileReader의 과정으로 base64로 변환하여 사용할 수 있습니다.
`}
        propsDescription={`
| 이름 | 타입 | 설명 |
|------|------|------|
| src | \`string\` | 선택된 프로필 이미지 URL |
| initial | \`string\` | 초기 프로필 이미지 URL (서버에서 내려온 값) |
| onChange | \`(value: string) => void\` | 이미지가 변경되었을 때 호출되는 콜백 함수 |
`}
        title='ProfileImageInput'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <p className='text-lg text-gray-800'>3-1. 프로필 이미지가 없을 때</p>
      <div className='my-12 flex gap-48'>
        <ProfileImageInput src={profileImage} onChange={(value) => setProfileImage(value)} />
      </div>

      <DocCode code='<ProfileImageInput src={profileImage} onChange={(value) => setProfileImage(value)} />' />

      <p className='mt-24 text-lg text-gray-800'>3-2. 프로필 이미지가 있을 때</p>
      <div className='my-12 flex gap-48'>
        <ProfileImageInput src={profileImage2} onChange={(value) => setProfileImage2(value)} />
      </div>

      <DocCode code='<ProfileImageInput src={profileImage} onChange={(value) => setProfileImage(value)} />' />

      <p className='mt-24 text-lg text-gray-800'>3-3. blob을 base64로 변환하기</p>
      <Button onClick={handleConvertImagesToBase64}>base64로 변환</Button>

      <p className='mt-24 text-lg text-gray-800'>3-4. Reset</p>
      <Button className='bg-amber-300' onClick={handleReset}>
        Reset
      </Button>

      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <Playground code={code} scope={{ ProfileImageInput }} />
      </div>
    </>
  );
}

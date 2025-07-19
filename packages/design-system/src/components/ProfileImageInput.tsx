import Button from '@components/button';
import { DeleteIcon } from '@components/icons';
import { ProfileLogo } from '@components/logos';
import { useState } from 'react';

interface ProfileImageInputProps {
  src: string;
  onChange: (value: string) => void;
}

/** DeleteButton
 * 삭제(X) 버튼 컴포넌트입니다. 클릭 시 prop으로 받은 onDelete 핸들러를 호출합니다.
 *
 * @component
 * @param {() => void} onDelete - 삭제 버튼 클릭 시 실행될 콜백 함수
 */
export function DeleteButton({ onDelete }: { onDelete: () => void }) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // label의 기본 동작 막기 (삭제 버튼 눌리고 이어서 이미지 선택 창이 뜨는 것을 방지)
    e.stopPropagation(); // 이벤트 버블링 차단
    onDelete();
  };

  return (
    <Button className='h-fit w-fit rounded-full bg-gray-200 p-8' type='button' variant='none' onClick={handleClick}>
      <DeleteIcon color='#fff' />
    </Button>
  );
}

/** ProfileImageInput
 * 사용자가 프로필 이미지를 업로드하거나 변경할 수 있습니다.
 *
 * - 서버에서 받아온 초기 이미지(`src`)를 보여줍니다.
 * - 새로운 이미지를 업로드하면 미리보기를 보여주며, 삭제 버튼(X)을 노출합니다.
 * - 삭제 버튼 클릭 시 기본 이미지로 변경됩니다.
 * - 기본 이미지 상태에서는 삭제 버튼이 숨겨지고 "프로필 이미지 변경" 문구가 나타납니다.
 *
 * @component
 * @param {string} src - 초기 프로필 이미지 URL (서버에서 내려온 값)
 * @param {(value: string) => void} onChange - 이미지가 변경되었을 때 호출되는 콜백 함수. base64 string 또는 URL을 인자로 받습니다.
 */
export default function ProfileImageInput({ src, onChange }: ProfileImageInputProps) {
  const [initialSrc] = useState(src);
  const [previewUrl, setPreviewUrl] = useState<string>(src);

  const isDefaultImage = previewUrl === '';
  const isPreviewChanged = previewUrl !== initialSrc;
  const shouldShowDeleteButton = !isDefaultImage && isPreviewChanged;

  const updateImage = (newUrl: string) => {
    setPreviewUrl(newUrl);
    onChange?.(newUrl);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      updateImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = () => {
    if (src) setPreviewUrl('');
    else setPreviewUrl('');
  };

  const handleReset = () => {
    setPreviewUrl('');
  };

  return (
    <div className='flex flex-col items-center gap-16'>
      <label className='relative rounded-full border border-gray-100 p-8'>
        {shouldShowDeleteButton && (
          <div className='absolute top-16 right-8 z-10'>
            <DeleteButton onDelete={handleDelete} />
          </div>
        )}
        {previewUrl ? (
          <img alt='프로필 미리보기' className='size-150 rounded-full object-cover' src={previewUrl} />
        ) : (
          <ProfileLogo className='size-150' />
        )}
        <input
          accept='image/*'
          className='absolute inset-0 size-full cursor-pointer rounded-full opacity-0'
          id='profileImage'
          type='file'
          onChange={handleChange}
        />
      </label>
      {!isDefaultImage ? (
        <Button
          className='m-0 h-fit w-fit p-0 px-4 text-lg font-normal text-gray-400 hover:opacity-60'
          variant='none'
          onClick={handleReset}
        >
          기본 이미지로 변경
        </Button>
      ) : (
        <label className='cursor-pointer text-lg text-gray-400 hover:opacity-60' htmlFor='profileImage'>
          프로필 이미지 변경
        </label>
      )}
    </div>
  );
}

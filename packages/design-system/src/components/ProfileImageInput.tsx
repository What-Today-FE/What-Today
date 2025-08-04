import Button from '@components/button';
import { DeleteIcon } from '@components/icons';
import { ProfileLogo } from '@components/logos';
import { useCallback, useEffect, useState } from 'react';

interface ProfileImageInputProps {
  src: string;
  initial?: string;
  onChange: (value: string) => void;
}

/** useImageToBase64
 * 이 훅은 내부에서 반환하는 `convert` 함수를 통해 이미지 URL(blob 또는 일반 URL)을 base64 문자열로 변환합니다.
 * `convert` 함수는 내부에서 fetch → blob → FileReader를 통해 base64 문자열로 변환합니다.
 *
 * @example
 * const { convert } = useImageToBase64();
 * const base64 = await convert('https://example.com/image.png');
 */
export const useImageToBase64 = () => {
  /** convert
   * @param {string} imageUrl - 변환할 이미지의 URL (blob URL, 외부 이미지 URL 등)
   */
  const convert = useCallback(async (imageUrl: string): Promise<string> => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }, []);

  return { convert };
};

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
 * @param {string} src - 선택된 프로필 이미지 URL
 * @param {string} initial - 초기 프로필 이미지 URL (서버에서 내려온 값)
 * @param {(value: string) => void} onChange - 이미지가 변경되었을 때 호출되는 콜백 함수. base64 string 또는 URL을 인자로 받습니다.
 */
export default function ProfileImageInput({ src, initial = src, onChange }: ProfileImageInputProps) {
  const [initialSrc, setInitialSrc] = useState(initial);
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

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 파일 최대 크기 5MB
    if (file.size > MAX_FILE_SIZE) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    updateImage(previewUrl);
  };

  const handleDelete = () => {
    if (initialSrc) {
      setPreviewUrl(initialSrc);
      onChange(initialSrc);
    } else {
      setPreviewUrl('');
      onChange('');
    }
  };

  const handleReset = () => {
    setPreviewUrl('');
    onChange('');
  };

  useEffect(() => {
    setPreviewUrl(src);
  }, [src]);

  useEffect(() => {
    setInitialSrc(initial);
  }, [initial]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className='flex flex-col items-center gap-16'>
      <label className='relative rounded-full border border-gray-50 p-8'>
        {shouldShowDeleteButton && (
          <div className='absolute top-16 right-8 z-3'>
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
          aria-label='프로필 이미지 업로드'
          className='absolute inset-0 size-full cursor-pointer rounded-full opacity-0'
          id='profileImage'
          name='profileImage'
          type='file'
          onChange={handleChange}
        />
      </label>
      {!isDefaultImage ? (
        <Button className='body-text text-gray-400 hover:opacity-60' size='none' variant='none' onClick={handleReset}>
          기본 이미지로 변경
        </Button>
      ) : (
        <label className='body-text cursor-pointer text-gray-400 hover:opacity-60' htmlFor='profileImage'>
          프로필 이미지 변경
        </label>
      )}
    </div>
  );
}

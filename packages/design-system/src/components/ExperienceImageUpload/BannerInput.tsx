import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { DeleteIcon, PlusIcon } from '../icons';
import type { InputProps } from './types';

/**
 * 배너 이미지를 업로드하고 미리보기 및 삭제 기능을 제공하는 컴포넌트입니다.
 *
 * 최대 1장의 이미지만 업로드 가능하며, 업로드된 이미지는 미리보기로 표시되고 삭제할 수 있습니다.
 * 각 요소의 클래스는 커스텀 스타일을 적용하기 위해 props로 전달받을 수 있습니다.
 *
 */

export default function BannerInput({
  wrapperClassName,
  labelClassName,
  inputClassName,
  previewClassName,
  imgClassName,
  deleteButtonClassName,
  deleteIconClassName,
  plusIconClassName,
  counterClassName,
  plusIconColor,
}: InputProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const previousUrlRef = useRef<string | null>(null);
  const MAX_IMAGES = 1;
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 이전 URL이 있다면 해제
      if (previousUrlRef.current) {
        URL.revokeObjectURL(previousUrlRef.current);
      }

      const previewUrl = URL.createObjectURL(file);
      setPreviews([previewUrl]);
      previousUrlRef.current = previewUrl;
    }
  };

  const handleDelete = () => {
    // URL 해제
    if (previousUrlRef.current) {
      URL.revokeObjectURL(previousUrlRef.current);
      previousUrlRef.current = null;
    }
    setPreviews([]);
  };

  // 컴포넌트 언마운트 시 URL 정리
  useEffect(() => {
    return () => {
      if (previousUrlRef.current) {
        URL.revokeObjectURL(previousUrlRef.current);
      }
    };
  }, []);

  const isUploaded = previews.length >= MAX_IMAGES;

  return (
    <div className={twMerge('mt-4 flex gap-14', wrapperClassName)}>
      <label
        className={twMerge(
          'flex aspect-square w-80 flex-col items-center justify-center rounded-2xl bg-gray-100 md:w-128',
          isUploaded ? 'pointer-events-none opacity-40' : 'cursor-pointer',
          labelClassName,
        )}
        htmlFor='banner-upload'
      >
        <PlusIcon className={twMerge('size-15', plusIconClassName)} color={plusIconColor ?? '#9FA0A7'} />
        <span className={twMerge('mt-1 text-xs text-gray-400', counterClassName)}>
          {previews.length} / {MAX_IMAGES}
        </span>
      </label>

      <input
        accept='image/*'
        className={twMerge('hidden', inputClassName)}
        disabled={isUploaded}
        id='banner-upload'
        type='file'
        onChange={handleFileChange}
      />

      {previews.map((preview, idx) => (
        <div key={idx} className={twMerge('relative aspect-square w-80 md:w-128', previewClassName)}>
          <img
            alt='배너 미리보기'
            className={twMerge('h-full w-full rounded-2xl object-cover', imgClassName)}
            src={preview}
          />
          <button
            className={twMerge(
              'bg-opacity-40 absolute -top-8 -right-8 flex cursor-pointer items-center justify-center rounded-full bg-black p-8 text-white',
              deleteButtonClassName,
            )}
            type='button'
            onClick={handleDelete}
          >
            <DeleteIcon className={twMerge('size-8', deleteIconClassName)} color='white' />
          </button>
          <DeleteIcon className={twMerge('size-8', deleteIconClassName)} color='red' />
        </div>
      ))}
    </div>
  );
}

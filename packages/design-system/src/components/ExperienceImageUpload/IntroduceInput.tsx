import { type ChangeEvent, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import Button from '../button';
import { DeleteIcon, PlusIcon } from '../icons';
import type { InputProps } from './types';

/**
 * 소개글 이미지 업로드 컴포넌트입니다.
 *
 * 최대 4장의 이미지를 업로드할 수 있으며, 각 이미지는 미리보기로 표시되고 개별 삭제가 가능합니다.
 * Tailwind 커스터마이징을 위해 각 구성 요소에 클래스명을 props로 전달할 수 있습니다.
 *
 */

export default function IntroduceInput({
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
  const MAX_IMAGES = 4;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const validFiles = files.filter((file) => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB 제한
      return isValidType && isValidSize;
    });
    const newFiles = validFiles.slice(0, MAX_IMAGES - previews.length);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);

    e.target.value = '';
  };

  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 모든 URL 정리
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleDelete = (index: number) => {
    const urlToRevoke = previews[index];
    URL.revokeObjectURL(urlToRevoke);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const isMaxReached = previews.length >= MAX_IMAGES;

  return (
    <div className={twMerge('mt-4 flex flex-wrap gap-14', wrapperClassName)}>
      {/* 업로드 버튼 */}
      <label
        className={twMerge(
          'flex aspect-square w-80 cursor-pointer flex-col items-center justify-center rounded-2xl bg-gray-100 md:w-128',
          isMaxReached ? 'pointer-events-none opacity-40' : '',
          labelClassName,
        )}
        htmlFor='image-upload'
      >
        <PlusIcon className={twMerge('size-15', plusIconClassName)} color={plusIconColor ?? '#9FA0A7'} />
        <span className={twMerge('mt-1 text-xs text-gray-400', counterClassName)}>
          {previews.length}/{MAX_IMAGES}
        </span>
      </label>

      {/* 실제 input */}
      <input
        multiple
        accept='image/*'
        className={twMerge('hidden', inputClassName)}
        disabled={isMaxReached}
        id='image-upload'
        type='file'
        onChange={handleFileChange}
      />

      {/* 미리보기 이미지 */}
      {previews.map((src, index) => (
        <div
          key={index}
          className={twMerge('relative aspect-square w-80 cursor-pointer rounded-2xl md:w-128', previewClassName)}
        >
          <img
            alt={`업로드된 소개 이미지 ${index + 1}`}
            className={twMerge('h-full w-full rounded-2xl object-cover', imgClassName)}
            src={src}
          />
          <Button
            aria-label={`${index + 1}번째 이미지 삭제`}
            className={twMerge(
              'bg-opacity-40 size-sm absolute -top-7 -right-7 flex h-fit w-fit cursor-pointer items-center rounded-full bg-black p-5',
              deleteButtonClassName,
            )}
            size='xs'
            variant='none'
            onClick={() => handleDelete(index)}
          >
            <DeleteIcon className={twMerge('size-10', deleteIconClassName)} color='white' />
          </Button>
        </div>
      ))}
    </div>
  );
}

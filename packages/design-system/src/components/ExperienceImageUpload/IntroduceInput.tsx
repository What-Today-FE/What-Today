import { type ChangeEvent, useState } from 'react';
import { twMerge } from 'tailwind-merge';

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
    const newFiles = files.slice(0, MAX_IMAGES - previews.length);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleDelete = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const isMaxReached = previews.length >= MAX_IMAGES;

  return (
    <div className={twMerge('mt-4 flex flex-wrap gap-14', wrapperClassName)}>
      {/* 업로드 버튼 */}
      <label
        className={twMerge(
          'flex aspect-square w-[80px] cursor-pointer flex-col items-center justify-center rounded-2xl bg-gray-100 md:w-[128px]',
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
          className={twMerge(
            'relative aspect-square w-[80px] cursor-pointer rounded-2xl md:w-[128px]',
            previewClassName,
          )}
        >
          <img
            alt={`미리보기 ${index + 1}`}
            className={twMerge('h-full w-full rounded-2xl object-cover', imgClassName)}
            src={src}
          />
          <button
            className={twMerge(
              'bg-opacity-40 absolute -top-8 -right-8 flex cursor-pointer items-center justify-center rounded-full bg-black p-8 text-white',
              deleteButtonClassName,
            )}
            type='button'
            onClick={() => handleDelete(index)}
          >
            <DeleteIcon className={twMerge('size-8', deleteIconClassName)} color='white' />
          </button>
        </div>
      ))}
    </div>
  );
}

import { type ChangeEvent, useState } from 'react';
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
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setBannerImage(previewUrl);
    }
  };

  const handleDelete = () => {
    setBannerImage(null);
  };

  const isUploaded = !!bannerImage;

  return (
    <div className={twMerge('mt-4 flex gap-14', wrapperClassName)}>
      <label
        className={twMerge(
          'flex aspect-square w-[80px] flex-col items-center justify-center rounded-2xl bg-gray-100 md:w-[128px]',
          isUploaded ? 'pointer-events-none opacity-40' : 'cursor-pointer',
          labelClassName,
        )}
        htmlFor='banner-upload'
      >
        <PlusIcon className={twMerge('size-15', plusIconClassName)} color={plusIconColor ?? '#9FA0A7'} />
        <span className={twMerge('mt-1 text-xs text-gray-400', counterClassName)}>
          {isUploaded ? '1 / 1' : '0 / 1'}
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

      {bannerImage && (
        <div className={twMerge('relative aspect-square w-[80px] md:w-[128px]', previewClassName)}>
          <img
            alt='배너 미리보기'
            className={twMerge('h-full w-full rounded-2xl object-cover', imgClassName)}
            src={bannerImage}
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
        </div>
      )}
    </div>
  );
}

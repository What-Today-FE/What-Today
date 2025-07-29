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

type ImageItem = {
  file: File;
  previewUrl: string;
};

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
  onChange,
}: InputProps & { onChange?: (files: File[]) => void }) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const MAX_IMAGES = 4;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    const validFiles = selected.filter((file) => file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024);

    const allowed = validFiles.slice(0, MAX_IMAGES - images.length);
    const newItems = allowed.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setImages((prev) => {
      const updated = [...prev, ...newItems];
      onChange?.(updated.map((item) => item.file));
      return updated;
    });

    e.target.value = '';
  };

  const handleDelete = (targetIndex: number) => {
    const target = images[targetIndex];
    if (target) URL.revokeObjectURL(target.previewUrl);

    const updated = images.filter((_, i) => i !== targetIndex);
    setImages(updated);
    onChange?.(updated.map((item) => item.file));
  };

  useEffect(() => {
    return () => {
      images.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    };
  }, [images]);

  const isMaxReached = images.length >= MAX_IMAGES;

  return (
    <div className={twMerge('mt-4 flex flex-wrap gap-14', wrapperClassName)}>
      {/* 업로드 버튼 */}
      <label
        className={twMerge(
          'flex aspect-square w-80 cursor-pointer flex-col items-center justify-center rounded-3xl border border-gray-300 bg-white md:w-128',
          isMaxReached ? 'pointer-events-none opacity-40' : '',
          labelClassName,
        )}
        htmlFor='image-upload'
      >
        <PlusIcon className={twMerge('size-15', plusIconClassName)} color={plusIconColor ?? '#9FA0A7'} />
        <span className={twMerge('mt-1 text-xs text-gray-600', counterClassName)}>
          {images.length}/{MAX_IMAGES}
        </span>
      </label>

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
      {images.map((item, index) => {
        const key = `${item.file.name}-${item.file.lastModified}`;
        return (
          <div
            key={key}
            className={twMerge('relative aspect-square w-80 cursor-pointer rounded-2xl md:w-128', previewClassName)}
          >
            <img
              alt={`업로드된 소개 이미지 ${index + 1}`}
              className={twMerge('h-full w-full rounded-2xl object-cover', imgClassName)}
              src={item.previewUrl}
            />
            <Button
              aria-label={`${index + 1}번째 이미지 삭제`}
              className={twMerge(
                'bg-opacity-40 size-sm absolute -top-7 -right-7 flex h-fit w-fit cursor-pointer items-center rounded-full bg-black p-9',
                deleteButtonClassName,
              )}
              size='xs'
              variant='none'
              onClick={() => handleDelete(index)}
            >
              <DeleteIcon className={twMerge('size-8', deleteIconClassName)} color='white' />
            </Button>
          </div>
        );
      })}
    </div>
  );
}

import { motion } from 'motion/react';
import { type ChangeEvent, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import Button from '../button';
import { DeleteIcon, PlusIcon } from '../icons';
import type { InputProps } from './types';

type ImageItem = {
  file?: File;
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
  defaultImageUrls = [], // ✅ 디폴트 이미지 URL props 추가
  onChange,
}: InputProps & {
  onChange?: (files: File[]) => void;
  defaultImageUrls?: string[];
}) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const MAX_IMAGES = 4;

  // ✅ defaultImageUrls로 초기 세팅
  useEffect(() => {
    if (defaultImageUrls.length > 0) {
      const items = defaultImageUrls.map((url) => ({
        previewUrl: url,
        file: undefined,
      }));
      setImages(items);
    }
  }, [defaultImageUrls]);

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
      onChange?.(updated.filter((i) => i.file).map((i) => i.file!));
      return updated;
    });

    e.target.value = '';
  };

  const handleDelete = (targetIndex: number) => {
    const target = images[targetIndex];
    if (target?.file) {
      URL.revokeObjectURL(target.previewUrl);
    }

    const updated = images.filter((_, i) => i !== targetIndex);
    setImages(updated);
    onChange?.(updated.filter((i) => i.file).map((i) => i.file!));
  };

  useEffect(() => {
    return () => {
      images.forEach((item) => {
        if (item.file) URL.revokeObjectURL(item.previewUrl);
      });
    };
  }, [images]);

  const isMaxReached = images.length >= MAX_IMAGES;

  return (
    <motion.div
      animate={{ x: 0, opacity: 1 }}
      className={twMerge(
        'no-scrollbar flex gap-14 overflow-x-auto overflow-y-visible scroll-smooth py-10 md:flex-wrap md:overflow-visible',
        wrapperClassName,
      )}
      initial={{ x: -20, opacity: 0 }}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      transition={{ duration: 0.4 }}
    >
      {/* 업로드 버튼 */}
      <label
        className={twMerge(
          'flex aspect-square w-110 shrink-0 cursor-pointer flex-col items-center justify-center rounded-3xl border border-gray-300 bg-white sm:w-110 md:w-128',
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
        const key = item.file ? `${item.file.name}-${item.file.lastModified}` : `preview-${index}`;
        return (
          <motion.div
            key={key}
            animate={{ scale: 1, opacity: 1 }}
            className={twMerge(
              'relative aspect-square w-110 shrink-0 overflow-visible rounded-2xl md:w-128',
              previewClassName,
            )}
            exit={{ scale: 0.9, opacity: 0 }}
            initial={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img
              alt={`업로드된 소개 이미지 ${index + 1}`}
              className={twMerge('h-full w-full rounded-2xl object-cover', imgClassName)}
              src={item.previewUrl}
            />
            <Button
              aria-label={`${index + 1}번째 이미지 삭제`}
              className={twMerge(
                'bg-opacity-40 size-sm absolute -top-4 -right-4 flex h-fit w-fit cursor-pointer items-center rounded-full bg-black p-9',
                deleteButtonClassName,
              )}
              size='xs'
              variant='none'
              onClick={() => handleDelete(index)}
            >
              <DeleteIcon className={twMerge('size-8', deleteIconClassName)} color='white' />
            </Button>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

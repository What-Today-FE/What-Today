import { Button, DeleteIcon, PlusIcon } from '@what-today/design-system';
import { useId, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

type ImageInputProps =
  | {
      value: string;
      onChange: (value: string) => void;
      max: 1;
      className?: string;
    }
  | {
      value: string[];
      onChange: (value: string[]) => void;
      max: number;
      className?: string;
    };

export default function ImageInput({ value, onChange, max, className }: ImageInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const urls = Array.isArray(value) ? value : value ? [value] : [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    if (max === 1) {
      (onChange as (value: string) => void)(url);
    } else {
      if (urls.length < max) {
        (onChange as (value: string[]) => void)([...urls, url]);
      }
    }

    e.target.value = '';
  };

  const handleDelete = (index: number) => {
    if (max === 1) {
      (onChange as (value: string) => void)('');
    } else {
      const updated = [...urls];
      updated.splice(index, 1);
      (onChange as (value: string[]) => void)(updated);
    }
  };

  const isFull = urls.length >= max;

  return (
    <div className={twMerge('flex items-start gap-8 overflow-x-scroll', className)}>
      {/* 파일 선택 버튼 */}
      <label
        className={twMerge(
          'hover:bg-gray-25 flex size-80 shrink-0 cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border border-gray-100 bg-white md:size-100',
          isFull && 'pointer-events-none opacity-40',
        )}
        htmlFor={id}
      >
        <PlusIcon className='size-16' color='var(--color-gray-100)' />
        <span className='mt-2 text-sm text-gray-400'>{`${urls.length} / ${max}`}</span>
        <input
          ref={inputRef}
          accept='image/*'
          className='hidden'
          disabled={isFull}
          id={id}
          type='file'
          onChange={handleChange}
        />
      </label>

      {/* 미리보기 이미지들 */}
      <div className='flex gap-8'>
        {urls.map((preview, i) => (
          <div key={i} className='relative size-80 rounded-xl border border-gray-100 bg-white md:size-100'>
            <img alt='preview' className='h-full w-full rounded-xl object-cover' src={preview} />
            <Button
              className='absolute -top-8 -right-8 size-24 rounded-full bg-gray-200 p-7 hover:bg-gray-300'
              size='xs'
              variant='none'
              onClick={() => handleDelete(i)}
            >
              <DeleteIcon className='size-8' color='white' />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

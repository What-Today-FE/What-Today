import { Button, DeleteIcon, PlusIcon, useToast } from '@what-today/design-system';
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
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  let urls: string[] = [];

  if (Array.isArray(value)) {
    urls = value;
  } else if (value) {
    urls = [value];
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 파일 최대 크기 5MB
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: '이미지 업로드 오류',
        description: '파일 크기는 5MB 이하여야 합니다',
        type: 'error',
      });
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast({
        title: '이미지 업로드 오류',
        description: '이미지 파일만 업로드 가능합니다',
        type: 'error',
      });
      return;
    }

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
    <div className={twMerge('flex items-start gap-12', className)}>
      {/* 파일 선택 버튼 */}
      <label
        className={twMerge(
          'relative flex size-80 shrink-0 cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border border-gray-100 bg-white hover:border-gray-400 md:size-100',
          isFull && 'pointer-events-none opacity-40',
        )}
        htmlFor={id}
      >
        <PlusIcon className='mt-12 size-16' color='var(--color-gray-100)' />
        <span className='mt-2 text-xs text-gray-400'>{`${urls.length} / ${max}`}</span>
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
      <div className='flex w-full gap-12 overflow-x-scroll'>
        {urls.map((preview, i) => (
          <div key={i} className='relative'>
            <div className='size-80 overflow-hidden rounded-xl border border-gray-100 bg-white md:size-100'>
              <img alt='preview' className='h-full w-full rounded-lg object-cover' src={preview} />
            </div>
            <Button
              className='absolute top-0 -right-8 size-20 rounded-full bg-gray-200 p-6 hover:bg-gray-300'
              size='xs'
              variant='none'
              onClick={() => handleDelete(i)}
            >
              <DeleteIcon className='size-12' color='white' />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

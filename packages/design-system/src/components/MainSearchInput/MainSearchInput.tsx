import { useRef, useState } from 'react';

import Button from '../button';
import { SearchIcon } from '../icons';
import type { SearchInputProps } from './types';

export default function SearchInput({ onClick }: SearchInputProps) {
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const trimmed = keyword.trim();
    if (!trimmed) return;
    onClick(trimmed);
    setKeyword('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };
  const handleFocusInput = () => {
    inputRef.current?.focus(); // 아이콘 클릭시 input에 포커스
  };

  return (
    <div className='relative flex w-full items-center justify-between bg-white'>
      <SearchIcon
        className='absolute top-1/2 left-28 -translate-y-1/2 cursor-pointer text-gray-400'
        onClick={handleFocusInput}
      />
      <input
        ref={inputRef}
        className='md:text-2lg text-md w-full rounded-2xl border border-gray-300 px-55 py-15 text-gray-500 shadow-xl focus:ring-2 focus:ring-blue-500 focus:outline-none md:px-60 md:py-22'
        placeholder='내가 원하는 체험은'
        type='text'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        className='font-sm md:font-lg absolute top-1/2 right-12 h-41 w-85 -translate-y-1/2 md:h-50 md:w-120'
        size='lg'
        variant='fill'
        onClick={handleSubmit}
      >
        검색하기
      </Button>
    </div>
  );
}

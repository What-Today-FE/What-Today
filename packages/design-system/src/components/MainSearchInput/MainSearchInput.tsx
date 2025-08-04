import { useEffect, useState } from 'react';

import { SearchIcon } from '../icons';
import { Input } from '../input';
import type { MainSearchInputProps } from './types';

export default function MainSearchInput({ onClick }: MainSearchInputProps) {
  const [value, setValue] = useState('');
  const [hasSearched, setHasSearched] = useState(false); // 검색 실행 여부

  useEffect(() => {
    const trimmed = value.trim();

    if (trimmed === '') {
      // 검색을 한 상태에서만 초기화 실행
      if (hasSearched) {
        onClick(''); // 초기 데이터로 복원
        setHasSearched(false);
      }
      return;
    }

    const timer = setTimeout(() => {
      onClick(trimmed);
      setHasSearched(true); // 검색 실행 기록
    }, 500);

    return () => clearTimeout(timer);
  }, [value, onClick, hasSearched]);

  return (
    <div className='relative flex w-full items-center justify-between bg-white'>
      <Input.Root className='w-full'>
        <Input.Wrapper className='body-textn rounded-3xl border-gray-50 py-20'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-20 md:pl-32'>
            <SearchIcon className='cursor-pointer text-gray-400' />
          </div>
          <Input.Field
            className='px-30 md:px-40'
            placeholder='내가 원하는 체험은...'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Input.Wrapper>
        <Input.ErrorMessage />
      </Input.Root>
    </div>
  );
}

import { useRef } from 'react';

import { Input } from '../input';
import { OpenDaumPostcode } from './openDaumPostcode';
import type { AddressInputProps } from './types';

export default function AddressInput({ onChange }: AddressInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    OpenDaumPostcode((selectedAddress) => {
      if (inputRef.current) {
        inputRef.current.value = selectedAddress; // DOM에 직접 값 설정
      }
      onChange?.(selectedAddress); // 필요 시 외부에도 알림
    });
  };

  return (
    <div className='w-full'>
      <Input.Root className='w-full'>
        <Input.Label>주소</Input.Label>
        <Input.Wrapper>
          <Input.Field
            ref={inputRef}
            readOnly
            className='md:text-md py-5 text-sm text-gray-950'
            placeholder='주소를 입력해 주세요'
            onClick={handleClick}
          />
        </Input.Wrapper>
        <Input.ErrorMessage />
      </Input.Root>
    </div>
  );
}

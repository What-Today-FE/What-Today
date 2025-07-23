import { EyeIcon, EyeOffIcon, Input } from '@what-today/design-system';
import { memo, useState } from 'react';

import type InputProps from '@/types/InputProps';

function PasswordConfirmInput({ value, onChange }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <Input.Root className='w-full'>
      <Input.Label>비밀번호</Input.Label>
      <Input.Wrapper>
        <Input.Field
          autoComplete='off'
          placeholder='비밀번호를 한 번 더 입력해 주세요'
          type={isPasswordVisible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
        />
        <span className='cursor-pointer' onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Input.Icon>{isPasswordVisible ? <EyeIcon /> : <EyeOffIcon className='size-17.5' />}</Input.Icon>
        </span>
      </Input.Wrapper>
      <Input.ErrorMessage />
    </Input.Root>
  );
}

export default memo(PasswordConfirmInput);

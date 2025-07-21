import { Input } from '@what-today/design-system';
import { memo } from 'react';

import type InputProps from '@/types/InputProps';

function NicknameInput({ value, onChange }: InputProps) {
  return (
    <Input.Root className='w-full'>
      <Input.Label>닉네임</Input.Label>
      <Input.Wrapper>
        <Input.Field placeholder='닉네임을 입력해 주세요' value={value} onChange={onChange} />
      </Input.Wrapper>
      <Input.ErrorMessage />
    </Input.Root>
  );
}

export default memo(NicknameInput);

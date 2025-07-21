import { Input } from '@what-today/design-system';
import { memo } from 'react';

import type InputProps from '@/schemas/InputProps';

function EmailInput({ value, onChange }: InputProps) {
  return (
    <Input.Root className='w-full'>
      <Input.Label>이메일</Input.Label>
      <Input.Wrapper>
        <Input.Field placeholder='이메일을 입력해 주세요' type='email' value={value} onChange={onChange} />
      </Input.Wrapper>
      <Input.ErrorMessage />
    </Input.Root>
  );
}

export default memo(EmailInput);

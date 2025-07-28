import { Input } from '@what-today/design-system';
import { memo } from 'react';

import type InputProps from '@/types/InputProps';

function EmailInput({ error, ...props }: InputProps) {
  return (
    <Input.Root className='w-full' error={error}>
      <Input.Label>이메일</Input.Label>
      <Input.Wrapper>
        <Input.Field {...props} placeholder='이메일을 입력해 주세요' type='email' />
      </Input.Wrapper>
      <Input.ErrorMessage />
    </Input.Root>
  );
}

export default memo(EmailInput);

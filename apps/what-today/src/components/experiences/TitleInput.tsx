import { Input } from '@what-today/design-system';
import { memo } from 'react';

import type InputProps from '@/types/InputProps';

function TitleInput({ error, ...props }: InputProps) {
  return (
    <Input.Root className='w-full' error={error}>
      <Input.Label>제목</Input.Label>
      <Input.Wrapper>
        <Input.Field {...props} placeholder='제목을 입력해 주세요' />
      </Input.Wrapper>
      <Input.ErrorMessage />
    </Input.Root>
  );
}

export default memo(TitleInput);

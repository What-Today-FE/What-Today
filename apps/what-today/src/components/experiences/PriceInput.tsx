import { Input } from '@what-today/design-system';
import { memo } from 'react';

import type InputProps from '@/types/InputProps';

function PriceInput({ error, ...props }: InputProps) {
  return (
    <Input.Root className='w-full' error={error}>
      <Input.Label>가격</Input.Label>
      <Input.Wrapper>
        <Input.Field min={0} {...props} placeholder='가격을 입력해주세요' type='number' />
      </Input.Wrapper>
      <Input.ErrorMessage />
    </Input.Root>
  );
}

export default memo(PriceInput);

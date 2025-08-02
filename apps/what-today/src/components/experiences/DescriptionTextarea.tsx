import { Input } from '@what-today/design-system';
import { memo } from 'react';

import type InputProps from '@/types/InputProps';

function DescriptionTextarea({ error, ...props }: InputProps) {
  return (
    <Input.Root className='w-full' error={error}>
      <Input.Label>설명</Input.Label>
      <Input.Wrapper>
        <Input.Textarea autoHeight className='min-h-300' placeholder='체험에 대한 설명을 입력해 주세요.' {...props} />
      </Input.Wrapper>
      <Input.ErrorMessage />
    </Input.Root>
  );
}

export default memo(DescriptionTextarea);

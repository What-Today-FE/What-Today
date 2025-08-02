import { ChevronIcon, Popover } from '@what-today/design-system';
import { memo, useId } from 'react';

import type InputProps from '@/types/InputProps';

interface AgreeCheckboxProps extends InputProps {
  label: string;
  required?: boolean;
  content: React.ReactNode;
}

function AgreeCheckbox({ error, content, label, required = false, ...props }: AgreeCheckboxProps) {
  const id = useId();

  return (
    <>
      <div className='flex w-full items-center'>
        <label className='flex cursor-pointer items-center gap-8' htmlFor={id}>
          <input id={id} type='checkbox' {...props} className='cursor-pointer' />
          <p className='caption-text'>
            {label} {required && <span className='text-primary-500'>(필수)</span>}
          </p>
        </label>
        <Popover.Root className='ml-auto' direction='fixed-center-center'>
          <Popover.Trigger className='caption-text cursor-pointer text-gray-400'>
            <ChevronIcon className='size-10' color='var(--color-gray-200)' direction='right' />
          </Popover.Trigger>
          <Popover.Content overlay preventInteraction className='rounded-2xl bg-white p-24'>
            <div className='w-300 md:w-400 xl:w-500'>{content}</div>
          </Popover.Content>
        </Popover.Root>
      </div>
      <p className='caption-text text-red-500'>{error}</p>
    </>
  );
}

export default memo(AgreeCheckbox);

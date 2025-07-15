import { memo, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import { useSelectContext } from './context';

function SelectItem({ value, children, className }: { value: string; children: ReactNode; className?: string }) {
  const { handleClickItem } = useSelectContext();

  return (
    <div
      className={twMerge('hover:bg-primary-100 rounded-xl p-10', className)}
      onClick={() => handleClickItem(value, children)}
    >
      {children}
    </div>
  );
}

export const Item = memo(SelectItem);

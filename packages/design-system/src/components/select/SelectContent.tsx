import { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import { Popover } from '../popover';

function SelectContent({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <Popover.Content
      className={twMerge(
        'mt-4 max-h-300 overflow-y-scroll rounded-2xl border border-gray-100 bg-white p-10',
        className,
      )}
    >
      {children}
    </Popover.Content>
  );
}

export const Content = SelectContent;

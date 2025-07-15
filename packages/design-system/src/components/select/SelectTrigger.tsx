import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import { ChevronIcon } from '../icons';
import { Popover } from '../popover';

function SelectTrigger({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <Popover.Trigger>
      <div
        className={twMerge(
          'flex items-center justify-between rounded-xl border border-gray-100 bg-white px-15 py-10',
          className,
        )}
      >
        {children}
        <ChevronIcon direction='bottom' />
      </div>
    </Popover.Trigger>
  );
}

export const Trigger = SelectTrigger;

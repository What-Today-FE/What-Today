import { DeleteIcon } from '@components/icons';
import { twMerge } from 'tailwind-merge';

import type { ToastCloseProps } from './types';

export default function ToastClose({ onClose, className }: ToastCloseProps) {
  return (
    <button className={twMerge('', className)} onClick={onClose}>
      <DeleteIcon className='size-14' color='var(--color-gray-950)' />
    </button>
  );
}

import { DeleteIcon } from '@components/icons';
import { twMerge } from 'tailwind-merge';

import type { ToastCloseProps } from './types';

export default function ToastClose({ onClose, className, color }: ToastCloseProps) {
  return (
    // develop으로 병합 후 버튼 컴포넌트로 변경 예정입니다.
    <button className={twMerge('', className)} onClick={onClose}>
      <DeleteIcon className='size-12 cursor-pointer' color={color || 'var(--color-gray-950)'} />
    </button>
  );
}

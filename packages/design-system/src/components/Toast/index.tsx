import { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { twMerge } from 'tailwind-merge';

import { ErrorIcon, InfoIcon, SuccessIcon } from '../icons';
import ToastClose from './ToastClose';
import ToastDescription from './ToastDescription';
import ToastTitle from './ToastTitle';
import type { ToastOptions, ToastStyles, ToastType } from './types';

const toastStyleByType: Record<ToastType, ToastStyles> = {
  success: {
    icon: <SuccessIcon className='size-20' />,
    className: 'bg-[#ecfdf3] border-1 border-[#bffcd9] text-[#4CAF50]',
  },
  error: {
    icon: <ErrorIcon className='size-20' />,
    className: 'bg-[#fff0f0] border-1 border-[#ffe0e1] text-red-500',
  },
  default: {
    icon: <InfoIcon className='size-20' />,
    className: 'bg-[#f0f8ff] border-1 border-[#DDE7FD] text-[#2196F3]',
  },
};

export const useToast = () => {
  const toastRoot = useRef<ReactDOM.Root | null>(null);
  const ToastTimeout = useRef<NodeJS.Timeout | null>(null);

  const toast = ({ title, description, type = 'default', duration = 30000 }: ToastOptions) => {
    if (toastRoot.current) {
      toastRoot.current.unmount();
    }

    const node = document.getElementById('wt-toast');
    if (!node) return;

    const statusStyle = toastStyleByType[type];

    toastRoot.current = ReactDOM.createRoot(node);
    toastRoot.current.render(
      <div
        className={twMerge(
          'fixed top-28 left-1/2 z-50 flex w-320 -translate-x-1/2 items-center gap-12 rounded-lg p-10 text-white shadow',
          statusStyle.className,
        )}
      >
        <span className='pl-4'>{statusStyle.icon}</span>
        <div className='flex-1'>
          <ToastTitle>{title}</ToastTitle>
          <ToastDescription>{description}</ToastDescription>
        </div>
        <ToastClose className='absolute top-16 right-16' onClose={() => toastRoot.current?.unmount()} />
      </div>,
    );

    ToastTimeout.current = setTimeout(() => {
      toastRoot.current?.unmount();
    }, duration);
  };

  return { toast };
};

export const Toaster = () => {
  return <div id='wt-toast' />;
};

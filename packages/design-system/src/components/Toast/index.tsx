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
    className: 'bg-green-500 border-1-green-600 text-white',
  },
  error: {
    icon: <ErrorIcon className='size-20' />,
    className: 'bg-red-500 border-1-red-600 text-white',
  },
  default: {
    icon: <InfoIcon className='size-20' />,
    className: 'bg-zinc-800 border-1-zinc-600 text-white',
  },
};

export const useToast = () => {
  const toastRoot = useRef<ReactDOM.Root | null>(null);
  const ToastTimeout = useRef<NodeJS.Timeout | null>(null);

  const toast = ({ title, description, type = 'default', duration = 3000 }: ToastOptions) => {
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
          'fixed top-4 right-4 z-50 flex w-300 items-start gap-3 rounded p-10 text-white shadow',
          statusStyle.className,
        )}
      >
        <span className='text-xl'>{statusStyle.icon}</span>
        <div className='flex-1'>
          <ToastTitle>{title}</ToastTitle>
          <ToastDescription>{description}</ToastDescription>
        </div>
        <ToastClose onClose={() => toastRoot.current?.unmount()} />
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

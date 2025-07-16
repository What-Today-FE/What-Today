import { useRef } from 'react';
import ReactDOM from 'react-dom/client';

import ToastClose from './ToastClose';
import ToastDescription from './ToastDescription';
import ToastTitle from './ToastTitle';

export const useToast = () => {
  const toastRoot = useRef<ReactDOM.Root | null>(null);
  const ToastTimeout = useRef<NodeJS.Timeout | null>(null);

  const toast = ({ title, description }: { title: string; description: string }, duration = 3000) => {
    if (toastRoot.current) {
      toastRoot.current.unmount();
    }

    const node = document.getElementById('wt-toast');
    if (!node) return;

    toastRoot.current = ReactDOM.createRoot(node);
    toastRoot.current.render(
      <div className='fixed top-4 right-4 z-50 flex w-300 items-start gap-3 rounded bg-black p-10 text-white shadow'>
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

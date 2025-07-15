import { useRef } from 'react';
import ReactDOM from 'react-dom/client';

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
      <div className='fixed top-4 right-4 z-50 w-300 rounded bg-black p-4 text-white shadow'>
        <div className='font-bold'>{title}</div>
        <div className='mt-1 text-sm'>{description}</div>
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

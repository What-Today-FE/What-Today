import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
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
    color: '#4CAF50',
  },
  error: {
    icon: <ErrorIcon className='size-20' />,
    className: 'bg-[#fff0f0] border-1 border-[#ffe0e1] text-red-500',
    color: '#FF2727',
  },
  default: {
    icon: <InfoIcon className='size-20' />,
    className: 'bg-[#f0f8ff] border-1 border-[#DDE7FD] text-[#2196F3]',
    color: '#2196F3',
  },
};

export const useToast = () => {
  const toastRoot = useRef<ReactDOM.Root | null>(null);

  const toast = ({ title, description, type = 'default', duration = 3000 }: ToastOptions) => {
    if (toastRoot.current) {
      toastRoot.current.unmount();
      toastRoot.current = null;
    }

    const node = document.getElementById('wt-toast');
    if (!node) return;

    const statusStyle = toastStyleByType[type];

    const ToastWrapper = () => {
      const [isVisible, setIsVisible] = useState(true);

      useEffect(() => {
        const timeout = setTimeout(() => {
          setIsVisible(false);
        }, duration);
        return () => clearTimeout(timeout);
      }, []);

      return (
        <AnimatePresence>
          {isVisible && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className={twMerge(
                'fixed top-28 left-1/2 z-80 flex w-320 -translate-x-1/2 items-center gap-12 rounded-lg p-10 text-white shadow',
                statusStyle.className,
              )}
              exit={{ opacity: 0, y: -20 }}
              initial={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              onAnimationComplete={() => {
                if (!isVisible) {
                  toastRoot.current?.unmount();
                }
              }}
            >
              <span className='pl-4'>{statusStyle.icon}</span>
              <div className='flex flex-col'>
                <ToastTitle>{title}</ToastTitle>
                <ToastDescription>{description}</ToastDescription>
              </div>
              <ToastClose
                className='absolute top-16 right-16'
                color={statusStyle.color}
                onClose={() => setIsVisible(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      );
    };

    toastRoot.current = ReactDOM.createRoot(node);
    toastRoot.current.render(<ToastWrapper />);
  };

  return { toast };
};

export const Toaster = () => {
  return <div id='wt-toast' />;
};

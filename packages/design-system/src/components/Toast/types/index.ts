export interface ToastComponentProps {
  children?: React.ReactNode;
  className?: string;
}

export interface ToastCloseProps extends ToastComponentProps {
  onClose?: () => void;
}

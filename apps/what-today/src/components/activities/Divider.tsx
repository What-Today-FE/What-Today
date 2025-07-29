import { twMerge } from 'tailwind-merge';

interface DividerProps {
  className?: string;
}

export default function Divider({ className }: DividerProps) {
  return <div className={twMerge('rounded-3xl border-t border-gray-100', className)} />;
}

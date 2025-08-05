import { twMerge } from 'tailwind-merge';

interface SummaryItemProps {
  count: number;
  label: string;
  onClick?: () => void;
  countClassName?: string;
  labelClassName?: string;
}

function SummaryRoot({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={twMerge(
        'flex w-full items-center justify-around rounded-3xl border border-gray-50 bg-white px-36 py-16',
        className,
      )}
    >
      {children}
    </div>
  );
}

function SummaryItem({ count, label, onClick, countClassName, labelClassName }: SummaryItemProps) {
  return (
    <div className='flex cursor-pointer flex-col items-center gap-4' onClick={onClick}>
      <p className={twMerge('subtitle-text font-bold', countClassName)}>{count}</p>
      <p className={twMerge('caption-text text-gray-400', labelClassName)}>{label}</p>
    </div>
  );
}

export const MypageSummaryCard = {
  Root: SummaryRoot,
  Item: SummaryItem,
};

import { ArrowIcon } from '../icons';

interface Props {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled: boolean;
}

export default function NavigationButton({ direction, onClick, disabled }: Props) {
  const marginClass = direction === 'left' ? '-mr-20' : '-ml-20';

  return (
    <button
      className={`z-10 ${marginClass} hidden size-40 items-center justify-center rounded-full bg-white text-xl hover:bg-gray-100 disabled:opacity-30 md:flex`}
      disabled={disabled}
      onClick={onClick}
    >
      <ArrowIcon direction={direction === 'right' ? 'right' : undefined} />
    </button>
  );
}

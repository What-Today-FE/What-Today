import { Button } from '@what-today/design-system';
import { MinusIcon, PlusIcon } from '@what-today/design-system';

interface HeadCountSelectorProps {
  headCount: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function HeadCountSelector({ headCount, onIncrease, onDecrease }: HeadCountSelectorProps) {
  return (
    <div className='flex items-center justify-between'>
      <p className='body-text font-bold'>참여 인원 수</p>

      <div className='flex items-center gap-23 rounded-3xl border border-gray-50 px-15'>
        <Button size='none' variant='none' onClick={onDecrease}>
          <MinusIcon className='size-14' color='var(--color-gray-600)' />
        </Button>
        <span className='body-text p-8 text-center font-bold'>{headCount}</span>
        <Button size='none' variant='none' onClick={onIncrease}>
          <PlusIcon className='size-14' color='var(--color-gray-600)' />
        </Button>
      </div>
    </div>
  );
}

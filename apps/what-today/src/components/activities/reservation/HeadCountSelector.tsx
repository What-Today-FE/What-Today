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
      <p className='text-lg font-bold text-gray-950'>참여 인원 수</p>

      <div className='flex items-center gap-23 rounded-3xl border border-[#EEEEEE] px-15'>
        <Button className='h-fit w-fit p-0' size='sm' variant='none' onClick={onDecrease}>
          <MinusIcon className='size-20' color='#4B4B4B' />
        </Button>
        <span className='p-8 text-center text-lg font-bold text-gray-950'>{headCount}</span>
        <Button className='h-fit w-fit p-0' size='sm' variant='none' onClick={onIncrease}>
          <PlusIcon className='size-20' color='#4B4B4B' />
        </Button>
      </div>
    </div>
  );
}

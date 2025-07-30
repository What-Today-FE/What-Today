import { Button } from '@what-today/design-system';
import { twJoin } from 'tailwind-merge';

interface TimeSelectorProps {
  availableTimes: {
    id: number;
    startTime: string;
    endTime: string;
  }[];
  selectedScheduleId: number | null;
  onSelect: (id: number) => void;
}

export default function TimeSelector({ availableTimes, selectedScheduleId, onSelect }: TimeSelectorProps) {
  return (
    <div className='flex flex-col gap-2'>
      {availableTimes.map((s) => (
        <Button
          key={s.id}
          className={twJoin(
            'w-full px-4 py-2 text-center',
            'hover:text-primary-500 hover:bg-[#E5F3FF] hover:ring-2 hover:ring-blue-300 hover:ring-offset-0',
            selectedScheduleId === s.id
              ? 'text-primary-500 bg-blue-100 font-semibold ring-2 ring-blue-300'
              : 'bg-white text-gray-900',
          )}
          size='lg'
          variant='outline'
          onClick={() => onSelect(s.id)}
        >
          {s.startTime} ~ {s.endTime}
        </Button>
      ))}
    </div>
  );
}

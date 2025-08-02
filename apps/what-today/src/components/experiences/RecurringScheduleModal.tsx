import { Button, DatePicker, Popover, TimePicker, useToast } from '@what-today/design-system';
import type { Dayjs } from 'dayjs';
import { useState } from 'react';

interface Time {
  hour: string;
  minute: string;
}

export interface Schedule {
  date?: Dayjs | null;
  startTime?: Time | null;
  endTime?: Time | null;
}

interface RecurringScheduleModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSchedulesGenerated: (schedules: Schedule[]) => void;
}

function timeToMinutes(time: { hour: string; minute: string } | null): number {
  if (!time) return -1;
  return parseInt(time.hour) * 60 + parseInt(time.minute);
}

export default function RecurringScheduleModal({
  isOpen,
  onOpenChange,
  onSchedulesGenerated,
}: RecurringScheduleModalProps) {
  const { toast } = useToast();
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<Time | null>(null);
  const [endTime, setEndTime] = useState<Time | null>(null);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const resetForm = () => {
    setSelectedDays([]);
    setStartTime(null);
    setEndTime(null);
    setStartDate(null);
    setEndDate(null);
  };

  const handlePopoverChange = (open: boolean) => {
    onOpenChange(open);

    // 팝오버가 닫힐 때 폼 초기화
    if (!open) {
      resetForm();
    }
  };

  const weekdays = [
    { value: 1, label: '월' },
    { value: 2, label: '화' },
    { value: 3, label: '수' },
    { value: 4, label: '목' },
    { value: 5, label: '금' },
    { value: 6, label: '토' },
    { value: 0, label: '일' },
  ];

  const toggleDay = (dayValue: number) => {
    setSelectedDays((prev) => (prev.includes(dayValue) ? prev.filter((d) => d !== dayValue) : [...prev, dayValue]));
  };

  const handleStartDateChange = (date: Dayjs | null) => {
    setStartDate(date);

    // 시작 날짜가 설정되고 종료 날짜가 있을 때 검증
    if (date && endDate) {
      if (date.isAfter(endDate, 'day')) {
        toast({
          title: '날짜 설정 오류',
          description: '시작 날짜는 종료 날짜보다 빨라야 합니다.',
          type: 'error',
        });
        setEndDate(null); // 종료 날짜 초기화
      }
    }
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    // 종료 날짜가 설정되고 시작 날짜가 있을 때 검증
    if (date && startDate) {
      if (startDate.isAfter(date, 'day')) {
        toast({
          title: '날짜 설정 오류',
          description: '종료 날짜는 시작 날짜보다 늦어야 합니다.',
          type: 'error',
        });
        return; // 변경사항 적용하지 않음
      }
    }

    setEndDate(date);
  };

  const handleStartTimeChange = (time: Time | null) => {
    setStartTime(time);

    // 시작 시간이 설정되고 종료 시간이 있을 때 검증
    if (time && endTime) {
      const startMinutes = timeToMinutes(time);
      const endMinutes = timeToMinutes(endTime);

      if (startMinutes >= endMinutes) {
        toast({
          title: '시간 설정 오류',
          description: '시작 시간은 종료 시간보다 빨라야 합니다.',
          type: 'error',
        });
        setEndTime(null); // 종료 시간 초기화
      }
    }
  };

  const handleEndTimeChange = (time: Time | null) => {
    // 종료 시간이 설정되고 시작 시간이 있을 때 검증
    if (time && startTime) {
      const startMinutes = timeToMinutes(startTime);
      const endMinutes = timeToMinutes(time);

      if (startMinutes >= endMinutes) {
        toast({
          title: '시간 설정 오류',
          description: '종료 시간은 시작 시간보다 늦어야 합니다.',
          type: 'error',
        });
        return; // 변경사항 적용하지 않음
      }
    }

    setEndTime(time);
  };

  const generateSchedules = () => {
    if (!startTime || !endTime || !startDate || !endDate || selectedDays.length === 0) {
      toast({
        title: '입력 오류',
        description: '모든 필드를 입력해주세요.',
        type: 'error',
      });
      return;
    }

    const newSchedules: Schedule[] = [];
    let current = startDate.clone();
    let loopCount = 0;

    while (current.isBefore(endDate) || current.isSame(endDate, 'day')) {
      loopCount++;

      // 무한루프 방지
      if (loopCount > 1000) {
        console.error('무한루프 감지! 중단합니다.');
        break;
      }

      const currentDayOfWeek = current.day();

      if (selectedDays.includes(currentDayOfWeek)) {
        newSchedules.push({
          date: current.clone(),
          startTime: { ...startTime },
          endTime: { ...endTime },
        });
      }

      // 매주 반복: 하루씩 증가
      current = current.add(1, 'day');
    }

    // 생성된 스케줄을 부모 컴포넌트로 전달
    onSchedulesGenerated(newSchedules);
    resetForm();
    onOpenChange(false);

    toast({
      title: '일정 생성 완료',
      description: `${newSchedules.length}개의 일정이 추가되었습니다.`,
      type: 'success',
    });
  };

  return (
    <Popover.Root direction='fixed-center-center' open={isOpen} onOpenChange={handlePopoverChange}>
      <Popover.Trigger asChild>
        <Button
          className='caption-text h-fit border-gray-100 px-10 py-4'
          size='sm'
          variant='outline'
          onClick={() => onOpenChange(true)}
        >
          반복 일정 추가
        </Button>
      </Popover.Trigger>
      <Popover.Content overlay preventInteraction className='rounded-2xl border-gray-50 bg-white p-24'>
        <div className='flex w-300 flex-col gap-16 md:w-500 xl:w-700'>
          <div>
            <label className='mb-2 block text-sm font-medium'>반복 유형</label>
            <div className='flex items-center gap-8 rounded-xl border border-gray-100 bg-white px-20 py-10'>매주</div>
          </div>

          <div className='flex flex-col gap-4 md:flex-row'>
            <div className='flex-1'>
              <label className='mb-2 block text-sm font-medium'>시작 날짜</label>
              <DatePicker value={startDate} onChange={handleStartDateChange} />
            </div>
            <div className='flex-1'>
              <label className='mb-2 block text-sm font-medium'>종료 날짜</label>
              <DatePicker value={endDate} onChange={handleEndDateChange} />
            </div>
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium'>요일 선택</label>
            <div className='flex flex-wrap gap-4'>
              {weekdays.map((day) => (
                <button
                  key={day.value}
                  className={`body-text flex size-32 cursor-pointer items-center justify-center rounded-lg border border-gray-100 transition-colors ${
                    selectedDays.includes(day.value) ? 'bg-gray-50' : ''
                  }`}
                  type='button'
                  onClick={() => toggleDay(day.value)}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='mb-2 block text-sm font-medium'>시작 시간</label>
              <TimePicker className='w-full' value={startTime} onChange={handleStartTimeChange} />
            </div>
            <div>
              <label className='mb-2 block text-sm font-medium'>종료 시간</label>
              <TimePicker className='w-full' value={endTime} onChange={handleEndTimeChange} />
            </div>
          </div>

          <Button className='w-full' size='sm' onClick={generateSchedules}>
            일정 생성
          </Button>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}

import { Button, DatePicker, MinusIcon, PlusIcon, Popover, TimePicker, useToast } from '@what-today/design-system';
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

interface ScheduleInputProps {
  value: Schedule[];
  onChange: (schedules: Schedule[]) => void;
}

function timeToMinutes(time: { hour: string; minute: string } | null): number {
  if (!time) return -1;
  return parseInt(time.hour) * 60 + parseInt(time.minute);
}

function isOverlappingSchedule(a: Required<Schedule>, b: Required<Schedule>): boolean {
  const aStart = timeToMinutes(a.startTime);
  const aEnd = timeToMinutes(a.endTime);
  const bStart = timeToMinutes(b.startTime);
  const bEnd = timeToMinutes(b.endTime);

  const aDate = a.date?.format?.('YYYY-MM-DD');
  const bDate = b.date?.format?.('YYYY-MM-DD');

  if (aDate !== bDate) return false;

  return aStart < bEnd && bStart < aEnd;
}

export default function ScheduleInput({ value, onChange }: ScheduleInputProps) {
  const { toast } = useToast();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
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
    setIsPopoverOpen(open);

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

    // 기존 스케줄과 새 스케줄 합치기 (빈 행 제외)
    const existingSchedules = value.filter((s) => s.date && s.startTime && s.endTime);
    const allSchedules = [...existingSchedules, ...newSchedules];

    onChange(allSchedules);
    setIsPopoverOpen(false);

    toast({
      title: '일정 생성 완료',
      description: `${newSchedules.length}개의 일정이 추가되었습니다.`,
      type: 'success',
    });
  };

  const handleScheduleChange = (index: number, field: keyof Schedule, newValue: Dayjs | Time | null) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: newValue };

    const currentSchedule = updated[index];
    // 1. 시작 시간이 끝 시간보다 늦은지 검사
    if (currentSchedule.startTime && currentSchedule.endTime) {
      const startMinutes = timeToMinutes(currentSchedule.startTime);
      const endMinutes = timeToMinutes(currentSchedule.endTime);

      if (startMinutes >= endMinutes) {
        toast({
          title: '예약 시간 오류',
          description: `시작 시간은 끝 시간보다 빨라야 합니다.`,
          type: 'error',
        });
        return; // 변경사항 적용하지 않음
      }
    }

    // 2. 현재 스케줄이 완성되었고, 다른 스케줄과 겹치는지 검사
    if (currentSchedule.date && currentSchedule.startTime && currentSchedule.endTime) {
      // 현재 인덱스를 제외한 다른 스케줄들과 비교
      const hasOverlap = updated
        .filter((_, idx) => idx !== index) // 현재 수정 중인 항목 제외
        .some((otherSchedule) => {
          // 완성된 스케줄만 비교
          if (!otherSchedule.date || !otherSchedule.startTime || !otherSchedule.endTime) {
            return false;
          }
          return isOverlappingSchedule(currentSchedule as Required<Schedule>, otherSchedule as Required<Schedule>);
        });

      if (hasOverlap) {
        toast({
          title: '예약 시간 오류',
          description: `해당 시간대는 이미 다른 일정과 겹칩니다.`,
          type: 'error',
        });
        return; // 변경사항 적용하지 않음
      }
    }

    // 3. 마지막 행이 모두 입력되면 새로운 빈 행 추가
    if (index === value.length - 1) {
      const lastSchedule = updated[index];
      if (lastSchedule.date && lastSchedule.startTime && lastSchedule.endTime) {
        // 새로운 빈 행 추가
        updated.push({ date: null, startTime: null, endTime: null });
      }
    }

    onChange(updated);
  };

  const handleRemoveSchedule = (index: number) => {
    if (value.length <= 1) return; // 최소 하나는 유지

    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  };

  // 항상 마지막에 빈 행이 있도록 보장
  const schedules = (() => {
    if (value.length === 0) {
      // 빈 배열이면 빈 행 하나 추가
      return [{ date: null, startTime: null, endTime: null }];
    }

    // 마지막 항목이 빈 행인지 확인
    const lastItem = value[value.length - 1];
    const isLastEmpty = !lastItem.date && !lastItem.startTime && !lastItem.endTime;

    if (isLastEmpty) {
      // 이미 마지막이 빈 행이면 그대로 반환
      return value;
    } else {
      // 마지막이 완성된 행이면 빈 행 추가
      return [...value, { date: null, startTime: null, endTime: null }];
    }
  })();

  return (
    <div>
      <div className='mb-4 flex items-center justify-between'>
        <p className='mb-4 block'>예약 가능한 시간대</p>
        <Popover.Root direction='fixed-center-center' open={isPopoverOpen} onOpenChange={handlePopoverChange}>
          <Popover.Trigger asChild>
            <Button
              className='caption-text h-fit border-gray-100 px-10 py-4'
              size='sm'
              variant='outline'
              onClick={() => setIsPopoverOpen(true)}
            >
              반복 일정 추가
            </Button>
          </Popover.Trigger>
          <Popover.Content overlay preventInteraction className='rounded-2xl border-gray-50 bg-white p-24'>
            <div className='flex w-300 flex-col gap-16 md:w-500 xl:w-700'>
              <div>
                <label className='mb-2 block text-sm font-medium'>반복 유형</label>
                <div className='flex items-center gap-8 rounded-xl border border-gray-100 bg-white px-20 py-10'>
                  매주
                </div>
              </div>

              <div className='flex flex-col gap-4 md:flex-row'>
                <div className='flex-1'>
                  <label className='mb-2 block text-sm font-medium'>시작 날짜</label>
                  <DatePicker value={startDate} onChange={setStartDate} />
                </div>
                <div className='flex-1'>
                  <label className='mb-2 block text-sm font-medium'>종료 날짜</label>
                  <DatePicker value={endDate} onChange={setEndDate} />
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
      </div>

      <div className='flex flex-col gap-12'>
        {schedules.map((schedule, idx) => {
          const isLast = idx === schedules.length - 1;
          const scheduleKey =
            schedule?.date && schedule?.startTime && schedule?.endTime
              ? `${schedule.date.format?.('YYYY-MM-DD') ?? 'no-date'}-${schedule.startTime.hour}:${schedule.startTime.minute}-${schedule.endTime.hour}:${schedule.endTime.minute}`
              : `empty-schedule-${idx}`;
          const isComplete = schedule.date && schedule.startTime && schedule.endTime;

          return (
            <div key={scheduleKey} className='flex flex-col items-center gap-8 md:flex-row'>
              <div className='w-full flex-1'>
                <DatePicker
                  value={schedule?.date || null}
                  onChange={(date) => handleScheduleChange(idx, 'date', date)}
                />
              </div>
              <div className='flex w-full flex-wrap items-center gap-8 md:w-auto'>
                <div className='flex-1'>
                  <TimePicker
                    className='w-full md:w-120'
                    value={schedule?.startTime || null}
                    onChange={(time) => handleScheduleChange(idx, 'startTime', time)}
                  />
                </div>
                <div className='flex-1'>
                  <TimePicker
                    className='w-full md:w-120'
                    value={schedule?.endTime || null}
                    onChange={(time) => handleScheduleChange(idx, 'endTime', time)}
                  />
                </div>

                {/* 마지막 행이 아니거나, 완성된 행이면 삭제 버튼 표시 */}
                {(!isLast || isComplete) && (
                  <Button
                    className='aspect-square w-fit rounded-full bg-gray-200'
                    variant='none'
                    onClick={() => handleRemoveSchedule(idx)}
                  >
                    <MinusIcon color='white' />
                  </Button>
                )}

                {/* 마지막 행이고 비어있으면 플레이스홀더 */}
                {isLast && (
                  <Button className='bg-primary-500 aspect-square w-fit rounded-full' variant='none'>
                    <PlusIcon color='white' />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { Button, DatePicker, MinusIcon, PlusIcon, TimePicker, useToast } from '@what-today/design-system';
import type { Dayjs } from 'dayjs';

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
              <DatePicker value={schedule?.date || null} onChange={(date) => handleScheduleChange(idx, 'date', date)} />
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
  );
}

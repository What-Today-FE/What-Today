import { BottomSheet, Calendar, type CalendarReservationStatus, Popover } from '@what-today/design-system';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useResponsive } from '@/hooks/useResponsive';

import ReservationSheet from './ReservationSheet';

interface ReservationCalendarProps {
  reservationsByDate: Record<string, Record<CalendarReservationStatus, number>>;
  onChange?: (date: string) => void;
  onMonthChange?: (year: string, month: string) => void;
  activityId: number;
}

export default function ReservationCalendar({
  reservationsByDate,
  onChange,
  onMonthChange,
  activityId,
}: ReservationCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedDayNode, setSelectedDayNode] = useState<HTMLDivElement | null>(null);
  const [isReservationSheetOpen, setIsReservationSheetOpen] = useState(false);
  const [selectedDatePos, setSelectedDatePos] = useState<DOMRect | null>(null);
  const selectedDayRef = useRef<HTMLDivElement | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const responsive = useResponsive();

  // 👉 날짜 클릭 시 호출
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setIsReservationSheetOpen(true);
  };

  // ✅ 위치 정보만 업데이트
  useEffect(() => {
    if (!selectedDayNode) return;

    const rect = selectedDayNode.getBoundingClientRect();
    setSelectedDatePos((prev) => {
      if (
        prev?.top === rect.top &&
        prev?.left === rect.left &&
        prev?.width === rect.width &&
        prev?.height === rect.height
      ) {
        return prev;
      }
      return rect;
    });
  }, [selectedDayNode]);

  // ✅ Popover 위치 계산
  const reservationPopupPosition: React.CSSProperties = useMemo(() => {
    if (!selectedDatePos || !calendarRef.current) return {};
    const calendarRect = calendarRef.current.getBoundingClientRect();
    const space = 10;
    const popoverWidth = 340;
    const popoverHeight = 537;

    let left = selectedDatePos.left + selectedDatePos.width + space;
    let top = selectedDatePos.top;

    if (left + popoverWidth > calendarRect.right) {
      left = selectedDatePos.left - popoverWidth - space;
    }

    if (top + popoverHeight > calendarRect.bottom) {
      top = calendarRect.bottom - popoverHeight;
    }

    return {
      position: 'absolute',
      left: left + window.scrollX,
      top: top + window.scrollY,
    };
  }, [selectedDatePos]);

  return (
    <div ref={calendarRef}>
      <Calendar.Root
        className='gap-8 rounded-2xl border border-gray-50 pt-20 pb-10 md:gap-30'
        onDateChange={(date) => {
          handleDateSelect(date);
          onChange?.(date);
        }}
        onMonthChange={onMonthChange}
      >
        <Calendar.Header headerClass='py-6' titleClass='md:text-xl' />
        <Calendar.Grid divider weekdayClass='text-sm font-bold md:text-lg' weekdayType='long'>
          {(day) => {
            const key = day.format('YYYY-MM-DD');
            const reservations = reservationsByDate[key];

            return (
              <Calendar.DayCell
                key={key}
                dateClass='size-28 flex md:m-6'
                day={day}
                dayCellClass='h-104 justify-start md:h-124'
                reservations={reservations}
                onMountRef={(node) => {
                  if (selectedDate === key && node) {
                    if (selectedDayRef.current !== node) {
                      selectedDayRef.current = node;
                      setSelectedDayNode(node);
                    }
                  }
                }}
              />
            );
          }}
        </Calendar.Grid>
      </Calendar.Root>

      {/* ✅ 모바일: BottomSheet */}
      <BottomSheet.Root
        isOpen={isReservationSheetOpen && !responsive.isDesktop}
        onClose={() => setIsReservationSheetOpen(false)}
      >
        <BottomSheet.Content className='px-24 py-6'>
          {activityId && selectedDate && <ReservationSheet activityId={activityId} selectedDate={selectedDate} />}
        </BottomSheet.Content>
      </BottomSheet.Root>

      {/* ✅ 데스크탑: Popover */}
      <Popover.Root
        direction='right'
        externalTriggerRef={selectedDayRef}
        open={isReservationSheetOpen && responsive.isDesktop}
        onOpenChange={setIsReservationSheetOpen}
      >
        <Popover.Content
          className='rounded-2xl border border-gray-50 bg-white px-24 py-30'
          style={reservationPopupPosition}
        >
          <div className='h-460 w-292'>
            {activityId && selectedDate && <ReservationSheet activityId={activityId} selectedDate={selectedDate} />}
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}

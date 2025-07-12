import type { Dayjs } from 'dayjs';

interface CurrentHeaderProps {
  currentMonth: Dayjs;
  onPrev: () => void;
  onNext: () => void;
}

// CalendarHeader 컴포넌트
// 해당 월 표기, 전월, 다음월 이동 버튼
export default function CalendarHeader({ currentMonth, onPrev, onNext }: CurrentHeaderProps) {
  return (
    <div className='flex w-640 flex-row justify-center gap-30 py-6 text-xl font-bold'>
      {/* ◀︎ 아이콘으로 수정 예정 */}
      <button className='cursor-pointer' onClick={onPrev}>
        ◀︎
      </button>
      <div>{currentMonth.format('YYYY년 MM월')}</div>
      {/* ▶︎ 아이콘으로 수정 예정 */}
      <button className='cursor-pointer' onClick={onNext}>
        ▶︎
      </button>
    </div>
  );
}

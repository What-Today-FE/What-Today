import { type ReservationStatus, Select } from '@what-today/design-system';
import { type ReactNode, type SetStateAction, useEffect, useState } from 'react';

import ReservationCalendar from '@/components/reservations-status/ReservationCalendar';
// 실제 api response와 동일한 임시 데이터
const data = [
  {
    date: '2025-07-20',
    reservations: {
      completed: 0,
      confirmed: 1,
      pending: 0,
    },
  },
  {
    date: '2025-07-21',
    reservations: {
      completed: 1,
      confirmed: 0,
      pending: 2,
    },
  },
  {
    date: '2025-07-29',
    reservations: {
      completed: 1,
      confirmed: 3,
      pending: 7,
    },
  },
];
const reservationMap = data.reduce<Record<string, Record<ReservationStatus, number>>>((acc, cur) => {
  acc[cur.date] = cur.reservations;
  return acc;
}, {});
const data2 = {
  activities: [
    {
      id: 5083,
      userId: 2124,
      title: '바람과 함께하는 한강 요가',
      description: '맑은 공기와 잔잔한 물결 위에서 내 몸과 마음을 정화해보세요.',
      category: '스포츠',
      price: 8000,
      address: '서울특별시 영등포구 여의도 한강공원',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/e.png',
      rating: 0,
      reviewCount: 0,
      createdAt: '2025-07-08T14:07:28.448Z',
      updatedAt: '2025-07-08T14:29:06.601Z',
    },
    {
      id: 5082,
      userId: 2124,
      title: '내 손으로 만드는 나만의 도자기',
      description: '흙을 만지며 마음을 다듬는 시간. 초보자도 쉽게 따라 할 수 있어요!',
      category: '문화 · 예술',
      price: 25000,
      address: '서울특별시 종로구 인사동길 12',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/c.png',
      rating: 0,
      reviewCount: 0,
      createdAt: '2025-07-08T14:03:45.530Z',
      updatedAt: '2025-07-08T14:14:23.715Z',
    },
  ],
  totalCount: 2,
  cursorId: null,
};
export default function ReservationsStatusPage() {
  const [selectedValue, setSelectedValue] = useState<{ value: string; label: ReactNode } | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const handleValueChange = (value: SetStateAction<{ value: string; label: ReactNode } | null>) => {
    setSelectedValue(value);
  };
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    // 이후 API 호출 예정
    if (!selectedDate) return;
    if (!selectedValue) return;
  }, [selectedDate, selectedValue]);

  return (
    <div className='flex flex-col md:gap-24 xl:gap-30'>
      <header className='mb-18 flex flex-col gap-10 p-1 md:mb-0'>
        <h1 className='text-xl font-bold text-gray-950'>예약 현황</h1>
        <p className='text-md font-medium text-gray-500'>내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.</p>
      </header>
      <section aria-label='체험 선택하기'>
        <Select.Root value={selectedValue} onChangeValue={handleValueChange}>
          <Select.Trigger className='h-54 max-w-640'>
            <Select.Value placeholder='내 체험 선택하기' />
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              <Select.Label>내 체험 목록</Select.Label>
              {data2.activities.map(({ id, title }) => {
                return (
                  <Select.Item key={id} value={title}>
                    {title}
                  </Select.Item>
                );
              })}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </section>
      <section aria-label='예약 캘린더'>
        <ReservationCalendar reservationsByDate={reservationMap} onChange={handleDateChange} />
      </section>
    </div>
  );
}

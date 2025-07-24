import { Button, NoResult, RadioGroup, ReservationCard } from '@what-today/design-system';
import { useEffect, useState } from 'react';
import { twJoin } from 'tailwind-merge';

import { fetchMyReservations } from '@/apis/myReservations';
import type { Reservation } from '@/schemas/myReservations';

export default function ReservationsListPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const fetchReservations = async (status?: string) => {
    setLoading(true);
    try {
      const result = await fetchMyReservations({
        size: 10,
        status: status || undefined,
      });
      setReservations(result.reservations);
    } catch (err) {
      console.error('예약 목록 조회 실패:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReservations(selectedStatus || undefined);
  }, [selectedStatus]);

  const renderGroupedReservations = (items: Reservation[]) => {
    const grouped = items.reduce<Record<string, Reservation[]>>((acc, cur) => {
      const date = cur.date;
      if (!acc[date]) acc[date] = [];
      acc[date].push(cur);
      return acc;
    }, {});

    return Object.entries(grouped)
      .sort(([a], [b]) => (a < b ? 1 : -1))
      .map(([date, group], index) => (
        <section key={date} className={twJoin('space-y-12 pt-20 pb-30', index !== 0 && 'border-t border-gray-50')}>
          <h3 className='text-lg font-bold text-gray-800'>{date}</h3>
          <ul>
            {group.map((res) => (
              <li key={res.id}>
                <ReservationCard
                  bannerImageUrl={res.activity.bannerImageUrl}
                  endTime={res.endTime}
                  headCount={res.headCount}
                  startTime={res.startTime}
                  status={res.status}
                  title={res.activity.title}
                  totalPrice={res.totalPrice}
                />
                {(res.status === 'confirmed' || (res.status === 'completed' && !res.reviewSubmitted)) && (
                  <div className='mt-12 flex gap-12'>
                    {res.status === 'confirmed' && (
                      <>
                        <Button
                          className='text-md w-full font-medium text-gray-600'
                          size='md'
                          variant='outline'
                          onClick={() => {}}
                        >
                          예약 변경
                        </Button>
                        <Button
                          className='text-md w-full bg-gray-50 font-medium text-gray-600'
                          size='md'
                          variant='fill'
                          onClick={() => {}}
                        >
                          예약 취소
                        </Button>
                      </>
                    )}
                    {res.status === 'completed' && !res.reviewSubmitted && (
                      <Button className='text-md font-medium text-white' size='md' variant='fill' onClick={() => {}}>
                        후기 작성
                      </Button>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      ));
  };

  let content;
  if (loading) {
    content = <div className='flex justify-center p-40 text-gray-500'>로딩 중...</div>;
  } else if (reservations.length > 0) {
    content = <div className='space-y-10'>{renderGroupedReservations(reservations)}</div>;
  } else {
    content = (
      <div className='flex justify-center p-40'>
        <NoResult dataName='예약한 체험이' />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-13 md:gap-20'>
      <header className='flex flex-col justify-between gap-14 py-1 md:flex-row md:items-center'>
        <div className='flex flex-col gap-10'>
          <h1 className='text-2lg font-bold text-gray-950'>예약내역</h1>
          <p className='text-md font-medium text-gray-500'>예약내역 변경 및 취소할 수 있습니다.</p>
        </div>
      </header>

      <section className='mb-10'>
        <RadioGroup
          radioGroupClassName='gap-6'
          selectedValue={selectedStatus}
          titleClassName='text-lg font-semibold mb-2'
          onSelect={(value) => setSelectedStatus(String(value))}
        >
          <div className='flex flex-wrap gap-6'>
            <RadioGroup.Radio value='pending'>예약 대기</RadioGroup.Radio>
            <RadioGroup.Radio value='confirmed'>예약 승인</RadioGroup.Radio>
            <RadioGroup.Radio value='declined'>예약 거절</RadioGroup.Radio>
            <RadioGroup.Radio value='canceled'>예약 취소</RadioGroup.Radio>
            <RadioGroup.Radio value='completed'>체험 완료</RadioGroup.Radio>
          </div>
        </RadioGroup>
      </section>

      <section aria-label='예약 카드 목록' className='flex flex-col gap-30 xl:gap-24'>
        {content}
      </section>
    </div>
  );
}

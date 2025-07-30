interface ReservationCardProps {
  /**
   * 체험 제목
   */
  title: string;
  /**
   * 체험 썸네일 이미지 URL
   */
  bannerImageUrl: string;
  /**
   * 예약 상태
   * - pending: 신청 완료
   * - confirmed: 예약 승인
   * - declined: 예약 거절
   * - canceled: 예약 취소
   * - completed: 체험 완료
   */
  status: 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';
  /**
   * 총 가격 (₩)
   */
  totalPrice: number;
  /**
   * 인원 수
   */
  headCount: number;
  /**
   * 체험 시작 시간 ('HH:mm', 24시간제 시각 문자열)
   */
  startTime: string;
  /**
   * 체험 종료 시간 ('HH:mm', 24시간제 시각 문자열)
   */
  endTime: string;
  /**
   * 카드 클릭 시 실행할 콜백 함수 (예: 체험 상세 페이지 이동)
   */
  onClick?: () => void;
}

/**
 * ReservationCard 컴포넌트
 *
 * - 체험 예약 정보를 카드 형태로 보여주는 UI입니다.
 * - 제목, 배너 이미지, 예약 상태, 가격, 인원, 시간 등의 정보를 표시합니다.
 * - 예약 상태는 `badge`와 색상(`style`)으로 시각화됩니다.
 *
 * @component
 * @param {ReservationCardProps} props - 예약 정보 및 상태 관련 데이터
 * @returns {JSX.Element} 예약 카드 UI
 *
 * @example
 * ```tsx
 * <ReservationCard
 *   title="요가 클래스"
 *   bannerImageUrl="/images/yoga.jpg"
 *   status="confirmed"
 *   totalPrice={54000}
 *   headCount={2}
 *   startTime="10:00"
 *   endTime="11:00"
 * />
 * ```
 */
export default function ReservationCard({
  title,
  bannerImageUrl,
  status,
  totalPrice,
  headCount,
  startTime,
  endTime,
  onClick,
}: ReservationCardProps) {
  const formatPrice = (value: number) => value.toLocaleString('ko');
  // badge 컴포넌트로 수정 예정
  const reservationStatus = {
    pending: { badge: '신청 완료', style: 'bg-[#DAF0FF] text-[#0D6CD1]' },
    confirmed: { badge: '예약 승인', style: 'bg-[#DDF9F9] text-[#1790A0]' },
    declined: { badge: '예약 거절', style: 'bg-[#FCECEA] text-[#F96767]' },
    canceled: { badge: '예약 취소', style: 'bg-[#E0E0E5] text-[#707177]' },
    completed: { badge: '체험 완료', style: 'bg-[#E9FBE4] text-[#2BA90D]' },
  };
  const { badge, style } = reservationStatus[status];

  return (
    <article
      className='flex cursor-pointer items-stretch -space-x-38 rounded-2xl border border-gray-50 md:-space-x-20 xl:max-w-640 xl:-space-x-26'
      onClick={onClick}
    >
      <section className='z-10 flex h-150 w-full flex-col justify-between rounded-l-2xl rounded-r-3xl bg-white p-20 xl:px-40 xl:py-30'>
        <header className='flex flex-col xl:gap-4'>
          <div className='flex flex-col gap-4 xl:gap-8'>
            {/* badge 컴포넌트로 수정 예정 */}
            <span className={`caption-text w-fit rounded-full px-8 py-2 text-center font-bold ${style}`}>{badge}</span>
            <h3 className='subtitle-text'>{title}</h3>
          </div>
          <div className='caption-text text-gray-400'>
            <time>{startTime}</time>-<time>{endTime}</time>
          </div>
        </header>
        <div className='flex items-center gap-4'>
          <div className='body-text font-bold'>₩{formatPrice(totalPrice)}</div>
          <div className='caption-text text-gray-400'>{formatPrice(headCount)}명</div>
        </div>
      </section>
      <img alt={`${title} 체험 배너`} className='size-150 rounded-r-2xl object-cover' src={bannerImageUrl} />
    </article>
  );
}

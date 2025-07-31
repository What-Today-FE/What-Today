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
   * 카드 전체 클릭 시 호출될 함수 (상세 페이지 이동 등)
   */
  onNavigate?: () => void;
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
  onNavigate,
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
      className='flex cursor-pointer -space-x-38 rounded-3xl shadow-[0px_4px_24px_rgba(156,180,202,0.2)] md:-space-x-20 xl:max-w-640 xl:-space-x-26'
      onClick={onNavigate}
    >
      <section className='z-10 flex h-136 w-full flex-col justify-between rounded-3xl bg-white p-20 shadow-[0px_-8px_20px_0px_rgba(0,0,0,0.05)] xl:h-181 xl:px-40 xl:py-30'>
        <header className='flex flex-col xl:gap-4'>
          <div className='flex flex-col gap-4 xl:gap-8'>
            {/* badge 컴포넌트로 수정 예정 */}
            <span className={`w-63 rounded-full px-6 py-1 text-center text-sm font-bold ${style}`}>{badge}</span>
            <h3 className='xl:text-2lg text-sm font-bold text-gray-950'>{title}</h3>
          </div>
          <div className='text-sm font-medium text-gray-500 xl:text-lg'>
            <time>{startTime}</time>-<time>{endTime}</time>
          </div>
        </header>
        <div className='flex items-center gap-4'>
          <div className='xl:text-2lg text-lg font-bold text-gray-950'>₩{formatPrice(totalPrice)}</div>
          <div className='text-md font-medium text-gray-400 xl:text-lg'>{headCount}명</div>
        </div>
      </section>
      <img alt={`${title} 체험 배너`} className='size-136 rounded-r-3xl xl:size-181' src={bannerImageUrl} />
    </article>
  );
}

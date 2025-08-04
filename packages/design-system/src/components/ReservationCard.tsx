import UserBadge from './UserBadge';

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

  return (
    <article
      className='flex h-fit w-auto cursor-pointer items-stretch -space-x-38 rounded-2xl border border-gray-50 md:-space-x-20 xl:-space-x-26'
      onClick={onClick}
    >
      <section className='z-5 flex w-full flex-col justify-between rounded-l-2xl rounded-r-3xl bg-white p-20 xl:gap-6'>
        <div className='flex flex-col gap-4 xl:gap-6'>
          <UserBadge status={status} />
          <h3 className='section-text line-clamp-7 md:line-clamp-3'>{title}</h3>
        </div>
        <div className='body-text text-gray-400'>
          <time>{startTime}</time>-<time>{endTime}</time>
        </div>
        <div className='body-text mt-10 flex flex-wrap items-center gap-4 md:mt-0'>
          <div className='font-bold'>₩{formatPrice(totalPrice)}</div>
          <div className='text-gray-400'>{formatPrice(headCount)}명</div>
        </div>
      </section>
      <div className='flex-shrink-0'>
        <img
          alt={`${title} 체험 배너`}
          className='h-full w-150 rounded-r-2xl object-cover md:w-160'
          src={bannerImageUrl}
        />
      </div>
    </article>
  );
}

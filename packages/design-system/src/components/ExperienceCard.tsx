import { StarIcon } from '@components/icons';

import Button from './button';

interface ExperienceCardProps {
  /**
   * 체험 제목
   */
  title: string;
  /**
   * 체험 가격 (숫자, 원 단위)
   */
  price: number;
  /**
   * 체험 썸네일 이미지 URL
   */
  bannerImageUrl: string;
  /**
   * 체험 평점 (예: 4.8)
   */
  rating: number;
  /**
   * 리뷰 수 (예: 123)
   */
  reviewCount: number;
  /**
   * '수정하기' 버튼 클릭 시 호출될 함수
   */
  onEdit: () => void;
  /**
   * '삭제하기' 버튼 클릭 시 호출될 함수
   */
  onDelete: () => void;
  /**
   * 카드 전체 클릭 시 호출될 함수 (상세 페이지 이동 등)
   */
  onNavigate?: () => void;
}

/**
 * ExperienceCard 컴포넌트
 *
 * - 체험 정보를 카드 형태로 보여주는 컴포넌트입니다.
 * - 제목, 평점, 가격, 리뷰 수, 배너 이미지와 함께 '수정하기' / '삭제하기' 버튼을 제공합니다.
 *
 * @component
 * @param {ExperienceCardProps} props - 체험 정보 및 버튼 이벤트 핸들러
 * @returns {JSX.Element} 체험 카드 UI
 *
 * @example
 * ```tsx
 * <ExperienceCard
 *   title="쿠킹 클래스"
 *   price={35000}
 *   bannerImageUrl="/images/cooking.jpg"
 *   rating={4.8}
 *   reviewCount={129}
 *   onEdit={() => console.log('edit')}
 *   onDelete={() => console.log('delete')}
 * />
 * ```
 */
export default function ExperienceCard({
  title,
  price,
  bannerImageUrl,
  rating,
  reviewCount,
  onEdit,
  onDelete,
  onNavigate,
}: ExperienceCardProps) {
  const formatPrice = (value: number) => value.toLocaleString('ko');

  const handleClickStop = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <article
      className='flex w-full cursor-pointer justify-between gap-22 rounded-3xl p-24 shadow-[0px_4px_24px_rgba(156,180,202,0.2)] xl:p-30'
      onClick={onNavigate}
    >
      <div className='flex flex-col gap-12 xl:gap-14'>
        <header className='flex flex-col gap-6 xl:gap-8'>
          <h3 className='text-2lg font-bold'>{title}</h3>
          <div className='caption-text flex items-center gap-2 text-gray-400'>
            <StarIcon filled className='size-14 xl:size-16' />
            <span>{rating}</span>
            <span>({reviewCount})</span>
          </div>
        </header>
        <div className='flex items-center gap-4'>
          <span className='font-bold'>₩{formatPrice(price)}</span>
          <span className='text-gray-400'>/인</span>
        </div>
        <div className='text-md flex gap-8 text-gray-600' role='group'>
          <button
            className={`${buttonClass} bg-white`}
            onClick={(e) => {
              handleClickStop(e);
              onEdit();
            }}
          >
            수정하기
          </button>
          <button
            className={`${buttonClass} bg-gray-50`}
            onClick={(e) => {
              handleClickStop(e);
              onDelete();
            }}
          >
            삭제하기
          </Button>
        </div>
      </div>
      <img alt='체험 배너 이미지' className='size-82 rounded-xl md:size-132 xl:size-142' src={bannerImageUrl} />
    </article>
  );
}

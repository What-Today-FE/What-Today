import { StarIcon } from '@components/icons';

interface ExperienceCardProps {
  title: string;
  price: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ExperienceCard({
  title,
  price,
  bannerImageUrl,
  rating,
  reviewCount,
  onEdit,
  onDelete,
}: ExperienceCardProps) {
  const baseButtonClass = 'h-29 cursor-pointer rounded-lg border border-gray-50 px-9 py-4 leading-none';
  const hoverButtonClass = 'hover:outline-2 hover:outline-gray-200';

  return (
    <div className='flex w-full justify-between gap-22 rounded-3xl p-24 shadow-[0px_4px_24px_rgba(156,180,202,0.2)] xl:p-30'>
      <div className='flex flex-col gap-12 xl:gap-20'>
        <div className='flex flex-col gap-10 xl:gap-10'>
          <div className='flex flex-col gap-6 xl:gap-10'>
            <div className='xl:text-2lg text-lg font-bold text-gray-950'>{title}</div>
            <div className='flex items-center gap-2 text-sm text-gray-500'>
              <StarIcon filled className='size-14 xl:size-16' />
              <span>{rating}</span>
              <span>({reviewCount})</span>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <span className='xl:text-2lg text-lg font-bold text-gray-950'>₩{price}</span>
            <span className='text-md font-medium text-gray-400 xl:text-lg'>/인</span>
          </div>
        </div>
        <div className='text-md flex gap-8 text-gray-600'>
          <button className={`${baseButtonClass} ${hoverButtonClass} bg-white`} onClick={onEdit}>
            수정하기
          </button>
          <button className={`${baseButtonClass} ${hoverButtonClass} bg-gray-50`} onClick={onDelete}>
            삭제하기
          </button>
        </div>
      </div>
      <img className='size-82 rounded-[20px] xl:size-142' src={bannerImageUrl} />
    </div>
  );
}

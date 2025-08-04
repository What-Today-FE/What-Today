interface Activity {
  id: number;
  bannerImageUrl: string;
  title: string;
  price: number;
}

interface OngoingExperienceCardProps extends Activity {
  onClickActivity: (id: number) => void;
}

export default function OngoingExperienceCard({
  id,
  bannerImageUrl,
  title,
  price,
  onClickActivity,
}: OngoingExperienceCardProps) {
  return (
    <div className='relative h-170 w-150 shrink-0 cursor-pointer' onClick={() => onClickActivity(id)}>
      <img alt={title} className='h-full w-full rounded-t-2xl rounded-b-3xl object-cover' src={bannerImageUrl} />
      <div className='absolute bottom-0 w-full translate-y-[40px] cursor-pointer rounded-2xl border border-gray-50 bg-white px-12 py-12'>
        <p className='caption-text line-clamp-2 font-semibold'>{title}</p>
        <p className='caption-text text-gray-400'>₩ {price.toLocaleString()} / 인</p>
      </div>
    </div>
  );
}

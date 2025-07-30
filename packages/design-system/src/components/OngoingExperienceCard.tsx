export default function OngoingExperienceCard() {
  return (
    <div className='relative h-170 w-150 cursor-pointer'>
      <img
        className='h-full w-full rounded-t-2xl rounded-b-3xl object-cover'
        src='https://flexible.img.hani.co.kr/flexible/normal/970/647/imgdb/original/2023/0830/20230830503692.jpg'
      />
      <div className='absolute bottom-0 w-full translate-y-[40px] cursor-pointer rounded-2xl border border-gray-50 bg-white px-12 py-12'>
        <p className='text-md line-clamp-1 font-semibold'>도라에몽ㅇ도라에몽 도라에몽ㅇ도라에몽ㅇ</p>
        <p className='text-md text-gray-500'>w 3,000,000 / 인</p>
      </div>
    </div>
  );
}

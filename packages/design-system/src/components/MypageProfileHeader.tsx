export default function MypageProfileHeader() {
  return (
    <div className='flex w-full items-center gap-24 rounded-3xl bg-white px-36 py-24'>
      <div className='flex size-100 items-center justify-center rounded-full border border-gray-50 bg-white'>
        <div className='size-90 rounded-full bg-amber-100' />
      </div>

      <div className='flex h-80 flex-col justify-between text-gray-950'>
        <p className='text-2xl font-bold'>멋쟁이 개발자 님</p>
        <p className='opacity-50'>로그아웃</p>
      </div>
    </div>
  );
}

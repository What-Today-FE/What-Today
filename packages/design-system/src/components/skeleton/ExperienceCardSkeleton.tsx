export default function ExperienceCardSkeleton() {
  return (
    <div className='flex h-182 w-full animate-pulse cursor-pointer justify-between gap-22 rounded-3xl border border-gray-50 p-24 xl:p-30'>
      <div className='flex flex-1 flex-col gap-12 xl:gap-14'>
        <div className='flex flex-col gap-6 xl:gap-8'>
          <div className='h-30 w-full rounded-xl bg-gray-100' />
          <div className='h-21 w-full rounded-xl bg-gray-100' />
        </div>
        <div className='h-24 w-full rounded-xl bg-gray-100' />
        <div className='flex gap-8'>
          <div className='h-29 w-68.5 rounded-xl bg-gray-100' />
          <div className='h-29 w-68.5 rounded-xl bg-gray-100' />
        </div>
      </div>
      <div className='size-82 rounded-xl bg-gray-100 md:size-132 xl:size-142' />
    </div>
  );
}

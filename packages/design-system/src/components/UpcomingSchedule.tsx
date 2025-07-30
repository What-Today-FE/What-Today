function ScheduleDateLabel({ date }: { date: string }) {
  return <p className='text-gray-500'>{date}</p>;
}

function ScheduleItem({
  title,
  date,
  location,
  src,
}: {
  title: string;
  date: string;
  location?: string;
  src?: string;
}) {
  return (
    <div className='flex h-120 w-full cursor-pointer items-center justify-between'>
      <div className='flex h-full flex-1 flex-col justify-center rounded-l-2xl rounded-r-none border border-r-0 border-gray-100 p-16 px-24'>
        <p className='mb-4 line-clamp-1 font-bold'>{title}</p>
        <p className='text-md text-gray-500'>{date}</p>
        <p className='text-md text-gray-500'>{location}</p>
      </div>
      <img className='h-full w-140 rounded-l-none rounded-r-2xl object-cover' src={src} />
    </div>
  );
}

export default function UpcomingSchedule() {
  return (
    <div className='flex gap-12'>
      <div className='flex flex-col items-center'>
        <div className='size-16 rounded-full bg-gray-300' />
        <div className='h-full w-4 bg-gray-300' />
      </div>

      <div className='flex flex-col gap-12'>
        <div className='flex flex-col gap-8'>
          <ScheduleDateLabel date='2025.08.09' />
          <ScheduleItem
            date='2025.08.03 13:00~15:00'
            location='서울시 노원구'
            src='https://flexible.img.hani.co.kr/flexible/normal/970/647/imgdb/original/2023/0830/20230830503692.jpg'
            title='대나무 헬리콥터 도라메옴 도라에몽ㅇ옹오'
          />
          <ScheduleItem
            date='2025.08.03 13:00~15:00'
            location='서울시 중랑구'
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEMdx3CrKnCMVOWbQeiKMkqaucWI2GVNBlcA&s'
            title='대나무 헬리콥터'
          />
          <ScheduleItem
            date='2025.08.03 13:00~15:00'
            location='서울시 도봉구'
            src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/19/9d/02/camel-herder-in-mongolia.jpg?w=1400&h=1400&s=1'
            title='대나무 헬리콥터'
          />
        </div>
        <div className='flex flex-col gap-8'>
          <ScheduleDateLabel date='2025.08.09' />
          <ScheduleItem
            date='2025.08.03 13:00~15:00'
            location='서울시 광진구'
            src='https://cdn.ntoday.co.kr/news/photo/202502/113360_93208_3113.jpg'
            title='대나무 헬리콥터'
          />
        </div>
      </div>
    </div>
  );
}

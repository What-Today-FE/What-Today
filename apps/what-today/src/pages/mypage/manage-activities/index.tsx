import { Button, ExperienceCard } from '@what-today/design-system';
// 실제 api response와 동일한 임시 데이터
const data = {
  activities: [
    {
      id: 5083,
      userId: 2124,
      title: '바람과 함께하는 한강 요가',
      description: '맑은 공기와 잔잔한 물결 위에서 내 몸과 마음을 정화해보세요.',
      category: '스포츠',
      price: 8000,
      address: '서울특별시 영등포구 여의도 한강공원',
      bannerImageUrl: 'https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/02/urban-20230228144115810458.jpg',
      rating: 0,
      reviewCount: 0,
      createdAt: '2025-07-08T14:07:28.448Z',
      updatedAt: '2025-07-08T14:29:06.601Z',
    },
    {
      id: 5082,
      userId: 2124,
      title: '내 손으로 만드는 나만의 도자기',
      description: '흙을 만지며 마음을 다듬는 시간. 초보자도 쉽게 따라 할 수 있어요!',
      category: '문화 · 예술',
      price: 25000,
      address: '서울특별시 종로구 인사동길 12',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/c.png',
      rating: 0,
      reviewCount: 0,
      createdAt: '2025-07-08T14:03:45.530Z',
      updatedAt: '2025-07-08T14:14:23.715Z',
    },
  ],
  totalCount: 2,
  cursorId: null,
};

export default function ManageActivitiesPage() {
  return (
    <div className='flex flex-col gap-13 md:gap-30'>
      <div className='flex flex-col justify-between gap-14 py-1 md:flex-row md:items-center'>
        <div className='flex flex-col gap-10'>
          <div className='text-xl font-bold text-gray-950'>내 체험 관리</div>
          <div className='text-md font-medium text-gray-500'>체험을 등록하거나 수정 및 삭제가 가능합니다.</div>
        </div>
        <Button className='w-full md:w-138'>체험 등록하기</Button>
      </div>
      <div className='flex flex-col gap-30 xl:gap-24'>
        {data.activities.map(({ id, title, price, bannerImageUrl, rating, reviewCount }) => {
          return (
            <ExperienceCard
              key={id}
              bannerImageUrl={bannerImageUrl}
              price={price}
              rating={rating}
              reviewCount={reviewCount}
              title={title}
              onDelete={() => alert('삭제')}
              onEdit={() => alert('수정')}
            />
          );
        })}
      </div>
    </div>
  );
}

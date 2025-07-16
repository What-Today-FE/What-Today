import ReservationCard from '@/components/ReservationCard';
import DocTemplate from '@/layouts/DocTemplate';
import Playground from '@/layouts/Playground';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `<ReservationCard title='예약하신 체험 제목입니다. '
  bannerImageUrl='https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/02/urban-20230228144115810458.jpg'
  status='canceled'
  totalPrice={16000}
  headCount={5}
  startTime='13:00'
  endTime='15:00'/>`;

export default function ReservationCardDoc() {
  return (
    <>
      <DocTemplate
        description={`
ReservationCard 컴포넌트는 체험 예약 정보를 카드 형태로 시각화합니다.  
예약 상태에 따라 badge 색상이 동적으로 달라지며,  
체험 시간, 인원, 가격 정보를 한 눈에 보여주는 UI 구성 요소입니다.

아래는 기본적인 사용 예시입니다:

\`\`\`tsx
import { ReservationCard } from '@what-today/design-system';

<ReservationCard
  title="요가 클래스"
  bannerImageUrl="/images/yoga.jpg"
  status="confirmed"
  totalPrice={54000}
  headCount={2}
  startTime="10:00"
  endTime="11:00"
/>
\`\`\`
`}
        propsDescription={`
| Prop           | Type                                                                 | Required | Description                               |
|----------------|----------------------------------------------------------------------|----------|-------------------------------------------|
| title          | \`string\`                                                           | Yes      | 체험 제목                                  |
| bannerImageUrl | \`string\`                                                           | Yes      | 썸네일 이미지 URL                          |
| status         | \`string\` | Yes      | 예약 상태("pending", "confirmed", "declined", "canceled", "completed")                                 |
| totalPrice     | \`number\`                                                           | Yes      | 총 가격 (₩)                               |
| headCount      | \`number\`                                                           | Yes      | 인원 수                                    |
| startTime      | \`string\`                                                           | Yes      | 시작 시간 (24시간제 'HH:mm' 포맷)        |
| endTime        | \`string\`                                                           | Yes      | 종료 시간 (24시간제 'HH:mm' 포맷)        |
`}
        title='ReservationCard'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <h3 className='mb-8 text-base font-semibold text-gray-600'>기본 예시</h3>
      <ReservationCard
        bannerImageUrl='https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/02/urban-20230228144115810458.jpg'
        endTime='11:00'
        headCount={2}
        startTime='10:00'
        status='confirmed'
        title='요가 클래스'
        totalPrice={54000}
      />
      {/* <DocCode code={`<ReservationCard
          title="요가 클래스"
          bannerImageUrl="https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/02/urban-20230228144115810458.jpg"
          status="confirmed"
          totalPrice={54000}
          headCount={2}
          startTime="10:00"
          endTime="11:00"
        />`} /> */}

      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <Playground code={code} scope={{ ReservationCard }} />
      </div>
    </>
  );
}

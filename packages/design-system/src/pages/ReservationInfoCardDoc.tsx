import ReservationInfoCard from '@/components/ReservationInfoCard';
import Playground from '@/layouts/Playground';

import DocTemplate, { DocCode } from '../layouts/DocTemplate';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `<div className='w-400 flex flex-col gap-10'>
        <ReservationInfoCard onApprove={()=> console.log('hi')} nickname='김지현' headCount={7} ownerStatus='pending' userStatus='pending' />
      </div>`;

export default function ReservationInfoCardDoc() {
  return (
    <>
      <DocTemplate
        description={`
\`ReservationInfoCard\`는 예약 요청 정보를 표시하는 카드 컴포넌트입니다.

- **닉네임**, **인원 수** 등의 기본 정보를 표시하며,
- 호스트 상태가 \`pending\`일 경우에는 **승인 / 거절 버튼**을 제공하고,
- 그렇지 않은 경우에는 \`UserBadge\`를 통해 현재 상태를 시각적으로 보여줍니다.

예시:
\`\`\`tsx
import { ReservationInfoCard } from '@what-today/design-system';

<ReservationInfoCard
  nickname="홍길동"
  headCount={2}
  ownerStatus="pending"
  userStatus="confirmed"
  onApprove={() => handleApprove()}
  onReject={() => handleReject()}
/>
\`\`\`
`}
        propsDescription={`

| Prop        | Type                                                   | Required | Description                                   |
|-------------|--------------------------------------------------------|----------|-----------------------------------------------|
| nickname    | \`string\`                                              | Yes      | 예약자 닉네임                                  |
| headCount   | \`number\`                                              | Yes      | 예약 인원 수                                   |
| ownerStatus | "declined" \\| "pending" \\| "confirmed"          | Yes      | 예약 주최자의 상태                              |
| userStatus  | "declined" \\| "pending" \\| "confirmed"          | Yes      | 사용자 상태                                     |
| onApprove   | \`() => void\`                                         | No       | 승인 버튼 클릭 시 호출될 함수                  |
| onReject    | \`() => void\`                                         | No       | 거절 버튼 클릭 시 호출될 함수                  |
        
`}
        title='ReservationInfoCard'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <h3 className='mb-8 text-base font-semibold text-gray-600'>기본 상태 (승인/거절)</h3>
      <div className='w-400'>
        <ReservationInfoCard
          headCount={2}
          nickname='홍길동'
          ownerStatus='pending'
          reservationId={1}
          userStatus='pending'
          onApprove={() => alert('승인됨')}
          onReject={() => alert('거절됨')}
        />
      </div>
      <DocCode
        code={`<ReservationInfoCard
  headCount={2}
  nickname='홍길동'
  ownerStatus='pending'
  userStatus='pending'
  onApprove={() => alert('승인됨')}
  onReject={() => alert('거절됨')}
/>`}
      />
      <h3 className='mb-8 text-base font-semibold text-gray-600'>완료 상태 (Badge 표시)</h3>
      <div className='flex w-400 flex-col gap-10'>
        <ReservationInfoCard
          headCount={3}
          nickname='김철수'
          ownerStatus='confirmed'
          reservationId={1}
          userStatus='confirmed'
        />
        <ReservationInfoCard
          headCount={12}
          nickname='김태일'
          ownerStatus='confirmed'
          reservationId={2}
          userStatus='declined'
        />
      </div>
      <DocCode
        code={`<ReservationInfoCard
  headCount={3}
  nickname="김철수"
  ownerStatus="confirmed"
  userStatus="confirmed"
/>
<ReservationInfoCard 
  headCount={12} 
  nickname='김태일' 
  ownerStatus='confirmed' 
  userStatus='declined' 
/>`}
        language='tsx'
      />
      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <Playground code={code} scope={{ ReservationInfoCard }} />
      </div>
    </>
  );
}

import UserBadge from '@/components/UserBadge';
import DocTemplate, { DocCode } from '@/layouts/DocTemplate';
import Playground from '@/layouts/Playground';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `<UserBadge status='pending' />`;

export default function UserBadgeDoc() {
  return (
    <>
      <DocTemplate
        description={`
\`UserBadge\` 컴포넌트는 사용자 예약 상태 정보를 시각적으로 표현합니다.  
예약 상태(\`status\`)에 따라 배경색과 텍스트 색상, 라벨이 달라집니다.

\`\`\`tsx
import { UserBadge } from '@what-today/design-system';

<UserBadge status="confirmed" />
\`\`\`
        `}
        propsDescription={`
| Prop   | Type                                                          | Required | Description             |
|--------|---------------------------------------------------------------|----------|-------------------------|
| status | "pending" \\| "confirmed" \\| "completed" \\| "declined" \\| "canceled" | Yes      | 예약 상태 구분         |
        `}
        title='UserBadge'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <h3 className='mb-4 text-base font-semibold text-gray-600'>user badge – 예약 상태별 표시</h3>
      <div className='flex flex-wrap gap-4'>
        <UserBadge status='pending' />
        <UserBadge status='confirmed' />
        <UserBadge status='declined' />
        <UserBadge status='canceled' />
        <UserBadge status='completed' />
      </div>
      <DocCode
        code={`<>
  <UserBadge status="pending" />
  <UserBadge status="confirmed" />
  <UserBadge status="declined" />
  <UserBadge status="canceled" />
  <UserBadge status="completed" />
</>`}
        language='tsx'
      />

      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <Playground code={code} scope={{ UserBadge }} />
      </div>
    </>
  );
}

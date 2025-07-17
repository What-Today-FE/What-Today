import Badge from '@/components/Badge';
import DocTemplate, { DocCode } from '@/layouts/DocTemplate';
import Playground from '@/layouts/Playground';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `<Badge type='user' status='pending' />`;

export default function BadgeDoc() {
  return (
    <>
      <DocTemplate
        description={`
\`Badge\` 컴포넌트는 예약 상태에 따라 시각적으로 정보를 전달하는 역할을 합니다.  
사용자 유형에 따라 표시 방식이 달라지며, **type**과 **status**에 따라 스타일이 다르게 적용됩니다.

사용자 뱃지(\`user\`)와 제공자 뱃지(\`owner\`)는 각각의 상태별로 스타일이 지정되어 있으며, \`owner\`일 경우 예약 수(count)를 함께 표시할 수 있습니다.

\`\`\`tsx
import { Badge } from '@what-today/design-system';

<Badge type="user" status="confirmed" />
<Badge type="owner" status="pending" count={3} />
\`\`\`
        `}
        propsDescription={`
| Prop    | Type                                                                 | Required | Description                            |
|---------|----------------------------------------------------------------------|----------|----------------------------------------|
| type    | "user" \\| "owner"                                                   | Yes      | 사용자 유형 (user: 일반, owner: 제공자) |
| status  | 예약 상태 타입에 따라 다름 (아래 참고)                               | Yes      | 뱃지 상태 표시                         |
| count   | number (단, \`type="owner"\`일 경우만 사용)                          | No       | 예약 수 표시 (owner 전용)              |

**Status by type**

| type   | status 목록                                           |
|--------|--------------------------------------------------------|
| user   | "pending", "confirmed", "declined", "canceled", "completed" |
| owner  | "pending", "confirmed", "declined"                     |
        `}
        title='Badge'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}

      <div>
        <h3 className='mb-8 text-base font-semibold text-gray-600'>user badge</h3>
        <div className='flex gap-10'>
          <Badge status='pending' type='user' />
          <Badge status='confirmed' type='user' />
          <Badge status='declined' type='user' />
          <Badge status='canceled' type='user' />
          <Badge status='completed' type='user' />
        </div>
        <DocCode
          code={`<>
  <Badge status='pending' type='user' />
  <Badge status='confirmed' type='user' />
  <Badge status='declined' type='user' />
  <Badge status='canceled' type='user' />
  <Badge status='completed' type='user' />
</>`}
          language='tsx'
        />
      </div>

      <div className='mt-24'>
        <h3 className='mb-8 text-base font-semibold text-gray-600'>owner badge - 예약 건수 포함</h3>
        <div className='flex w-200 gap-10'>
          <Badge count={3} status='pending' type='owner' />
          <Badge count={1} status='confirmed' type='owner' />
          <Badge count={0} status='completed' type='owner' />
        </div>
        <DocCode
          code={`<>
  <Badge count={3} status='pending' type='owner' />
  <Badge count={1} status='confirmed' type='owner' />
  <Badge count={0} status='completed' type='owner' />
</>`}
          language='tsx'
        />
      </div>
      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <Playground code={code} scope={{ Badge }} />
      </div>
    </>
  );
}

import OwnerBadge from '@/components/OwnerBadge';
import DocTemplate, { DocCode } from '@/layouts/DocTemplate';
import Playground from '@/layouts/Playground';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `<OwnerBadge status='confirmed' count={3} />`;

export default function OwnerBadgeDoc() {
  return (
    <>
      <DocTemplate
        description={`
\`OwnerBadge\` 컴포넌트는 예약 제공자(owner)의 상태 정보를 시각적으로 표현합니다.  
예약 상태(\`status\`)에 따라 색상과 텍스트가 달라지며, 상태별 예약 수(\`count\`)도 함께 표시됩니다.

\`\`\`tsx
import { OwnerBadge } from '@what-today/design-system';

<OwnerBadge status="pending" count={3} />
\`\`\`
`}
        propsDescription={`
| Prop   | Type                                    | Required | Description                     |
|--------|-----------------------------------------|----------|---------------------------------|
| status | "pending" \\| "confirmed" \\| "completed" | Yes      | 예약 상태                      |
| count  | number                                  | Yes      | 예약 상태별 수치 정보 표시     |
`}
        title='OwnerBadge'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <h3 className='mb-4 text-base font-semibold text-gray-600'>owner badge – 예약 상태별 표시</h3>
      <div className='flex gap-10'>
        <OwnerBadge count={5} status='pending' />
        <OwnerBadge count={2} status='confirmed' />
        <OwnerBadge count={0} status='completed' />
      </div>
      <DocCode
        code={`<>
  <OwnerBadge status="pending" count={5} />
  <OwnerBadge status="confirmed" count={2} />
  <OwnerBadge status="completed" count={0} />
</>`}
        language='tsx'
      />

      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <Playground code={code} scope={{ OwnerBadge }} />
      </div>
    </>
  );
}

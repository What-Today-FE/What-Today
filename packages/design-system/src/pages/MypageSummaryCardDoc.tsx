import { MypageSummaryCard } from '../components/MypageSummaryCard';
import DocTemplate, { DocCode } from '../layouts/DocTemplate';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
// const code = `예시 코드를 작성해주세요.`;

export default function MypageSummaryCardDoc() {
  return (
    <>
      <DocTemplate
        description={`
# MypageSummaryCard 컴포넌트

간단한 설명을 작성해주세요.
`}
        propsDescription={`
| 이름 | 타입 | 설명 |
|------|------|------|
| example | string | 예시 prop입니다. |
`}
        title='MypageSummaryCard'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <MypageSummaryCard.Root>
        <MypageSummaryCard.Item count={3} label='승인 대기' onClick={() => {}} />
        <MypageSummaryCard.Item count={3} label='승인 대기' onClick={() => {}} />
      </MypageSummaryCard.Root>
      <DocCode code={`<MypageSummaryCard variant="primary">Click me</MypageSummaryCard>`} />

      <div className='mt-100 flex gap-12'>
        <MypageSummaryCard.Root>
          <MypageSummaryCard.Item count={3} label='승인 대기' onClick={() => {}} />
          <MypageSummaryCard.Item count={3} label='승인 대기' onClick={() => {}} />
        </MypageSummaryCard.Root>

        <MypageSummaryCard.Root className='bg-[#4D6071]'>
          <MypageSummaryCard.Item
            count={3}
            countClassName='text-white'
            label='승인 대기'
            labelClassName='text-gray-300'
            onClick={() => {}}
          />
          <MypageSummaryCard.Item
            count={3}
            countClassName='text-white'
            label='승인 대기'
            labelClassName='text-gray-300'
            onClick={() => {}}
          />
        </MypageSummaryCard.Root>
      </div>
    </>
  );
}

import OngoingExperienceCard from '../components/OngoingExperienceCard';
import DocTemplate, { DocCode } from '../layouts/DocTemplate';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
// const code = `예시 코드를 작성해주세요.`;

export default function OngoingExperienceCardDoc() {
  return (
    <>
      <DocTemplate
        description={`
# OngoingExperienceCard 컴포넌트

간단한 설명을 작성해주세요.
`}
        propsDescription={`
| 이름 | 타입 | 설명 |
|------|------|------|
| example | string | 예시 prop입니다. |
`}
        title='OngoingExperienceCard'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <DocCode code={`<OngoingExperienceCard variant="primary">Click me</OngoingExperienceCard>`} />

      <div className='flex gap-12'>
        <OngoingExperienceCard />
        <OngoingExperienceCard />
        <OngoingExperienceCard />
      </div>
    </>
  );
}

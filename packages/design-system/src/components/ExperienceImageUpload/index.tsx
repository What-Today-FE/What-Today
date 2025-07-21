// 외부 사용자를 위한 개별 export
export { default as BannerInput } from './BannerInput';
export { default as IntroduceInput } from './IntroduceInput';

// 내부 사용을 위한 JSX import
import BannerInput from './BannerInput';
import IntroduceInput from './IntroduceInput';

// 🔸 문서 / 데모용 통합 Preview 컴포넌트
export default function ExperienceImageUpload() {
  return (
    <div className='flex flex-col'>
      <BannerInput />
      <IntroduceInput />
    </div>
  );
}

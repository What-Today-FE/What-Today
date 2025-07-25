import { twMerge } from 'tailwind-merge';

import KakaoMap from '../map';

interface ActivitiesMapProps {
  address: string;
  className?: string;
}

/**
 * @description 체험 상세 페이지에서 오시는 길을 보여주는 섹션 내용 컴포넌트입니다.
 * 부모가 높이를 지정해주므로, 이 내부는 h-full 사용 가능
 */
export default function ActivitiesMap({ address, className }: ActivitiesMapProps) {
  return (
    <section className={twMerge(`flex h-511 w-full flex-col justify-start text-xl font-bold`, className)}>
      <div className='text-2lg mb-8 text-left font-bold'>오시는 길</div>
      <div className='text-md mb-8 text-left font-semibold text-gray-950'>{address}</div>
      <div className='h-full w-full overflow-hidden rounded-3xl'>
        <KakaoMap address={address} />
      </div>
    </section>
  );
}

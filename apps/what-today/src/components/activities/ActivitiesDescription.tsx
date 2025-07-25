import { twMerge } from 'tailwind-merge';

interface ActivitiesDescriptionProps {
  description: string;
  className?: string;
}

/**
 * @description 체험 상세 페이지에서 오시는 길을 보여주는 섹션 내용 컴포넌트입니다.
 */
export default function ActivitiesDescription({ description, className }: ActivitiesDescriptionProps) {
  return (
    <section className={twMerge(`flex h-fit w-full flex-col justify-start gap-8`, className)}>
      <div className='text-2lg font-bold text-gray-950'>체험 설명</div>
      <p className='text-lg text-gray-950'>{description}</p>
    </section>
  );
}

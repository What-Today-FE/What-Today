import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import Button from './button';
import { StarIcon } from './icons';

/**
 * 사용자가 별점(1~max)을 선택할 수 있는 컴포넌트입니다.
 *
 * - 마우스 hover 시 해당 별까지 미리보기 효과가 나타납니다.
 * - 클릭하면 선택한 값이 부모에게 onChange로 전달됩니다.
 *
 * @param value 현재 선택된 별점 값 (1~max)
 * @param onChange 별 클릭 시 호출되는 콜백 (새로운 별점 값이 전달됨)
 * @param max 별의 개수 (기본값: 5)
 * @param className 외부에서 스타일 확장을 위한 Tailwind 클래스
 */
interface StarRatingProps {
  /** 현재 선택된 별점 값 (1 ~ max) */
  value: number;
  /** 별 클릭 시 선택된 값 전달 */
  onChange: (value: number) => void;
  /** 최대 별 개수 (기본값: 5) */
  max?: number;
  /** 외부에서 주입할 Tailwind 클래스 */
  className?: string;
}

export default function StarRating({ value, onChange, max = 5, className }: StarRatingProps) {
  // hover 중인 별의 값. null이면 hover가 아닌 상태
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  return (
    <div className={twMerge('flex items-center', className)} onMouseLeave={() => setHoverValue(null)}>
      {Array.from({ length: max }, (_, index) => {
        const starValue = index + 1;
        const isLast = index === max - 1;

        // hover 상태일 때는 hoverValue를 우선적으로 고려
        let isFilled = false;
        let isHover = false;

        if (hoverValue !== null) {
          // hover 중일 때: hoverValue 기준으로 표시
          isHover = starValue <= hoverValue;
          isFilled = false; // hover 중에는 filled 대신 hover 상태로 표시
        } else {
          // hover가 아닐 때: 기존 value 기준으로 표시
          isFilled = starValue <= value;
          isHover = false;
        }

        return (
          <Button
            key={index}
            className={twMerge('h-fit w-fit p-0', className)}
            variant='none'
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHoverValue(starValue)}
          >
            <StarIcon className={twMerge('size-42', !isLast && 'mr-12')} filled={isFilled} hover={isHover} />
          </Button>
        );
      })}
    </div>
  );
}

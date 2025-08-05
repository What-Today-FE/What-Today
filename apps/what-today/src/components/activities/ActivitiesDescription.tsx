import { Button, ChevronIcon } from '@what-today/design-system';
import { useCallback, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface ActivitiesDescriptionProps {
  description: string;
  className?: string;
}

const COLLAPSED_HEIGHT = 300;

/**
 * @description 체험 상세 페이지에서 체험 설명을 보여주는 섹션 컴포넌트입니다.
 */
export default function ActivitiesDescription({ description, className }: ActivitiesDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const checkOverflow = useCallback(() => {
    if (!contentRef.current) return;
    const height = contentRef.current.scrollHeight;
    setIsOverflowing(height > COLLAPSED_HEIGHT);
  }, []);

  useEffect(() => {
    checkOverflow();
  }, [description, checkOverflow]);

  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver(() => {
      checkOverflow();
    });
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [checkOverflow]);

  return (
    <section className={twMerge('flex h-fit w-full flex-col justify-start gap-8', className)}>
      <div className='section-text'>체험 설명</div>

      <div
        ref={contentRef}
        className='relative transition-[max-height] duration-500 ease-in-out'
        style={{
          maxHeight: isExpanded ? `${contentRef.current?.scrollHeight ?? 1000}px` : `${COLLAPSED_HEIGHT}px`,
          overflow: !isExpanded && isOverflowing ? 'hidden' : 'visible',
        }}
      >
        <p className='body-text whitespace-pre-line'>{description}</p>

        {isOverflowing && !isExpanded && (
          <div className='pointer-events-none absolute inset-x-0 bottom-0 h-30 bg-gradient-to-t from-white to-transparent' />
        )}
      </div>

      {isOverflowing && (
        <div className='mt-8 flex justify-center'>
          <Button size='none' variant='none' onClick={() => setIsExpanded((prev) => !prev)}>
            <ChevronIcon className='size-20' color='var(--color-gray-200)' direction={isExpanded ? 'top' : 'bottom'} />
          </Button>
        </div>
      )}
    </section>
  );
}

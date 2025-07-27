import { useCallback } from 'react';

export const useImageErrorHandler = (fallbackSrc: string = '/default-image.webp') => {
  return useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const target = e.currentTarget;

      // 무한 루프 방지를 위한 조건 (필요 없다면 생략 가능)
      if (target.src.includes(fallbackSrc)) return;

      target.onerror = null;
      target.src = fallbackSrc;
    },
    [fallbackSrc],
  );
};

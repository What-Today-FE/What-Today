import { useEffect, useState } from 'react';

type ScreenSize = 'sm' | 'md' | 'lg';

const getBreakpoint = (width: number): ScreenSize => {
  if (width >= 1024) {
    return 'lg';
  }
  if (width >= 768) {
    return 'md';
  }
  return 'sm';
};

export function useResponsive() {
  const [screenSize, setScreenSize] = useState<ScreenSize>(getBreakpoint(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getBreakpoint(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
}

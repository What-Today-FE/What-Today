import { useEffect, useRef } from 'react';

import type { MapProps } from './types';

export default function Map({ address }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('주소 연결 확인:', address);
  }, [address]);

  return (
    <div ref={mapRef} className='h-full w-full bg-gray-200'>
      <p>{`주소 연결 확인(여기에 지도 그림): ${address}`}</p>
    </div>
  );
}

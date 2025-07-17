import { useEffect, useRef } from 'react';

import type { MapProps } from './types';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map({ address }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!import.meta.env.VITE_KAKAO_MAP_API_KEY) {
      console.error('지도 API 키가 없습니다.');
      return;
    }

    const existingScript = document.querySelector(`script[src*="dapi.kakao.com"]`);
    if (existingScript) {
      window.kakao?.maps?.load(() => {
        console.log('카카오 지도 로드 완료 (중복 방지)');
      });
      return;
    }

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
    script.async = true;
    script.onload = () => {
      if (window.kakao?.maps?.load) {
        window.kakao.maps.load(() => {
          console.log('카카오 지도 SDK 로드 완료');
        });
      }
    };
    script.onerror = () => {
      console.error('카카오 지도 SDK 로딩에 실패했습니다.');
    };

    document.head.appendChild(script);
  }, [address]);

  return (
    <div ref={mapRef} className='h-full w-full bg-gray-200'>
      <p>{`주소 연결 확인(여기에 지도 그림): ${address}`}</p>
    </div>
  );
}

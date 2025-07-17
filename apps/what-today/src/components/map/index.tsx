import { useEffect, useRef } from 'react';

import type { KakaoMapDatas, KakaoMapStatus, MapProps } from './types';

declare global {
  interface Window {
    kakao: any;
  }
}

const FALLBACK_LOCATION = {
  lat: 126.98811318937,
  lng: 126.98811318937,
  label: '위치를 찾을 수 없습니다',
};

export default function Map({ address }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!import.meta.env.VITE_KAKAO_MAP_API_KEY) {
      console.error('지도 API 키가 없습니다.');
      return;
    }

    if (window.kakao?.maps) {
      window.kakao.maps.load(() => createMap(address));
    } else {
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
      script.async = true;
      script.onload = () => window.kakao.maps.load(() => createMap(address));
      script.onerror = () => console.error('카카오 지도 SDK 로딩에 실패했습니다.');

      document.head.appendChild(script);
    }
  }, [address]);

  const createMap = (targetAddress: string) => {
    const container = mapRef.current;
    if (!container || !window.kakao?.maps?.services) return;

    container.innerHTML = '';

    const map = new window.kakao.maps.Map(container, {
      center: new window.kakao.maps.LatLng(FALLBACK_LOCATION.lat, FALLBACK_LOCATION.lng),
      level: 3,
    });

    const places = new window.kakao.maps.services.Places();

    const placeMarker = (lat: number, lng: number, label: string) => {
      const coords = new window.kakao.maps.LatLng(lat, lng);
      map.setCenter(coords);

      new window.kakao.maps.Marker({
        map,
        position: coords,
        title: label,
      });
    };

    places.keywordSearch(targetAddress, (data: KakaoMapDatas, status: KakaoMapStatus) => {
      if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
        const { y, x, place_name } = data[0];
        placeMarker(Number(y), Number(x), place_name);
      } else {
        const fallbackKeyword = targetAddress.replace(/\s\d+(-\d+)?$/g, '').trim();

        if (fallbackKeyword !== targetAddress) {
          places.keywordSearch(fallbackKeyword, (retryData: KakaoMapDatas, retryStatus: KakaoMapStatus) => {
            if (retryStatus === window.kakao.maps.services.Status.OK && retryData.length > 0) {
              const { y, x, place_name } = retryData[0];
              placeMarker(Number(y), Number(x), place_name);
            } else {
              console.warn('2차 주소 검색 실패. 기본 위치로 이동합니다.');
              placeMarker(FALLBACK_LOCATION.lat, FALLBACK_LOCATION.lng, FALLBACK_LOCATION.label);
            }
          });
        } else {
          console.warn('주소 검색 실패. 기본 위치로 이동합니다.');
          placeMarker(FALLBACK_LOCATION.lat, FALLBACK_LOCATION.lng, FALLBACK_LOCATION.label);
        }
      }
    });
  };

  return <div ref={mapRef} className='h-full w-full bg-gray-200' />;
}

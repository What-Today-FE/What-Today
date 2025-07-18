import { useEffect, useRef } from 'react';

import type { KakaoMapDatas, KakaoMapStatus, MapProps } from './types';

/**
 * @description
 * 카카오 지도 API를 전역에서 사용할 수 있도록 Window 인터페이스를 확장합니다.
 *
 * 카카오 지도 SDK를 script로 불러오면 `window.kakao` 객체가 런타임에 동적으로 주입되므로,
 * TypeScript에서 이를 인식하지 못하고 오류가 발생합니다.
 * 따라서 `window.kakao`를 명시적으로 선언하여 타입 오류를 방지합니다.
 *
 * @note
 * 타입은 실제 kakao.maps 구조를 정확히 정의하지 않고 `any`로 설정했습니다.
 * 이는 카카오에서 공식적인 TypeScript 타입 정의를 제공하지 않으며,
 * 구조가 방대하고 복잡하기 때문에 유연하게 사용하기 위해 `any`를 지정한 것입니다.
 * 카카오 지도 SDK 라이브러리를 사용하면 타입 정의를 하지 않을 수 있지만,
 * SDK의 기능을 전부 활용하지 않기 때문에 `any`로 설정했습니다.
 */
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

// 기본 위치 설정: 주소 검색 실패 시 기본 좌표(코드잇 본사)로 지도 이동
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

      const overlayHTML = `
        <div style="
          background: white;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 16px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          white-space: nowrap;
        ">
          ${label}
        </div>
      `;

      const customOverlay = new window.kakao.maps.CustomOverlay({
        content: overlayHTML,
        position: coords,
        yAnchor: 2.4,
      });

      customOverlay.setMap(map);
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

/**
 * @interface MapProps
 * @description
 * Map 컴포넌트에 전달되는 props 타입입니다.
 * 검색할 대상 주소 문자열을 포함합니다.
 */
export interface MapProps {
  /** 주소 문자열 (예: "서울특별시 강남구 테헤란로 123") */
  address: string;
}

/**
 * @interface KakaoMapDatas
 * @description
 * 카카오 장소 검색 API(keywordSearch)의 응답 데이터 배열 요소입니다.
 * 주요 필드는 place_name(장소 이름), x/y(좌표), id 등이 있으며,
 * 그 외에도 다양한 필드가 함께 포함될 수 있습니다.
 *
 * @note
 * `x`, `y`는 문자열이지만 지도 렌더링 시 Number 타입으로 변환해서 사용해야 합니다.
 * 추가 필드를 위해 `[key: string]: any`를 사용해 유연성을 확보했습니다.
 */
export interface KakaoMapDatas {
  /** 장소 고유 ID */
  id: string;

  /** 장소 이름 (마커에 표시되는 이름) */
  place_name: string;

  /** 경도 (longitude) - 문자열 형태 */
  x: string;

  /** 위도 (latitude) - 문자열 형태 */
  y: string;

  /** 기타 응답 필드 (카카오 API 스펙에 따라 유동적) */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * @type KakaoMapStatus
 * @description
 * 카카오 장소 검색 결과 상태 코드입니다.
 * API 호출 결과를 판단할 때 사용됩니다.
 *
 * - 'OK': 검색 성공
 * - 'ZERO_RESULT': 검색 결과 없음
 * - 'ERROR': 요청 실패
 */
export type KakaoMapStatus = 'OK' | 'ZERO_RESULT' | 'ERROR';

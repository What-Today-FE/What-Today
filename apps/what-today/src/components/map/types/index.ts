export interface MapProps {
  address: string;
}

export interface KakaoMapDatas {
  id: string;
  place_name: string;
  x: string;
  y: string;
  [key: string]: any;
}

export type KakaoMapStatus = 'OK' | 'ZERO_RESULT' | 'ERROR';

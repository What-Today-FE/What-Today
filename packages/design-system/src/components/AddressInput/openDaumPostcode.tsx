import type { DaumPostcodeData } from './types';

/**
 * Daum 우편번호 검색 팝업을 열어 사용자가 주소를 선택할 수 있게 합니다.
 *
 * - 최초 실행 시 Daum 우편번호 스크립트를 로딩합니다.
 * - 이미 로딩된 경우에는 곧바로 팝업을 실행합니다.
 * - 주소 선택 완료 시 `onSelect` 콜백으로 전체 주소 문자열을 반환합니다.
 *
 * @param {function(string): void} onSelect - 주소 선택 시 호출될 콜백 함수. 전체 주소 문자열이 인자로 전달됩니다.
 *
 * @example
 * openDaumPostcode((address) => {
 *   console.log('선택된 주소:', address);
 * });
 *
 * @remarks
 * 해당 함수는 DOM에 직접 script 태그를 추가하므로, CSR 환경에서만 동작해야 합니다.
 */

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: { oncomplete: (data: DaumPostcodeData) => void }) => {
        open: () => void;
      };
    };
  }
}

export const OpenDaumPostcode = (onSelect: (address: string) => void) => {
  const handleOpen = () => {
    new window.daum!.Postcode({
      oncomplete: (data: DaumPostcodeData) => {
        const roadAddr = data.roadAddress;

        let extraRoadAddr = '';
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraRoadAddr += extraRoadAddr ? `, ${data.buildingName}` : data.buildingName;
        }

        const fullAddr = roadAddr; // 필요 시 extraRoadAddr도 붙일 수 있음
        onSelect(fullAddr);
      },
    }).open();
  };

  if (!window.daum?.Postcode) {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.onload = handleOpen;
    script.onerror = () => {
      console.error('Daum 우편번호 스크립트 로딩에 실패했습니다.');
      // 필요시 사용자에게 알림 또는 대체 방법 제공
    };
    document.body.appendChild(script);
  } else {
    handleOpen();
  }
};

/**
 * 이미지 업로드 컴포넌트에서 각 요소에 적용할 커스텀 Tailwind 클래스 이름을 전달하는 props입니다.
 *
 * - `wrapperClassName`: 전체 컴포넌트를 감싸는 래퍼의 클래스
 * - `labelClassName`: input과 연결된 label 요소의 클래스
 * - `inputClassName`: 실제 input[type="file"] 요소의 클래스
 * - `previewClassName`: 업로드된 이미지 미리보기 컨테이너의 클래스
 * - `imgClassName`: 미리보기 이미지 자체에 적용할 클래스
 * - `deleteButtonClassName`: 이미지 삭제 버튼의 클래스
 * - `deleteIconClassName`: 삭제 버튼 안의 아이콘 클래스
 * - `plusIconClassName`: 업로드 버튼의 + 아이콘 클래스
 * - `counterClassName`: 이미지 업로드 개수를 표시하는 텍스트 클래스
 * - `plusIconColor` : + 아이콘 색깔을 수정하는 클래스
 */
export interface InputProps {
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  previewClassName?: string;
  imgClassName?: string;
  deleteButtonClassName?: string;
  deleteIconClassName?: string;
  plusIconClassName?: string;
  counterClassName?: string;
  plusIconColor?: string;
}

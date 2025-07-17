//////////////////////////////////////////
// Context 타입 정의
//////////////////////////////////////////

/**
 * RadioGroup 컨텍스트의 타입 정의입니다.
 *
 * @property {string} [title] - 라디오 그룹 상단의 제목 (선택 사항)
 * @property {string} [titleClassName] - 제목의 커스텀 클래스명
 * @property {string} [radioGroupClassName] - 라디오 그룹(wrapper)의 커스텀 클래스명
 * @property {string | number} [selectedValue] - 현재 선택된 라디오의 값
 * @property {(value: string | number) => void} onSelect - 라디오 선택 시 호출되는 콜백
 * @property {React.ReactNode} [children] - 하위 라디오 버튼 요소들
 * @property {string} [selectedIconColor] - 선택된 라디오 버튼의 아이콘 색상 (기본값: 'white')
 * @property {string} [selectedClassName] - 선택된 라디오 버튼에 적용할 커스텀 클래스
 * @property {string} [unSelectedClassName] - 비선택된 라디오 버튼에 적용할 커스텀 클래스
 */

export interface RadioContextType {
  title?: string;
  titleClassName?: string;
  radioGroupClassName?: string;
  selectedValue?: string | number;
  onSelect?: (value: string | number) => void;
  children?: React.ReactNode;
  selectedIconColor?: string;
  selectedClassName?: string;
  unSelectedClassName?: string;
}

/**
 * Radio 버튼 컴포넌트의 props 정의입니다.
 *
 * @property {string | number} value - 고유 식별자. 이 값이 selectedValue와 일치하면 선택 상태로 간주됩니다.
 * @property {string} [name='radioGroup'] - input의 name 속성 (기본: 'radioGroup')
 * @property {React.ReactNode} [children] - 버튼 안에 들어갈 내용 (텍스트, 아이콘 등)
 * @property {string} [selectedIconColor] - 선택된 경우 아이콘에 적용할 색상
 * @property {string} [selectedClassName] - 선택된 상태에서의 커스텀 클래스
 * @property {string} [unSelectedClassName] - 비선택 상태에서의 커스텀 클래스
 *
 */
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: number | string;
  name?: string;
  children?: React.ReactNode;
  selectedIconColor?: string;
  selectedClassName?: string;
  unSelectedClassName?: string;
}

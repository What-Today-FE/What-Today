export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 스타일을 선택합니다.
   * - 'fill': 배경이 채워진 버튼
   * - 'outline': 테두리만 있는 버튼
   * - 'ghost': 투명 배경
   * - 'none': 스타일 없음
   * @default 'fill'
   */
  variant?: 'fill' | 'outline' | 'ghost' | 'none';

  /**
   * 버튼 크기를 선택합니다.
   * - 'xl', 'lg', 'md', 'sm', 'xs', 'none'
   * @default 'md'
   */
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'none';

  /**
   * 버튼 내부에 표시될 콘텐츠입니다.
   */
  children: React.ReactNode;

  /**
   * 로딩 상태 여부
   */
  loading?: boolean;

  /**
   * 비활성화 상태 여부
   */
  disabled?: boolean;
}

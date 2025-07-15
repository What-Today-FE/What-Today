export type ButtonProps<T extends React.ElementType> = {
  /**
   * 버튼 스타일을 선택합니다.
   * - 'filled': 배경이 채워진 버튼
   * - 'outlined': 테두리만 있는 버튼
   * - 'ghost': 투명 배경
   * - 'none': 스타일 없음
   * @default 'filled'
   */
  variant?: 'fill' | 'outline' | 'ghost' | 'none';

  /**
   * 버튼 크기를 선택합니다.
   * - 'xl', 'lg', 'md', 'sm', 'xs'
   * @default 'md'
   */
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';

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

  /**
   * 컴포넌트가 렌더링될 HTML요소 또는 React 컴포넌트를 지정합니다.
   * 예를 들어, 버튼을 링크처럼 보이게 하고 싶을 때 'a'를 전달할 수 있습니다.
   * @example
   * <Button as="a" href="/">링크처럼 동작하는 버튼</Button>
   * @example
   * <Button as={Link} to="/">링크처럼 동작하는 버튼</Button>
   */
  as?: T;
} & Omit<React.ComponentPropsWithRef<T>, 'variant' | 'size' | 'children' | 'as' | 'disabled'>;

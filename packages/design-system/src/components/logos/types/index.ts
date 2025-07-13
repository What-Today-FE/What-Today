export interface BaseLogoProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 로고의 가로/세로 크기
   * - 일부 컴포넌트에서는 높이를 비율에 맞게 재조정 되어있습니다.
   * - 꼭 상수값으로 입력해야 합니다. (예: `size={18}`)
   */
  size?: number;
}

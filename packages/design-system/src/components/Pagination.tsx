/**
 * Pagination 컴포넌트는 콘텐츠를 여러 페이지로 나누고,
 * 사용자가 원하는 페이지로 이동할 수 있도록 돕는 페이지네이션 UI를 제공합니다.
 *
 * @component
 *
 * @example 기본 사용
 * ```tsx
 * <Pagination
 *   currentPage={currentPage}
 *   totalPages={totalPages}
 *   onPageChange={setCurrentPage}
 * />
 * ```
 *
 * @example 커스텀 스타일 사용
 * ```tsx
 * <Pagination
 *   currentPage={currentPage}
 *   totalPages={totalPages}
 *   onPageChange={setCurrentPage}
 *   classNames={{
 *     prev: 'text-red-500',
 *     next: 'text-green-500',
 *     page: 'bg-white rounded-md',
 *     activePage: 'bg-blue-100 font-bold',
 *     ellipsis: 'text-black opacity-70',
 *   }}
 * />
 * ```
 *
 * @prop {number} currentPage - 현재 선택된 페이지 번호 (1부터 시작)
 * @prop {number} totalPages - 전체 페이지 수
 * @prop {(page: number) => void} onPageChange - 페이지 버튼 클릭 시 호출되는 핸들러
 * @prop {object} [classNames] - 각 요소에 대한 사용자 정의 Tailwind CSS 클래스명
 * @prop {string} [classNames.prev] - 이전 페이지 버튼에 적용할 클래스
 * @prop {string} [classNames.next] - 다음 페이지 버튼에 적용할 클래스
 * @prop {string} [classNames.page] - 선택되지않은 일반 페이지 버튼에 적용할 클래스
 * @prop {string} [classNames.activePage] - 현재 선택된 페이지 버튼에 적용할 클래스
 * @prop {string} [classNames.ellipsis] - 생략(...) 표시 영역에 적용할 클래스
 */

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  classNames?: {
    prev?: string;
    next?: string;
    page?: string;
    activePage?: string;
    ellipsis?: string;
  };
};

export default function Pagination({ currentPage, totalPages, onPageChange, classNames }: PaginationProps) {
  const generatePageRange = (): (number | string)[] => {
    const pages: (number | string)[] = []; //string = 생략기호 (...)
    const maxVisible = 3; // 중간 페이지 최대 표시 개수
    const sideCount = Math.floor(maxVisible / 2); //현재 페이지 기준 좌우에 몇개 보여줄 지 결정

    // 1페이지는 항상 표시
    pages.push(1);

    // maxVisible=3 기준으로  currentPage가 4이고 sideCount가 1이면 중간 페이지는 [3, 4, 5]가 됨.
    let startPage = currentPage - sideCount;
    let endPage = currentPage + sideCount;

    // 시작 페이지가 너무 작을 경우 보정
    if (startPage <= 2) {
      startPage = 2;
      endPage = Math.min(totalPages - 1, startPage + maxVisible - 1);
    }

    // 끝 페이지가 너무 클 경우 보정
    if (endPage >= totalPages - 1) {
      endPage = totalPages - 1;
      startPage = Math.max(2, endPage - maxVisible + 1);
    }

    if (startPage > 2) {
      pages.push('ellipsis-left'); // (ellipsis-left) 앞쪽 점 생략기호
    }

    // 중간 페이지들
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push('ellipsis-right'); // (ellipsis-right) 뒤쪽 점 생략기호
    }

    // 마지막 페이지
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePageRange();

  return (
    <div className='mt-20'>
      <div className='flex h-40 items-center justify-center gap-2'>
        {/* < 이전 */}
        <button
          className={`px-3 text-lg text-black disabled:opacity-30 ${classNames?.prev ?? ''}`}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          {'<'}
        </button>

        {/* 페이지 번호들 */}
        {pages.map((page) =>
          typeof page === 'number' ? (
            <button
              key={page}
              className={`flex items-center justify-center border-b-2 px-10 text-lg ${
                currentPage === page
                  ? `border-blue-500 text-black ${classNames?.activePage ?? ''}`
                  : `border-transparent text-gray-300 hover:text-black ${classNames?.page ?? ''}`
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ) : (
            <span
              key={page}
              className={`flex h-10 w-10 items-center justify-center text-gray-400 ${classNames?.ellipsis ?? ''}`}
            >
              ...
            </span>
          ),
        )}

        {/* > 다음 */}
        <button
          className={`px-3 text-lg disabled:opacity-30 ${classNames?.next ?? ''}`}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
}

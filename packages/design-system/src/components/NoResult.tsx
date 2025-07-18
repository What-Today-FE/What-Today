import Button from '@components/button';
import { EmptyLogo } from '@components/logos';

interface NoResultProps {
  dataName?: string;
  buttonMessage?: string;
  onRedirect: () => void;
}

/** NoResult
 * @description 데이터를 찾을 수 없을 때 사용자에게 피드백을 주는 컴포넌트입니다. 버튼 클릭 시 지정된 경로로 이동합니다.
 *
 * @param dataName - "앗, 아직 {dataName} 없습니다."에 들어갈 dataName (default: 데이터가)
 * @param buttonMessage - 버튼에 표시할 텍스트 (예: '추천 보러가기') (default: 둘러보기)
 * @param onRedirect - 버튼 클릭 시 이동할 라우터 경로가 담긴 콜백 함수 (예: 'onClick={() => navigate('/mypage')}')
 *
 * @example
 * ```tsx
 * <NoResult
 *   dataName="예약 내역이"
 *   buttonMessage="예약하러 가기"
 *   onRedirect={() => navigate('/mypage')}
 * />
 * ```
 */
export default function NoResult({ dataName = '데이터가', buttonMessage = '둘러보기', onRedirect }: NoResultProps) {
  return (
    <div className='flex w-fit flex-col items-center gap-24 md:gap-32'>
      <EmptyLogo className='size-100 md:size-140' />
      <p className='text-lg text-gray-800'>앗, 아직 {dataName} 없습니다.</p>
      <Button className='w-full font-normal' size='xs' variant='outline' onClick={onRedirect}>
        {buttonMessage}
      </Button>
    </div>
  );
}

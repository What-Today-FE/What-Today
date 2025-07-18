import { useNavigate } from 'react-router-dom';

import Playground from '@/layouts/Playground';

import NotificationCard from '../components/NotificationCard';
import DocTemplate, { DocCode } from '../layouts/DocTemplate';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = `<NotificationCard
          content='바람과 함께하는 한강 요가(2025-07-20 07:00~08:00) 예약이 승인되었습니다.'
          onClickDetail={() => navigate('/mypage/reservations-list')}
          onDelete={() => alert('삭제 API 요청')}
        />`;

export default function NotificationCardDoc() {
  const navigate = useNavigate();

  return (
    <>
      <DocTemplate
        description={`
예약 내역 승인/거절을 알리는 알림 컴포넌트입니다.  
Header의 알림창 팝오버에서 보여지며, 알림은 개별 삭제 가능합니다.

디자인 시스템 특성상 라우터 이동은 콜백 함수로 전달 받아 사용합니다.

디자인 시안에서 조금 변형하여, 신청 내역을 클릭하면 마이페이지의 예약 내역 페이지로 이동하는 기능을 추가하였습니다.
`}
        propsDescription={`
| 이름 | 타입 | 설명 |
|------|------|------|
| content | \`string\` | 알림 메시지 내용 |
| onDelete | \`() => void\` | 삭제 버튼 클릭 시 실행할 콜백 (개별 알림 삭제) |
| onClickDetail | \`() => void\` | 마이페이지-예약 내역으로 이동할 콜백 |
`}
        title='NotificationCard'
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      {/* divide-y와 border로 NotificationCard 사이에 구분선 추가 => 알림창 팝오버에 적용 */}
      <div className='mb-12 w-300 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-md md:w-400 xl:w-500'>
        <NotificationCard
          content='바람과 함께하는 한강 요가(2025-07-20 07:00~08:00) 예약이 승인되었습니다.'
          onClickDetail={() => navigate('/mypage/reservations-list')}
          onDelete={() => alert('삭제 API 요청')}
        />
        <NotificationCard
          content='전통 다도 체험 클래스(2025-09-12 14:00~15:30) 예약이 승인되었습니다.'
          onClickDetail={() => navigate('/mypage/reservations-list')}
          onDelete={() => alert('삭제 API 요청')}
        />
        <NotificationCard
          content='한강 야외 영화 상영회(2025-07-27 20:00~22:00) 예약이 거절되었습니다.'
          onClickDetail={() => navigate('/mypage/reservations-list')}
          onDelete={() => alert('삭제 API 요청')}
        />
        <NotificationCard
          content='메시지 파싱에 실패하면 이렇게 보여집니다.'
          onClickDetail={() => navigate('/mypage/reservations-list')}
          onDelete={() => alert('삭제 API 요청')}
        />
      </div>
      <DocCode
        code={`<NotificationCard
  content='바람과 함께하는 한강 요가(2025-07-20 07:00~08:00) 예약이 승인되었습니다.'
  onClickDetail={() => navigate('/mypage/reservations-list')}
  onDelete={() => alert('삭제 API 요청')}
/>`}
      />

      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <Playground code={code} scope={{ NotificationCard }} />
      </div>
    </>
  );
}

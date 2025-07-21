import { Button } from '@what-today/design-system';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className='to-primary-500/40 absolute top-0 left-0 h-1/2 w-full bg-gradient-to-t from-transparent' />
      <div className='relative z-10 h-1400'>
        <h1>여기는 메인 페이지 입니다</h1>
        <Button variant='fill' onClick={() => navigate('/activities/5083')}>
          상세페이지 버튼
        </Button>
      </div>
    </>
  );
}

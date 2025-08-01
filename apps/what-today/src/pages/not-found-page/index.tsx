import { Button, NotFoundLogo } from '@what-today/design-system';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center bg-white'>
      <div className='flex flex-col items-center gap-48'>
        <div className='flex flex-col items-center justify-center gap-12'>
          <div>
            <NotFoundLogo className='h-auto w-200 md:w-300' />
          </div>
          <p className='body-text text-gray-400'>죄송합니다. 존재하지 않는 페이지입니다.</p>
        </div>

        <Button size='sm' onClick={() => navigate('/')}>
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}

import { Button } from '@what-today/design-system';

export default function MainPage() {
  return (
    <>
      <div className='to-primary-500/40 absolute top-0 left-0 h-1/2 w-full bg-gradient-to-t from-transparent' />
      <div className='relative z-10 h-1400'>
        <h1>여기는 메인 페이지 입니다</h1>
        <Button>디자인 시스템 버튼</Button>
      </div>
    </>
  );
}

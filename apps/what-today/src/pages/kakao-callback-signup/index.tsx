import { SpinIcon } from '@what-today/design-system';

import { useKakaoOAuth } from '@/hooks/useKakaoOAuth';

export default function KakaoCallbackSignup() {
  useKakaoOAuth({ mode: 'signup', onErrorRedirect: '/login' });

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <SpinIcon className='size-100' color='#E5F3FF' />
    </div>
  );
}

import useAuth from '@hooks/useAuth';
import { Button, ImageLogo, KaKaoIcon, TextLogo, useToast } from '@what-today/design-system';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import EmailInput from '@/components/login/EmailInput';
import PasswordInput from '@/components/login/PasswordInput';

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginUser, fetchMyProfile } = useAuth();
  const { toast } = useToast();

  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /** handleLogin
   * @description 로그인 요청을 보내고, 성공 시 토큰과 사용자 정보를 전역 상태로 저장합니다.
   * @throws 에러 발생 시 메시지를 토스트 메시지로 출력합니다.
   */
  const handleLogin = async () => {
    try {
      setIsLoginLoading(true);
      await loginUser(email, password);
      await fetchMyProfile();
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (error) {
      const message = error instanceof Error ? error.message : '로그인에 실패했습니다.';
      toast({
        title: '로그인 오류',
        description: message,
        type: 'error',
      });
    } finally {
      setIsLoginLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen w-screen min-w-300 flex-col items-center justify-center px-[5vw] py-50 md:py-80'>
      <div className='flex h-fit w-full flex-col items-center justify-center gap-32 md:w-500'>
        <div className='flex flex-col items-center gap-12'>
          <ImageLogo className='size-100 md:size-140' />
          <TextLogo className='h-fit w-130 md:w-180' />
        </div>

        <form
          className='flex w-full flex-col items-center justify-center gap-32'
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className='flex w-full flex-col gap-12'>
            <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className='flex w-full flex-col gap-12'>
            <Button
              className='h-fit w-full rounded-xl py-10 font-normal'
              loading={isLoginLoading}
              size='xl'
              type='submit'
            >
              로그인
            </Button>
            <div className='flex w-full items-center text-gray-300'>
              <div className='h-1 flex-1 bg-gray-300' />
              <p className='text-md px-12'>or</p>
              <div className='h-1 flex-1 bg-gray-300' />
            </div>
            <Button
              className='h-fit w-full rounded-xl py-10 font-normal'
              loading={isLoginLoading}
              size='xl'
              variant='outline'
            >
              <KaKaoIcon className='size-18' />
              카카오 로그인
            </Button>
          </div>
        </form>

        <div className='flex items-center gap-12 text-lg text-gray-500'>
          <p>회원이 아니신가요?</p>
          <Link to='/signup'>
            <Button className='m-0 h-fit w-fit p-0 text-lg font-normal underline' variant='none'>
              회원가입하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

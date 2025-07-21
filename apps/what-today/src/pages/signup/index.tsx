import { Button, ImageLogo, KaKaoIcon, TextLogo, useToast } from '@what-today/design-system';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axiosInstance from '@/apis/axiosInstance';
import EmailInput from '@/components/signup/EmailInput';
import NicknameInput from '@/components/signup/NicknameInput';
import PasswordConfirmInput from '@/components/signup/PasswordConfirmInput';
import PasswordInput from '@/components/signup/PasswordInput';

export default function SignupPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  /** handleSignup
   * @description 회원가입 요청을 보내고, 성공시 로그인 페이지로 리다이렉트합니다.
   * @throws 에러 발생 시 메시지를 토스트 메시지로 출력합니다.
   */
  const handleSignup = async () => {
    try {
      setIsSignupLoading(true);
      await axiosInstance.post('users', {
        email,
        nickname,
        password,
      });
      toast({
        title: '회원가입 성공',
        description: '환영합니다! 로그인하고 다양한 체험에 참여해보세요! 🎉',
        type: 'success',
      });
      navigate('/login');
    } catch (error) {
      const message = error instanceof Error ? error.message : '회원가입에 실패했습니다.';
      toast({
        title: '회원가입 오류',
        description: message,
        type: 'error',
      });
    } finally {
      setIsSignupLoading(false);
    }
  };

  const handleKakaoSignup = () => {
    const redirectUrl = import.meta.env.VITE_KAKAO_REDIRECT_URL ?? '';
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUrl)}/signup&response_type=code`;
    window.location.href = kakaoAuthUrl;
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
            handleSignup();
          }}
        >
          <div className='flex w-full flex-col gap-12'>
            <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
            <NicknameInput value={nickname} onChange={(e) => setNickname(e.target.value)} />
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
            <PasswordConfirmInput value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
          </div>

          <div className='flex w-full flex-col gap-12'>
            <Button
              className='h-fit w-full rounded-xl py-10 font-normal'
              loading={isSignupLoading}
              size='xl'
              type='submit'
            >
              회원가입
            </Button>
            <div className='flex w-full items-center text-gray-300'>
              <div className='h-1 flex-1 bg-gray-300' />
              <p className='text-md px-12'>SNS 계정으로 회원가입하기</p>
              <div className='h-1 flex-1 bg-gray-300' />
            </div>
            <Button
              className='h-fit w-full rounded-xl py-10 font-normal'
              loading={isSignupLoading}
              size='xl'
              variant='outline'
              onClick={handleKakaoSignup}
            >
              <KaKaoIcon className='size-18' />
              카카오 회원가입
            </Button>
          </div>
        </form>

        <div className='flex items-center gap-12 text-lg text-gray-500'>
          <p>회원이신가요?</p>
          <Link to='/login'>
            <Button className='m-0 h-fit w-fit p-0 text-lg font-normal underline' variant='none'>
              로그인하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

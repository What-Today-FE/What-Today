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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  const signup = async () => {
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

  return (
    <div className='flex min-h-screen w-screen min-w-300 flex-col items-center justify-center px-30 py-50 md:py-80'>
      <div className='flex h-fit w-full flex-col items-center justify-center gap-32 md:w-500'>
        <div className='flex flex-col items-center gap-12'>
          <ImageLogo className='size-100 md:size-140' />
          <TextLogo className='h-fit w-130 md:w-180' />
        </div>

        <div className='flex w-full flex-col gap-12'>
          <EmailInput value={email} onChange={handleEmailChange} />
          <NicknameInput value={nickname} onChange={handleNicknameChange} />
          <PasswordInput value={password} onChange={handlePasswordChange} />
          <PasswordConfirmInput value={passwordConfirm} onChange={handlePasswordConfirmChange} />
        </div>

        <div className='flex w-full flex-col gap-12'>
          <Button
            className='h-fit w-full rounded-xl py-10 font-normal'
            loading={isSignupLoading}
            size='xl'
            onClick={signup}
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
            onClick={signup}
          >
            <KaKaoIcon className='size-18' />
            카카오 회원가입
          </Button>
        </div>

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

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, ImageLogo, KaKaoIcon, TextLogo, useToast } from '@what-today/design-system';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import axiosInstance from '@/apis/axiosInstance';
import EmailInput from '@/components/auth/EmailInput';
import NicknameInput from '@/components/auth/NicknameInput';
import PasswordConfirmInput from '@/components/auth/PasswordConfirmInput';
import PasswordInput from '@/components/auth/PasswordInput';
import { type SignUpFormValues, signUpSchema } from '@/schemas/auth';

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSignupLoading, setIsSignupLoading] = useState(false);

  /** handleSignup
   * @description 회원가입 요청을 보내고, 성공시 로그인 페이지로 리다이렉트합니다.
   * @throws 에러 발생 시 메시지를 토스트 메시지로 출력합니다.
   */
  const onSubmit = async (data: SignUpFormValues) => {
    try {
      setIsSignupLoading(true);
      await axiosInstance.post('users', {
        email: data.email,
        nickname: data.nickname,
        password: data.password,
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
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirectUrl = import.meta.env.VITE_KAKAO_REDIRECT_URL ?? '';
    const signupRedirectUrl = `${redirectUrl}/signup`;

    if (!clientId || !redirectUrl) {
      toast({
        title: '설정 오류',
        description: '카카오 회원가입 설정이 올바르지 않습니다.',
        type: 'error',
      });
      return;
    }

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: signupRedirectUrl,
      response_type: 'code',
    });

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className='flex min-h-screen w-screen min-w-300 flex-col items-center justify-center px-[5vw] py-50 md:py-80'>
      <div className='flex h-fit w-full flex-col items-center justify-center gap-32 md:w-500'>
        <Link className='flex flex-col items-center gap-12' to='/'>
          <ImageLogo className='size-100 md:size-140' />
          <TextLogo className='h-fit w-130 md:w-180' />
        </Link>

        <form className='flex w-full flex-col items-center justify-center gap-32' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex w-full flex-col gap-12'>
            <EmailInput {...register('email')} error={errors.email?.message} />
            <NicknameInput {...register('nickname')} error={errors.nickname?.message} />
            <PasswordInput {...register('password')} error={errors.password?.message} />
            <PasswordConfirmInput {...register('passwordConfirm')} error={errors.passwordConfirm?.message} />
          </div>

          <div className='flex w-full flex-col gap-12'>
            <Button
              className='h-fit w-full rounded-xl py-10 font-normal'
              disabled={isSubmitting || !isValid}
              loading={isSignupLoading}
              size='xl'
              type='submit'
            >
              회원가입
            </Button>
            <div className='flex w-full items-center text-gray-400'>
              <div className='h-1 flex-1 bg-gray-100' />
              <p className='text-md px-12'>SNS 계정으로 회원가입하기</p>
              <div className='h-1 flex-1 bg-gray-100' />
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
            <Button
              className='text-primary-500 m-0 h-fit w-fit p-0 text-lg font-normal underline underline-offset-3'
              variant='none'
            >
              로그인하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

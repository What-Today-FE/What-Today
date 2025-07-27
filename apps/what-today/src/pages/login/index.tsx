import { zodResolver } from '@hookform/resolvers/zod';
import useAuth from '@hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { Button, ImageLogo, KaKaoIcon, TextLogo, useToast } from '@what-today/design-system';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { login } from '@/apis/auth';
import EmailInput from '@/components/auth/EmailInput';
import PasswordInput from '@/components/auth/PasswordInput';
import { type SignInFormValues, signInSchema } from '@/schemas/auth';
import { useWhatTodayStore } from '@/stores';

export default function LoginPage() {
  const navigate = useNavigate();
  const { fetchMyProfile } = useAuth();
  const { toast } = useToast();
  const { setAccessToken, setRefreshToken } = useWhatTodayStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  /** handleLogin
   * @description 로그인 요청을 보내고, 성공 시 토큰과 사용자 정보를 전역 상태로 저장합니다.
   * @throws 에러 발생 시 메시지를 토스트 메시지로 출력합니다.
   */
  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: async (response) => {
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      await fetchMyProfile();
      navigate('/');
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : '로그인에 실패했습니다.';
      toast({
        title: '로그인 오류',
        description: message,
        type: 'error',
      });
    },
  });

  const onSubmit = (data: SignInFormValues) => {
    loginMutate(data);
  };

  /** handleKakaoLogin
   * @description 카카오 로그인 리다이렉트를 합니다.
   */
  const handleKakaoLogin = () => {
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirectUrl = import.meta.env.VITE_KAKAO_REDIRECT_URL ?? '';

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
      redirect_uri: redirectUrl,
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
            <PasswordInput {...register('password')} error={errors.password?.message} />
          </div>

          <div className='flex w-full flex-col gap-12'>
            <Button
              className='h-fit w-full rounded-xl py-10 font-normal'
              disabled={isSubmitting || !isValid}
              loading={isPending}
              size='xl'
              type='submit'
            >
              로그인
            </Button>
            <div className='flex w-full items-center text-gray-400'>
              <div className='h-1 flex-1 bg-gray-100' />
              <p className='text-md px-12'>or</p>
              <div className='h-1 flex-1 bg-gray-100' />
            </div>
            <Button
              className='h-fit w-full rounded-xl py-10 font-normal'
              loading={isPending}
              size='xl'
              variant='outline'
              onClick={handleKakaoLogin}
            >
              <KaKaoIcon className='size-18' />
              카카오 로그인
            </Button>
          </div>
        </form>

        <div className='flex items-center gap-12 text-lg text-gray-500'>
          <p>회원이 아니신가요?</p>
          <Link to='/signup'>
            <Button
              className='text-primary-500 m-0 h-fit w-fit p-0 text-lg font-normal underline underline-offset-3'
              variant='none'
            >
              회원가입하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

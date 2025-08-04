import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button, ImageLogo, KaKaoIcon, TextLogo, useToast } from '@what-today/design-system';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { signup } from '@/apis/auth';
import AgreeCheckbox from '@/components/auth/AgreeCheckbox';
import EmailInput from '@/components/auth/EmailInput';
import NicknameInput from '@/components/auth/NicknameInput';
import PasswordConfirmInput from '@/components/auth/PasswordConfirmInput';
import PasswordInput from '@/components/auth/PasswordInput';
import { signUpFormSchema, type SignUpFormValues } from '@/schemas/auth';

import { locationTermsContent, privacyPolicyContent, termsOfServiceContent } from '../../components/auth/AgreeContent';

export default function SignupPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    setValue,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
    },
  });

  /** handleSignup
   * @description 회원가입 요청을 보내고, 성공시 로그인 페이지로 리다이렉트합니다.
   * @throws 에러 발생 시 메시지를 토스트 메시지로 출력합니다.
   */
  const { mutate: signupMutate, isPending } = useMutation({
    mutationFn: ({ email, nickname, password }: SignUpFormValues) => signup(email, nickname, password),
    onSuccess: () => {
      toast({
        title: '회원가입 성공',
        description: '환영합니다! 로그인하고 다양한 체험에 참여해보세요! 🎉',
        type: 'success',
      });
      navigate('/login');
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : '회원가입에 실패했습니다.';
      toast({
        title: '회원가입 오류',
        description: message,
        type: 'error',
      });
    },
  });

  const onSubmit = (data: SignUpFormValues) => {
    signupMutate(data);
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

  useEffect(() => {
    const allChecked = watch('agreeToTerms') && watch('agreeToPrivacy') && watch('agreeToLocation');

    setValue('agreeToAll', allChecked);
  }, [setValue, watch]);

  return (
    <div className='flex min-h-screen w-screen min-w-300 flex-col items-center justify-center px-[5vw] py-50 md:py-80'>
      <div className='flex h-fit w-full flex-col items-center justify-center gap-32 md:w-500'>
        <Link className='flex flex-col items-center gap-12' to='/'>
          <ImageLogo className='size-100 md:size-140' />
          <TextLogo className='h-fit w-130 md:w-180' />
        </Link>

        <form className='flex w-full flex-col items-center justify-center gap-32' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex w-full flex-col gap-24'>
            <EmailInput {...register('email')} error={errors.email?.message} />
            <NicknameInput {...register('nickname')} error={errors.nickname?.message} />
            <PasswordInput {...register('password')} error={errors.password?.message} />
            {watch('password') && !errors.password && (
              <PasswordConfirmInput {...register('passwordConfirm')} error={errors.passwordConfirm?.message} />
            )}

            <div className='flex w-full flex-col items-start justify-center gap-2'>
              <label className='mb-4 flex cursor-pointer items-center gap-8' htmlFor='all-agree'>
                <input
                  checked={
                    (watch('agreeToTerms') ?? false) &&
                    (watch('agreeToPrivacy') ?? false) &&
                    (watch('agreeToLocation') ?? false)
                  }
                  className='cursor-pointer accent-black focus:ring-black/30 focus:outline-none'
                  id='all-agree'
                  type='checkbox'
                  onChange={(e) => {
                    const checked = e.target.checked;

                    setValue('agreeToTerms', checked as true, { shouldValidate: true });
                    setValue('agreeToPrivacy', checked as true, { shouldValidate: true });
                    setValue('agreeToLocation', checked as true, { shouldValidate: true });
                    setValue('agreeToAll', checked, { shouldValidate: true });
                  }}
                />
                <p className='caption-text'>전체 동의</p>
              </label>
              <AgreeCheckbox
                {...register('agreeToTerms')}
                required
                content={termsOfServiceContent}
                error={errors.agreeToTerms?.message}
                label='이용약관에 동의합니다'
              />
              <AgreeCheckbox
                {...register('agreeToPrivacy')}
                required
                content={privacyPolicyContent}
                error={errors.agreeToPrivacy?.message}
                label='개인정보 수집 및 이용에 동의합니다'
              />
              <AgreeCheckbox
                {...register('agreeToLocation')}
                required
                content={locationTermsContent}
                error={errors.agreeToLocation?.message}
                label='위치정보 서비스 이용약관에 동의합니다'
              />
            </div>
          </div>

          <div className='flex w-full flex-col gap-12'>
            <Button
              className='h-fit w-full rounded-xl py-10'
              disabled={isSubmitting || !isValid}
              loading={isPending}
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
              className='h-fit w-full rounded-xl py-10'
              loading={isPending}
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

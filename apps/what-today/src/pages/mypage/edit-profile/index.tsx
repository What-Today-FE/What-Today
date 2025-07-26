import { zodResolver } from '@hookform/resolvers/zod';
import { Button, ChevronIcon, ProfileImageInput, useToast } from '@what-today/design-system';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import z from 'zod';

import { patchMyProfile, postProfileImageUrl } from '@/apis/auth';
import NicknameInput from '@/components/auth/NicknameInput';
import PasswordConfirmInput from '@/components/auth/PasswordConfirmInput';
import PasswordInput from '@/components/auth/PasswordInput';
import useAuth from '@/hooks/useAuth';
import { type UpdateMyProfileFormValues, updateMyProfileSchema } from '@/schemas/auth';
import { useWhatTodayStore } from '@/stores';

/**
 * @description 주어진 이미지 URL을 fetch하여 Blob으로 변환한 뒤 File 객체로 반환합니다.
 *
 * @param {string} url - 변환할 이미지의 URL
 * @param {string} [filename='image.jpg'] - 생성될 File 객체의 파일명 (기본값: 'image.jpg')
 * @returns {Promise<File>} - Blob을 감싼 File 객체
 */
const stringToFile = async (url: string, filename = 'image.jpg'): Promise<File> => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`이미지 다운로드 실패: ${res.status} ${res.statusText}`);
    }
    const blob = await res.blob();
    if (blob.size === 0) {
      throw new Error('빈 이미지 파일입니다.');
    }
    const contentType = blob.type || 'image/jpeg';
    return new File([blob], filename, { type: contentType });
  } catch (error) {
    throw new Error('이미지 변환 중 오류가 발생했습니다.');
  }
};

export default function EditProfilePage() {
  const { user, setUser } = useWhatTodayStore();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    reset,
  } = useForm<UpdateMyProfileFormValues>({
    resolver: zodResolver(updateMyProfileSchema),
    mode: 'onChange',
    defaultValues: {
      nickname: user?.nickname ?? '',
      profileImageUrl: user?.profileImageUrl ?? '',
      password: '',
      passwordConfirm: '',
    },
  });

  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const { toast } = useToast();
  const [isEditProfileLoading] = useState(false);
  const watchedPassword = watch('password');

  /**
   * @description 뒤로가기 버튼으로 리다이렉트할 페이지입니다.
   */
  const handleNavigateToMypage = () => {
    navigate('/mypage');
  };

  /**
   * @description 비밀번호가 수정된 경우에만 로그아웃 후 재로그인을 유도합니다.
   */
  const handleLogout = () => {
    logoutUser();
    navigate('/login');
    toast({
      title: '내 정보 변경 성공',
      description: '비밀번호가 변경되었습니다. 다시 로그인해 주세요.',
      type: 'success',
    });
  };

  /**
   * @description 취소 버튼을 눌렀을 때 입력된 폼을 초기화 합니다.
   */
  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    reset();
  };

  /**
   * @description 프로필 사진 or 닉네임 or 비밀번호를 수정하는 API를 요청합니다. 실패시 에러 토스트 메시지를 보여줍니다.
   */
  const onSubmit = async (data: UpdateMyProfileFormValues) => {
    try {
      const profileImageUrl = data.profileImageUrl ?? '';
      let uploadedImageUrl: string | null | undefined = undefined;
      const isBlobUrl = profileImageUrl.startsWith('blob:');
      const isReset = profileImageUrl === '';
      const isOriginalImage = profileImageUrl === user?.profileImageUrl;

      if (isBlobUrl) {
        const file = await stringToFile(profileImageUrl, 'profile.jpg');
        const imageUploadRes = await postProfileImageUrl(file);
        uploadedImageUrl = imageUploadRes.profileImageUrl;
      } else if (isReset) {
        uploadedImageUrl = null;
      } else if (!isOriginalImage) {
        uploadedImageUrl = profileImageUrl;
      }

      const response = await patchMyProfile(data.nickname, uploadedImageUrl, data.password);

      toast({
        title: '내 정보 변경 성공',
        description: '프로필이 성공적으로 업데이트되었습니다.',
        type: 'success',
      });
      setUser(response);
      reset({
        nickname: response.nickname,
        profileImageUrl: response.profileImageUrl ?? '',
        password: '',
        passwordConfirm: '',
      });

      // 비밀번호가 수정되었다면 로그아웃 후 로그인 페이지로 이동 (재로그인 유도)
      if (data.password) {
        handleLogout();
      }
    } catch (error) {
      let message = '프로필 수정에 실패했습니다.';

      if (error instanceof z.ZodError) {
        message = error.errors[0]?.message ?? message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast({
        title: '프로필 수정 실패',
        description: message,
        type: 'error',
      });
    }
  };

  return (
    <div className='flex flex-col gap-12 text-gray-900'>
      <div className='flex items-center gap-4'>
        <Button className='h-fit w-fit' variant='none' onClick={handleNavigateToMypage}>
          <ChevronIcon color='var(--color-gray-300)' direction='left' />
        </Button>
        <h1 className='text-xl font-bold'>내 정보</h1>
      </div>
      <form
        className='flex w-full flex-col items-center justify-center gap-32'
        onReset={handleReset}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex w-full flex-col gap-12'>
          <Controller
            control={control}
            name='profileImageUrl'
            render={({ field }) => (
              <ProfileImageInput
                initial={user?.profileImageUrl ?? ''}
                src={field.value ?? ''}
                onChange={(val) => field.onChange(val)}
              />
            )}
          />
          <NicknameInput {...register('nickname')} error={errors.nickname?.message} />
          <PasswordInput {...register('password')} error={errors.password?.message} />
          {watchedPassword && (
            <PasswordConfirmInput {...register('passwordConfirm')} error={errors.passwordConfirm?.message} />
          )}
        </div>

        <div className='flex w-full max-w-640 justify-center gap-12'>
          <Button
            className='h-fit w-auto rounded-xl py-10 font-normal'
            loading={isEditProfileLoading}
            size='xl'
            type='reset'
            variant='outline'
          >
            취소
          </Button>
          <Button
            className='h-fit w-auto rounded-xl py-10 font-normal'
            disabled={isSubmitting || !isValid}
            loading={isEditProfileLoading}
            size='xl'
            type='submit'
          >
            저장
          </Button>
        </div>
      </form>
    </div>
  );
}

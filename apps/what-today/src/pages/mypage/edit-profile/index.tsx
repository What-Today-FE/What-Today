import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button, ChevronIcon, ProfileImageInput, useToast } from '@what-today/design-system';
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

/** resolveProfileImageUrl
 * @description 폼에서 넘어온 profileImageUrl을 기반으로 서버에 보낼 최종 이미지 URL을 반환
 * @returns 업로드된 URL 문자열 | null (초기화) | undefined (변경 없음)
 */
async function resolveProfileImageUrl({
  profileImageUrl,
  originalImageUrl,
}: {
  profileImageUrl: string;
  originalImageUrl?: string | null;
}): Promise<string | null | undefined> {
  if (profileImageUrl.startsWith('blob:')) {
    const file = await stringToFile(profileImageUrl, 'profile.jpg');
    const { profileImageUrl: uploadedUrl } = await postProfileImageUrl(file);
    return uploadedUrl;
  }

  if (profileImageUrl === '') {
    return null; // 이미지 초기화
  }

  if (profileImageUrl !== originalImageUrl) {
    return profileImageUrl; // 새로운 이미지 URL
  }

  return undefined; // 변경 없음
}

export default function EditProfilePage() {
  const { user, setUser } = useWhatTodayStore();
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const { toast } = useToast();
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
  const watchedPassword = watch('password');

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
  const { mutate: updateProfileMutate, isPending } = useMutation({
    mutationFn: async (data: UpdateMyProfileFormValues) => {
      const uploadedImageUrl = await resolveProfileImageUrl({
        profileImageUrl: data.profileImageUrl ?? '',
        originalImageUrl: user?.profileImageUrl,
      });

      const updatedUser = await patchMyProfile(data.nickname, uploadedImageUrl, data.password);

      return {
        updatedUser,
        passwordChanged: Boolean(data.password),
      };
    },
    onSuccess: ({ updatedUser, passwordChanged }) => {
      toast({
        title: '내 정보 변경 성공',
        description: '프로필이 성공적으로 업데이트되었습니다.',
        type: 'success',
      });
      setUser(updatedUser);
      reset({
        nickname: updatedUser.nickname,
        profileImageUrl: updatedUser.profileImageUrl ?? '',
        password: '',
        passwordConfirm: '',
      });

      if (passwordChanged) {
        handleLogout();
      }
    },
    onError: (error) => {
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
    },
  });

  const onSubmit = (data: UpdateMyProfileFormValues) => {
    updateProfileMutate(data);
  };

  return (
    <div className='flex flex-col gap-12 text-gray-950'>
      <header className='mb-16 flex flex-col gap-12'>
        <div className='flex items-center gap-4 border-b border-b-gray-50 pb-8 md:pb-12'>
          <Button className='w-30 p-0' size='sm' variant='none' onClick={() => navigate('/mypage')}>
            <ChevronIcon color='var(--color-gray-300)' direction='left' />
          </Button>
          <h1 className='subtitle-text'>내 정보</h1>
        </div>
        <p className='body-text text-gray-400 md:pt-10'>닉네임과 비밀번호를 수정하실 수 있습니다.</p>
      </header>
      <form
        className='flex w-full flex-col items-center justify-center gap-32 pt-20'
        onReset={handleReset}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='body-text flex w-full flex-col gap-24'>
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
          <Button loading={isPending} size='sm' type='reset' variant='outline'>
            취소
          </Button>
          <Button disabled={isSubmitting || !isValid} loading={isPending} size='sm' type='submit'>
            저장
          </Button>
        </div>
      </form>
    </div>
  );
}

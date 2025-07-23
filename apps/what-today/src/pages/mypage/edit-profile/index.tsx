import { Button, ChevronIcon, ProfileImageInput, useToast } from '@what-today/design-system';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { patchMyProfile, postProfileImageUrl } from '@/apis/auth';
import NicknameInput from '@/components/auth/NicknameInput';
import PasswordConfirmInput from '@/components/auth/PasswordConfirmInput';
import PasswordInput from '@/components/auth/PasswordInput';
import { useWhatTodayStore } from '@/stores';

const stringToFile = async (url: string, filename = 'image.jpg'): Promise<File> => {
  const res = await fetch(url);
  const blob = await res.blob();
  const contentType = blob.type || 'image/jpeg';
  return new File([blob], filename, { type: contentType });
};

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { user, setUser } = useWhatTodayStore();
  const { toast } = useToast();
  const [isEditProfileLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(user?.profileImageUrl ?? '');
  const [nickname, setNickname] = useState(user?.nickname ?? '');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleNavigateToMypage = () => {
    navigate('/mypage');
  };

  const resetForm = (userData = user) => {
    setNickname(userData?.nickname ?? '');
    setPassword('');
    setPasswordConfirm('');
    setProfileImage(userData?.profileImageUrl ?? '');
  };

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let uploadedImageUrl: string | null | undefined = undefined;
      const isBlobUrl = profileImage.startsWith('blob:');
      const isReset = profileImage === '';
      const isOriginalImage = profileImage === user?.profileImageUrl;

      if (isBlobUrl) {
        const file = await stringToFile(profileImage, 'profile.jpg');
        const imageUploadRes = await postProfileImageUrl(file);
        uploadedImageUrl = imageUploadRes.data.profileImageUrl;
      } else if (isReset) {
        uploadedImageUrl = null;
      } else if (!isOriginalImage) {
        uploadedImageUrl = profileImage;
      }

      const response = await patchMyProfile(nickname, uploadedImageUrl, password);
      setUser(response.data);
      resetForm(response.data);
    } catch (error) {
      const message = error instanceof Error ? error.message : '프로필 수정에 실패했습니다.';
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
        onSubmit={handleSubmit}
      >
        <div className='flex w-full flex-col gap-12'>
          <ProfileImageInput
            initial={user?.profileImageUrl ?? ''}
            src={profileImage}
            onChange={(value) => setProfileImage(value)}
          />
          <NicknameInput value={nickname} onChange={(e) => setNickname(e.target.value)} />
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
          {password.length > 0 && (
            <PasswordConfirmInput value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
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

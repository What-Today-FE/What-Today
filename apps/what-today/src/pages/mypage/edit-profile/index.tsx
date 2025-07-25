import { Button, ChevronIcon, ProfileImageInput, useToast } from '@what-today/design-system';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { patchMyProfile, postProfileImageUrl } from '@/apis/auth';
import NicknameInput from '@/components/auth/NicknameInput';
import PasswordConfirmInput from '@/components/auth/PasswordConfirmInput';
import PasswordInput from '@/components/auth/PasswordInput';
import useAuth from '@/hooks/useAuth';
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
  const navigate = useNavigate();
  const { user, setUser } = useWhatTodayStore();
  const { logoutUser } = useAuth();

  const { toast } = useToast();
  const [isEditProfileLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(user?.profileImageUrl ?? '');
  const [nickname, setNickname] = useState(user?.nickname ?? '');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  /**
   * @description 뒤로가기 버튼으로 리다이렉트할 페이지입니다.
   */
  const handleNavigateToMypage = () => {
    navigate('/mypage');
  };

  /**
   * @description 취소 버튼을 누르거나, 내 정보 수정에 성공할 때 사용할 폼 초기화 함수입니다.
   */
  const resetForm = (userData = user) => {
    setNickname(userData?.nickname ?? '');
    setPassword('');
    setPasswordConfirm('');
    setProfileImage(userData?.profileImageUrl ?? '');
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
    resetForm();
  };

  /**
   * @description 프로필 사진 or 닉네임 or 비밀번호를 수정하는 API를 요청합니다. 실패시 에러 토스트 메시지를 보여줍니다.
   */
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

      toast({
        title: '내 정보 변경 성공',
        description: '프로필이 성공적으로 업데이트되었습니다.',
        type: 'success',
      });
      setUser(response.data);
      resetForm(response.data);

      // 비밀번호가 수정되었다면 로그아웃 후 로그인 페이지로 이동 (재로그인 유도)
      if (password.length > 0) {
        handleLogout();
      }
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
      <div className='flex items-center gap-4 border-b border-b-gray-50 pb-20'>
        <Button className='h-fit w-fit' variant='none' onClick={handleNavigateToMypage}>
          <ChevronIcon color='var(--color-gray-300)' direction='left' />
        </Button>
        <h1 className='text-xl font-bold'>내 정보</h1>
      </div>
      <form
        className='flex w-full flex-col items-center justify-center gap-32 pt-20'
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

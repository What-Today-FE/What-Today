import { Button, ChevronIcon, ProfileImageInput } from '@what-today/design-system';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NicknameInput from '@/components/signup/NicknameInput';
import PasswordConfirmInput from '@/components/signup/PasswordConfirmInput';
import PasswordInput from '@/components/signup/PasswordInput';
import { useWhatTodayStore } from '@/stores';

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { user } = useWhatTodayStore();
  const [isEditProfileLoading, setIsEditProfileLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(user?.profileImageUrl ?? '');
  const [nickname, setNickname] = useState(user?.nickname ?? '');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleBackBtnClick = () => {
    navigate(-1);
  };

  return (
    <div className='flex flex-col gap-12 text-gray-900'>
      <div className='flex items-center gap-4'>
        <Button className='h-fit w-fit' variant='none' onClick={handleBackBtnClick}>
          <ChevronIcon color='var(--color-gray-300)' direction='left' />
        </Button>
        <h1 className='text-xl font-bold'>내 정보</h1>
      </div>
      <form
        className='flex w-full flex-col items-center justify-center gap-32'
        onReset={() => {
          setNickname(user?.nickname ?? '');
          setPassword('');
          setPasswordConfirm('');
          setProfileImage(user?.profileImageUrl ?? '');
        }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className='flex w-full flex-col gap-12'>
          <ProfileImageInput src={profileImage} onChange={(value) => setProfileImage(value)} />
          <NicknameInput value={nickname} onChange={(e) => setNickname(e.target.value)} />
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
          {password.length > 0 && (
            <PasswordConfirmInput value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
          )}
        </div>

        <div className='flex w-full max-w-640 gap-12'>
          <Button
            className='h-fit flex-1 rounded-xl py-10 font-normal'
            loading={isEditProfileLoading}
            size='xl'
            type='reset'
            variant='outline'
          >
            취소
          </Button>
          <Button
            className='h-fit flex-2 rounded-xl py-10 font-normal'
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

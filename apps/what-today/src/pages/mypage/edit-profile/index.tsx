import { Button, ProfileImageInput } from '@what-today/design-system';
import { useState } from 'react';

import EmailInput from '@/components/signup/EmailInput';
import NicknameInput from '@/components/signup/NicknameInput';
import PasswordConfirmInput from '@/components/signup/PasswordConfirmInput';
import PasswordInput from '@/components/signup/PasswordInput';
import { useWhatTodayStore } from '@/stores';

export default function EditProfilePage() {
  const { user } = useWhatTodayStore();
  const [isEditProfileLoading, setIsEditProfileLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(user?.profileImageUrl ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [nickname, setNickname] = useState(user?.nickname ?? '');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  return (
    <div className='flex flex-col gap-12 text-gray-900'>
      <h1 className='text-xl font-bold'>내 정보</h1>
      <form
        className='flex w-full flex-col items-center justify-center gap-32'
        onReset={() => {
          setEmail(user?.email ?? '');
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
          <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
          <NicknameInput value={nickname} onChange={(e) => setNickname(e.target.value)} />
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
          <PasswordConfirmInput value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
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

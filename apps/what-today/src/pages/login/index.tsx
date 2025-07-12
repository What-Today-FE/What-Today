import { useState } from 'react';

import axiosInstance from '@/apis/axiosInstance';

interface Profile {
  id: number;
  nickname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  profileImageUrl: string | null;
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLogin, setIsLogin] = useState<boolean>(() => {
    return !!localStorage.getItem('accessToken');
  });
  const [myProfile, setMyProfile] = useState<Profile | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    try {
      const response = await axiosInstance.post('auth/login', {
        email,
        password,
      });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      setEmail('');
      setPassword('');
      setIsLogin(true);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        alert(error.message);
      } else {
        console.error(error);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLogin(false);
    setMyProfile(null);
  };

  const getMyProfile = async () => {
    try {
      const response = await axiosInstance.get('users/me');
      setMyProfile(response.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  const getActivities = async () => {
    try {
      const response = await axiosInstance.get('activities', { params: { method: 'offset' } });
      console.log(response.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className='m-24 flex w-500 flex-col gap-16'>
      <h1>여기는 로그인 페이지 입니다</h1>

      <div>
        {isLogin ? (
          <p className='text-green-500'>로그인에 성공했습니다.</p>
        ) : (
          <p className='text-gray-300'>로그인이 필요합니다.</p>
        )}
        {myProfile && (
          <p>
            👤 닉네임: <strong>{myProfile.nickname}</strong> / ID: <strong>{myProfile.id}</strong>
          </p>
        )}
      </div>

      <input
        className='rounded-md border'
        placeholder='아이디'
        type='text'
        value={email}
        onChange={handleEmailChange}
      />
      <input
        className='rounded-md border'
        placeholder='비밀번호'
        type='password'
        value={password}
        onChange={handlePasswordChange}
      />
      <button className='bg-primary-500 cursor-pointer rounded-md px-10 py-5 text-white' onClick={login}>
        로그인
      </button>
      <button className='cursor-pointer rounded-md bg-red-400 px-10 py-5 text-white' onClick={logout}>
        로그아웃
      </button>
      <button className='bg-primary-100 text-primary-500 cursor-pointer rounded-md px-10 py-5' onClick={getMyProfile}>
        내 정보 가져오기
      </button>
      <button className='cursor-pointer rounded-md bg-purple-200 px-10 py-5 text-purple-500' onClick={getActivities}>
        체험 리스트 목록 가져오기
      </button>
    </div>
  );
}

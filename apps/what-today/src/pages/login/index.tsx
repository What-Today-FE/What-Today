import useAuth from '@hooks/useAuth';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import axiosInstance from '@/apis/axiosInstance';
import { useWhatTodayStore } from '@/stores';

export default function LoginPage() {
  const { user, isLoggedIn, setUser } = useWhatTodayStore();
  const { loginUser, logoutUser, fetchMyProfile } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  /** handleLogin
   * @description 로그인 요청을 보내고, 성공 시 토큰과 사용자 정보를 전역 상태로 저장합니다.
   * @throws 에러 발생 시 메시지를 alert로 출력합니다.
   */
  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      await fetchMyProfile();
      setEmail('');
      setPassword('');
    } catch (error) {
      alert(error instanceof Error ? error.message : '로그인에 실패했습니다.');
    }
  };

  // * 로그인이 필요한 api 요청 테스트용 (삭제 예정)
  const testProtectedApiCall = async () => {
    try {
      const response = await axiosInstance.get('users/me');
      setUser(response.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  // * 로그인이 필요없는 api 요청 테스트용 (삭제 예정)
  const testPublicApiCall = async () => {
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
        {isLoggedIn ? (
          <p className='text-green-500'>로그인에 성공했습니다.</p>
        ) : (
          <p className='text-gray-300'>로그인이 필요합니다.</p>
        )}
        {user && (
          <p>
            👤 닉네임: <strong>{user.nickname}</strong> / ID: <strong>{user.id}</strong>
          </p>
        )}
      </div>

      <input
        className='rounded-md border'
        placeholder='이메일'
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

      <button className='bg-primary-500 cursor-pointer rounded-md px-10 py-5 text-white' onClick={handleLogin}>
        로그인
      </button>
      <button className='cursor-pointer rounded-md bg-red-400 px-10 py-5 text-white' onClick={logoutUser}>
        로그아웃
      </button>

      <button
        className='bg-primary-100 text-primary-500 cursor-pointer rounded-md px-10 py-5'
        onClick={testProtectedApiCall}
      >
        내 정보 가져오기 - 로그인이 필요한 api 요청 테스트
      </button>
      <button
        className='cursor-pointer rounded-md bg-purple-200 px-10 py-5 text-purple-500'
        onClick={testPublicApiCall}
      >
        체험 리스트 목록 가져오기 - 로그인이 필요없는 api 요청 테스트
      </button>

      <Link to='/signup'>
        <button className='text-primary-500 cursor-pointer rounded-md px-10 py-5 hover:underline'>
          회원가입 페이지로 이동
        </button>
      </Link>
      <Link to='/mypage'>
        <button className='text-primary-500 cursor-pointer rounded-md px-10 py-5 hover:underline'>
          마이 페이지로 이동 - 로그인이 이후 접근 가능
        </button>
      </Link>
    </div>
  );
}

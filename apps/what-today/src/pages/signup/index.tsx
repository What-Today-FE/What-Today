import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axiosInstance from '@/apis/axiosInstance';

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const signup = async () => {
    try {
      await axiosInstance.post('users', {
        email,
        nickname,
        password,
      });
      alert('🎉 회원가입에 성공했습니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        alert(error.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className='m-24 flex w-500 flex-col gap-16'>
      <h1>여기는 회원가입 페이지 입니다</h1>
      <p>유효성 검사를 제외하고 기능만 구현하였습니다. (비밀번호 확인도 제외)</p>
      <input
        className='rounded-md border'
        placeholder='아이디'
        type='text'
        value={email}
        onChange={handleEmailChange}
      />
      <input
        className='rounded-md border'
        placeholder='닉네임'
        type='text'
        value={nickname}
        onChange={handleNicknameChange}
      />
      <input
        className='rounded-md border'
        placeholder='비밀번호'
        type='password'
        value={password}
        onChange={handlePasswordChange}
      />
      <button className='bg-primary-500 cursor-pointer rounded-md px-10 py-5 text-white' onClick={signup}>
        회원가입
      </button>
      <Link to='/login'>
        <button className='text-primary-500 cursor-pointer rounded-md px-10 py-5'>로그인 페이지로 이동</button>
      </Link>
    </div>
  );
}

import { redirect } from 'react-router-dom';

export const authGuardLoader = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    alert('🔐 로그인이 필요합니다.');
    throw redirect('/login');
  }

  return null;
};

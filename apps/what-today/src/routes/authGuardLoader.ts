import { redirect } from 'react-router-dom';

import { useWhatTodayStore } from '@/stores';

export const redirectIfLoggedInLoader = async () => {
  const isLoggedIn = useWhatTodayStore.getState().isLoggedIn;
  if (isLoggedIn) {
    throw redirect('/');
  }

  return null;
};

export const authGuardLoader = async () => {
  const isLoggedIn = useWhatTodayStore.getState().isLoggedIn;
  if (!isLoggedIn) {
    alert('🔐 로그인이 필요합니다.');
    throw redirect('/login');
  }

  return null;
};

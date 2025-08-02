import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import DefaultLayout from '@/layouts/DefaultLayout';
import MyPageLayout from '@/layouts/Mypage';
import ActivityDetailPage from '@/pages/activities';
import CreateExperience from '@/pages/experiences';
import KakaoCallback from '@/pages/kakao-callback';
import KakaoCallbackSignup from '@/pages/kakao-callback-signup';
import LoginPage from '@/pages/login';
import MainPage from '@/pages/main';
import EditProfilePage from '@/pages/mypage/edit-profile';
import ManageActivitiesPage from '@/pages/mypage/manage-activities';
import ReservationsListPage from '@/pages/mypage/reservations-list';
import ReservationsStatusPage from '@/pages/mypage/reservations-status';
import NotFoundPage from '@/pages/not-found-page';
import SignupPage from '@/pages/signup';

import { authGuardLoader, redirectIfLoggedInLoader } from './authGuardLoader';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        loader: redirectIfLoggedInLoader,
        children: [
          { path: 'login', element: <LoginPage /> },
          { path: 'signup', element: <SignupPage /> },
          { path: 'oauth/kakao', element: <KakaoCallback /> },
          { path: 'oauth/kakao/signup', element: <KakaoCallbackSignup /> },
        ],
      },
      {
        element: <DefaultLayout />,
        children: [
          { index: true, element: <MainPage /> },
          { path: 'activities/:id', element: <ActivityDetailPage /> },
          {
            loader: authGuardLoader,
            children: [
              { path: 'experiences/create', element: <CreateExperience /> },
              { path: 'experiences/create/:id', element: <CreateExperience /> },
            ],
          },
          {
            path: 'mypage',
            loader: authGuardLoader,
            element: <MyPageLayout />,
            children: [
              { index: true, element: <EditProfilePage /> },
              { path: 'edit-profile', element: <EditProfilePage /> },
              { path: 'reservations-list', element: <ReservationsListPage /> },
              { path: 'manage-activities', element: <ManageActivitiesPage /> },
              { path: 'reservations-status', element: <ReservationsStatusPage /> },
            ],
          },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;

import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import DefaultLayout from '@/layouts/DefaultLayout';
import MyPageLayout from '@/layouts/Mypage';
import ActivityDetailPage from '@/pages/activities';
import LoginPage from '@/pages/login';
import MainPage from '@/pages/main';
import EditProfilePage from '@/pages/mypage/edit-profile';
import ManageActivitiesPage from '@/pages/mypage/manage-activities';
import ReservationsListPage from '@/pages/mypage/reservations-list';
import ReservationsStatusPage from '@/pages/mypage/reservations-status';
import SignupPage from '@/pages/signup';

import { authGuardLoader } from './authGuardLoader';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },

      {
        element: <DefaultLayout />,
        children: [
          { index: true, element: <MainPage /> },
          { path: 'activities/:id', element: <ActivityDetailPage /> },

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
    ],
  },
]);

export default router;

import Sidebar from '@layouts/Sidebar';
import ButtonExampleDocs from '@pages/ButtonExampleDocs';
import CalendarDoc from '@pages/CalendarDoc';
import LandingPage from '@pages/LandingPage';
import { createBrowserRouter, Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate replace to='/docs' />,
  },
  {
    path: '/docs',
    element: <Sidebar />,
    children: [
      {
        path: '',
        element: <LandingPage />,
      },
      {
        path: 'button-example',
        element: <ButtonExampleDocs />,
      },
      {
        path: 'Calendar',
        element: <CalendarDoc />,
      },
    ],
  },
]);

export default router;

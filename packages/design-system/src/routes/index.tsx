import Sidebar from '@layouts/Sidebar';
import ButtonExampleDocs from '@pages/ButtonExampleDocs';
import IconDoc from '@pages/IconDoc';
import LandingPage from '@pages/LandingPage';
import LogoDoc from '@pages/LogoDoc';
import CalendarDoc from '@pages/CalendarDoc';
import LandingPage from '@pages/LandingPage';
import PaginationDoc from '@pages/PaginationDoc';
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
        path: 'Logo',
        element: <LogoDoc />,
      },
      {
        path: 'Icon',
        element: <IconDoc />,
      },
      {
        path: 'Pagination',
        element: <PaginationDoc />,
      },
      {
        path: 'Calendar',
        element: <CalendarDoc />,
      },
    ],
  },
]);

export default router;

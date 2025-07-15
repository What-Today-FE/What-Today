import ButtonExampleDocs from '@pages/ButtonExampleDocs';
import CalendarDoc from '@pages/CalendarDoc';
import DropdownDoc from '@pages/DropdownDoc';
import ExperienceCardDoc from '@pages/ExperienceCardDoc';
import IconDoc from '@pages/IconDoc';
import InputDoc from '@pages/InputDoc';
import LandingPage from '@pages/LandingPage';
import LogoDoc from '@pages/LogoDoc';
import PaginationDoc from '@pages/PaginationDoc';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import Sidebar from '@/layouts/Sidebar';

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
        path: 'ExperienceCard',
        element: <ExperienceCardDoc />,
      },
      {
        path: 'Input',
        element: <InputDoc />,
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
        path: 'Dropdown',
        element: <DropdownDoc />,
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

import Sidebar from '@layouts/Sidebar';
import ButtonDoc from '@pages/ButtonDoc';
import CalendarDoc from '@pages/CalendarDoc';
import DropdownDoc from '@pages/DropdownDoc';
import ExperienceCardDoc from '@pages/ExperienceCardDoc';
import IconDoc from '@pages/IconDoc';
import InputDoc from '@pages/InputDoc';
import LandingPage from '@pages/LandingPage';
import LogoDoc from '@pages/LogoDoc';
import PaginationDoc from '@pages/PaginationDoc';
import RadioGroupDoc from '@pages/RadioGroupDoc';
import ReservationCardDoc from '@pages/ReservationCardDoc';
import TextareaDoc from '@pages/TextareaDoc';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import FooterDoc from '@/pages/FooterDoc';

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
        path: 'button',
        element: <ButtonDoc />,
      },
      {
        path: 'RadioGroup',
        element: <RadioGroupDoc />,
      },
      {
        path: 'ExperienceCard',
        element: <ExperienceCardDoc />,
      },
      {
        path: 'Textarea',
        element: <TextareaDoc />,
      },
      {
        path: 'ReservationCard',
        element: <ReservationCardDoc />,
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
      {
        path: 'Footer',
        element: <FooterDoc />,
      },
    ],
  },
]);

export default router;

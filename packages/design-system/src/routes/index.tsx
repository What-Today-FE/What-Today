import Sidebar from '@layouts/Sidebar';
import ButtonDoc from '@pages/ButtonDoc';
import CalendarDoc from '@pages/CalendarDoc';
import DropdownDoc from '@pages/DropdownDoc';
import ExperienceCardDoc from '@pages/ExperienceCardDoc';
import IconDoc from '@pages/IconDoc';
import InputDoc from '@pages/InputDoc';
import LandingPage from '@pages/LandingPage';
import LogoDoc from '@pages/LogoDoc';


import MainCardDoc from '@pages/MainCardDoc';
import NoResultDoc from '@pages/NoResultDoc';
import NotificationCardDoc from '@pages/NotificationCardDoc';
import PaginationDoc from '@pages/PaginationDoc';
import PopoverDoc from '@pages/PopoverDoc';
import ProfileImageInputDoc from '@pages/ProfileImageInputDoc';
import RadioGroupDoc from '@pages/RadioGroupDoc';
import ReservationCardDoc from '@pages/ReservationCardDoc';


import SelectDoc from '@pages/SelectDoc';

import TextareaDoc from '@pages/TextareaDoc';
import ToastDoc from '@pages/ToastDoc';
import { createBrowserRouter, Navigate } from 'react-router-dom';


import FooterDoc from '@/pages/FooterDoc';

import OwnerBadgeDoc from '@/pages/OwnerBadgeDoc';
import UserBadgeDoc from '@/pages/UserBadgeDoc';


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
        path: 'ProfileImageInput',
        element: <ProfileImageInputDoc />,
      },
      {
        path: 'NotificationCard',
        element: <NotificationCardDoc />,
      },
      {
        path: 'NoResult',
        element: <NoResultDoc />,
      },
      {
        path: 'UserBadge',
        element: <UserBadgeDoc />,
      },
      {
        path: 'OwnerBadge',
        element: <OwnerBadgeDoc />,
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
        path: 'Toast',
        element: <ToastDoc />,
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
        path: 'Popover',
        element: <PopoverDoc />,
      },
      {
        path: 'Select',
        element: <SelectDoc />,
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

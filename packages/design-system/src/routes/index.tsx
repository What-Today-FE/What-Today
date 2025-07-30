import Sidebar from '@layouts/Sidebar';
import AddressInputDoc from '@pages/AddressInputDoc';
import BottomSheetDoc from '@pages/BottomSheetDoc';
import ButtonDoc from '@pages/ButtonDoc';
import CalendarDoc from '@pages/CalendarDoc';
import CarouselDoc from '@pages/CarouselDoc';
import DatePickerDoc from '@pages/DatePickerDoc';
import DropdownDoc from '@pages/DropdownDoc';
import ExperienceCardDoc from '@pages/ExperienceCardDoc';
import ExperienceImageUploadDoc from '@pages/ExperienceImageUploadDoc';
import IconDoc from '@pages/IconDoc';
import InputDoc from '@pages/InputDoc';
import LandingPage from '@pages/LandingPage';
import LogoDoc from '@pages/LogoDoc';
import MainBannerDoc from '@pages/MainBannerDoc';
import MainCardDoc from '@pages/MainCardDoc';
import MainSearchInputDoc from '@pages/MainSearchInputDoc';
import ModalDoc from '@pages/ModalDoc';
import MypageProfileHeaderDoc from '@pages/MypageProfileHeaderDoc';
import MypageSummaryCardDoc from '@pages/MypageSummaryCardDoc';
import NoResultDoc from '@pages/NoResultDoc';
import NotificationCardDoc from '@pages/NotificationCardDoc';
import OngoingExperienceCardDoc from '@pages/OngoingExperienceCardDoc';
import PaginationDoc from '@pages/PaginationDoc';
import PopoverDoc from '@pages/PopoverDoc';
import ProfileImageInputDoc from '@pages/ProfileImageInputDoc';
import RadioGroupDoc from '@pages/RadioGroupDoc';
import ReservationCardDoc from '@pages/ReservationCardDoc';
import SelectDoc from '@pages/SelectDoc';
import StarRatingDoc from '@pages/StarRatingDoc';
import TextareaDoc from '@pages/TextareaDoc';
import TimePickerDoc from '@pages/TimePickerDoc';
import ToastDoc from '@pages/ToastDoc';
import UpcomingScheduleDoc from '@pages/UpcomingScheduleDoc';
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
        path: 'TimePicker',
        element: <TimePickerDoc />,
      },
      {
        path: 'OngoingExperienceCard',
        element: <OngoingExperienceCardDoc />,
      },
      {
        path: 'UpcomingSchedule',
        element: <UpcomingScheduleDoc />,
      },
      {
        path: 'MypageSummaryCard',
        element: <MypageSummaryCardDoc />,
      },
      {
        path: 'MypageProfileHeader',
        element: <MypageProfileHeaderDoc />,
      },
      {
        path: 'ProfileImageInput',
        element: <ProfileImageInputDoc />,
      },
      {
        path: 'MainCard',
        element: <MainCardDoc />,
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
        path: 'ExperienceImageUpload',
        element: <ExperienceImageUploadDoc />,
      },
      {
        path: 'MainBanner',
        element: <MainBannerDoc />,
      },
      {
        path: 'Footer',
        element: <FooterDoc />,
      },
      {
        path: 'Carousel',
        element: <CarouselDoc />,
      },
      {
        path: 'MainSearchInput',
        element: <MainSearchInputDoc />,
      },
      {
        path: 'BottomSheet',
        element: <BottomSheetDoc />,
      },
      {
        path: 'DatePicker',
        element: <DatePickerDoc />,
      },
      {
        path: 'Modal',
        element: <ModalDoc />,
      },
      {
        path: 'StarRating',
        element: <StarRatingDoc />,
      },
      {
        path: 'AddressInput',
        element: <AddressInputDoc />,
      },
    ],
  },
]);

export default router;

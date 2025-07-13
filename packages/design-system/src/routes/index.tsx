import Sidebar from '@layouts/Sidebar';
import ButtonExampleDocs from '@pages/ButtonExampleDocs';
import DropdownDoc from '@pages/DropdownDoc';
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
        path: 'Dropdown',
        element: <DropdownDoc />,
      },
      {
        path: 'Pagination',
        element: <PaginationDoc />,
      },
    ],
  },
]);

export default router;

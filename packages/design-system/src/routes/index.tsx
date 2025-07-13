import ButtonExampleDocs from '@pages/ButtonExampleDocs';
import InputDoc from '@pages/InputDoc';
import LandingPage from '@pages/LandingPage';
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
        path: 'Input',
        element: <InputDoc />,
      },
    ],
  },
]);

export default router;

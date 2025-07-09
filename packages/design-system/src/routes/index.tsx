import Sidebar from '@layouts/Sidebar';
import ButtonDocs from '@pages/ButtonDocs';
import LandingPage from '@pages/LandingPage';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Sidebar />,
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
        element: <ButtonDocs />,
      },
    ],
  },
]);

export default router;

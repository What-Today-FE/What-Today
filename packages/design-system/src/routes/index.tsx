import Sidebar from '@layouts/Sidebar';
import ButtonExampleDocs from '@pages/ButtonExampleDocs';
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
        path: 'button-example',
        element: <ButtonExampleDocs />,
      },
    ],
  },
]);

export default router;

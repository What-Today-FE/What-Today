import './index.css';
import 'highlight.js/styles/github-dark-dimmed.css';

import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from './routes/index.tsx';

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);

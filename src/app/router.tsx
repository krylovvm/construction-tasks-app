import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { LoginPage } from '@/pages/LoginPage';
import { PlanPage } from '@/pages/PlanPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
      {
        path: '/plan',
        element: <PlanPage />,
      },
    ],
  },
]);

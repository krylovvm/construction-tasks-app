import { createBrowserRouter } from 'react-router-dom'
import { App } from './App'
import { PATHS } from '@/shared/config'
import { lazy } from 'react'

const HomePage = lazy(() => import('@/pages/home-page'))
const LoginPage = lazy(() => import('@/pages/login'))
const PlansPage = lazy(() => import('@/pages/plans'))
const PlanDetailPage = lazy(() => import('@/pages/plan-detail'))

export const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: PATHS.LOGIN,
        element: <LoginPage />,
      },
      {
        path: PATHS.PLANS,
        element: <PlansPage />,
      },
      {
        path: `${PATHS.PLANS}/:id`,
        element: <PlanDetailPage />,
      },
    ],
  },
])

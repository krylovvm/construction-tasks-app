import { createBrowserRouter } from 'react-router-dom'
import { App } from './App'
import { Login, Plans, PlanDetail, HomePage } from '@/pages/'
import { PATHS } from '@/shared/config'

export const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: PATHS.LOGIN,
        element: <Login />,
      },
      {
        path: PATHS.PLANS,
        element: <Plans />,
      },
      { path: `${PATHS.PLANS}/:id`, element: <PlanDetail /> },
    ],
  },
])

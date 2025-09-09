import { Outlet, useLocation, Navigate } from 'react-router-dom'
import '@/shared/assets/styles/global.css'
import { Header } from '@/widgets'
import { useUserStore } from '@/entities/user'
import { PATHS } from '@/shared/config'
import { Suspense } from 'react'
import { PageLoader } from '@/shared/ui'

export const App = () => {
  const { currentUser } = useUserStore()
  const location = useLocation()

  if (!currentUser && location.pathname !== PATHS.HOME && location.pathname !== PATHS.LOGIN) {
    return <Navigate to={PATHS.HOME} />
  }

  return (
    <>
      <Header />
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </>
  )
}

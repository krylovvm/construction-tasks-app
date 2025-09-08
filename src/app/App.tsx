import { Outlet, useLocation, Navigate } from 'react-router-dom'
import '@/shared/assets/styles/global.css'
import { Header } from '@/widgets'
import { useUserStore } from '@/entities/user'
import { PATHS } from '@/shared/config'

export const App = () => {
  const { currentUser } = useUserStore()
  const location = useLocation()

  if (!currentUser && location.pathname !== PATHS.HOME && location.pathname !== PATHS.LOGIN) {
    return <Navigate to={PATHS.HOME} />
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

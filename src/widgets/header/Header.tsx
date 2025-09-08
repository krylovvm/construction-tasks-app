import { useUserStore } from '@/entities/user'
import { Button } from '@/shared/ui'
import { Link, useNavigate } from 'react-router-dom'
import { PATHS } from '@/shared/config/paths'

export const Header = () => {
  const { currentUser, logout } = useUserStore()
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate(PATHS.LOGIN)
  }

  return (
    <header className="w-full bg-blue-950 text-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to={PATHS.HOME} className="font-bold text-xl text-white">
          Construction Tasks App
        </Link>
        {currentUser ? (
          <div className="flex items-center space-x-4">
            <span className="text-base">{currentUser.name}</span>
            <Button
              onClick={handleLogout}
              className="text-white hover:underline hover:text-blue-200 bg-transparent border-none p-0 cursor-pointer"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link
            to="/"
            className="text-white hover:underline hover:text-blue-200 bg-transparent border-none p-0 cursor-pointer"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  )
}

import { LoginForm } from '@/features/auth'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '@/shared/config'

export const Login = () => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate(PATHS.PLANS)
  }

  return <LoginForm onLogin={handleLogin} />
}

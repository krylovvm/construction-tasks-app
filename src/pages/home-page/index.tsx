import { Link } from 'react-router-dom'
import { PATHS } from '@/shared/config/paths'
import { useUserStore } from '@/entities/user'

export const HomePage = () => {
  const { currentUser } = useUserStore()

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-6 text-blue-950">Welcome to Construction Tasks App</h1>
      <p className="text-lg text-gray-700 mb-8">
        Manage your construction plans and tasks easily. Upload plans, place tasks and track
        progress visually.
      </p>
      {currentUser ? (
        <Link
          to={PATHS.PLANS}
          className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Go to My Plans
        </Link>
      ) : (
        <Link
          to={PATHS.LOGIN}
          className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Login
        </Link>
      )}
    </div>
  )
}

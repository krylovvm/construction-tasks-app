import { useUserStore } from '@/entities/user';
import { LoginForm } from '@/features/auth';

export const LoginPage = () => {
  const { currentUser, logout } = useUserStore();

  if (currentUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white rounded shadow p-8 text-center">
          <div className="text-lg mb-4">
            Hello, <b>{currentUser.name}</b>!
          </div>
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return <LoginForm onLogin={() => {}} />;
};

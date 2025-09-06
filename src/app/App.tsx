import { Outlet } from 'react-router-dom';
import '@/shared/assets/styles/global.css';

export const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Outlet />
    </div>
  );
};

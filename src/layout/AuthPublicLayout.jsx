import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const AuthPublicLayout = () => {
  // Public Routes
  // No tiene sentido un laoding xq se tendria q renderizar esto en cada refresh
  // Esto se envita (es bueno) con el loading en el AppRouter
  console.log('PUBLIC');

  return (
    <main className="container mx-auto md:grid  md:grid-cols-2 mt-12 gap-12 p-5 items-center">
      <Outlet />
    </main>
  );
};

import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const PublicRoute = ({ children }) => {
  const { auth } = useAuth();

  const lastPath = localStorage.getItem('lastPath') || '/admin';

  return !auth?._id ? children : <Navigate to={`${lastPath}`} replace />;
};

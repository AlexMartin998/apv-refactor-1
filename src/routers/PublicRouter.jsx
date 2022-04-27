import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const PublicRoute = ({ children }) => {
  const { auth } = useAuth();

  return !auth?._id ? children : <Navigate to="/admin" replace />;

  // localStorage.setItem('lastPath', pathname + search);

  // return !uid ? <Navigate to="/login" /> : children;
};

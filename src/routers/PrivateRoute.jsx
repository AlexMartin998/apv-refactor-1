import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();
  const { pathname } = useLocation();

  localStorage.setItem('lastPath', pathname);

  return !auth?._id ? <Navigate to="/" /> : children;
};

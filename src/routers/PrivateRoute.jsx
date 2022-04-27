import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();

  return !auth?._id ? <Navigate to="/" replace /> : children;

  // const { pathname, search } = useLocation();

  // localStorage.setItem('lastPath', pathname + search);

  // return !uid ? <Navigate to="/login" /> : children;
};

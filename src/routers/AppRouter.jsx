import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthPublicLayout } from '../layout/AuthPublicLayout';

import { Login } from './../pages/Login';
import { Register } from '../pages/Register';

import { PatientManagement } from '../pages/PatientManagement';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRouter';
import { DashboardLayout } from '../layout/DashboardPrivateLayout';
import useAuth from '../hooks/useAuth';
import { ConfirmAccount } from '../pages/ConfirmAccount';

export const AppRouter = () => {
  const { cargando } = useAuth();
  if (cargando)
    return (
      <p className="text-3xl my-auto text-green-900 font-black">
        Loading... AppRouter
      </p>
    );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <AuthPublicLayout />
            </PublicRoute>
          }
        >
          <Route index element={<Login />} />
          <Route path="registrar" element={<Register />} />
          <Route path="confirmar/:token" element={<ConfirmAccount />} />
          {/* <Route path="olvide-password" element={<OlvidePassword />} /> */}
          {/* <Route path="olvide-password/:token" element={<NuevoPassword />} /> */}
        </Route>

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<PatientManagement />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

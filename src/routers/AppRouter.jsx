import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRouter';
import { AuthPublicLayout } from '../layout/AuthPublicLayout';
import { DashboardLayout } from '../layout/DashboardPrivateLayout';

import { Login } from './../pages/Login';
import { Register } from '../pages/Register';
import { ConfirmAccount } from '../pages/ConfirmAccount';
import { PasswordRecovery } from '../pages/PasswordRecovery';
import { PatientManagement } from '../pages/PatientManagement';
import { NewPassword } from '../pages/NewPassword';
import { ChangePassword } from '../pages/ChangePassword';
import { EditProfile } from '../pages/EditProfile';

export const AppRouter = () => {
  const { cargando } = useAuth();
  if (cargando)
    return (
      <p className="flex justify-center items-center h-screen text-4xl my-auto text-green-900 font-black">
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
          <Route path="olvide-password" element={<PasswordRecovery />} />
          <Route path="olvide-password/:token" element={<NewPassword />} />
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
          <Route path="perfil" element={<EditProfile />} />
          <Route path="cambiar-password" element={<ChangePassword />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

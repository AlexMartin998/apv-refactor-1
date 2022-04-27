import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthPublicLayout } from '../layout/AuthPublicLayout';

import { Login } from './../pages/Login';
import { PatientManagement } from '../pages/PatientManagement';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRouter';
import { DashboardLayout } from '../layout/DashboardPrivateLayout';

export const AppRouter = () => {
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

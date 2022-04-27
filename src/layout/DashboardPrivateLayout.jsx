import { Outlet } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';

export const DashboardLayout = () => {
  const { cargando } = useAuth();
  if (cargando)
    return (
      <p className="text-3xl my-auto text-green-900 font-black">
        Loading... PRIVATE
      </p>
    );

  return (
    <>
      <Header />

      <main className="container mx-auto mt-10">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

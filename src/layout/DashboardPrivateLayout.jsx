import { Outlet } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';

export const DashboardLayout = () => {
  console.log('PRIVATE - Dashboard');

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

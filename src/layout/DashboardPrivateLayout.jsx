import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { axiosClient } from '../config/axios';
import usePacientes from '../hooks/usePacientes';

import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchWithToken } from '../helpers/fetch';

const validateTokenFromLS = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};

export const DashboardLayout = () => {
  const { setPatients } = usePacientes();

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const config = validateTokenFromLS();
        if (!config) return;

        const { data } = await axiosClient('/pacientes', config);
        // const { data } = await fetchWithToken('/pacientes');
        setPatients(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPacientes();
  }, []);

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

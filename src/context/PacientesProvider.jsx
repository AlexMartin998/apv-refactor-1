import { createContext, useState, useCallback } from 'react';

import { fetchWithToken } from '../helpers/fetch';

const PacientesContext = createContext();

let tokenJWT;

const validateTokenFromLS = () =>
  (tokenJWT = localStorage.getItem('token') || false);

export const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  const setPatients = useCallback(
    apiData => {
      setPacientes(apiData);
    },
    [setPacientes]
  );

  const guardarPaciente = async paciente => {
    console.log(paciente, paciente.id, Boolean(paciente.id));
    validateTokenFromLS();
    if (!tokenJWT) return;

    if (paciente.id) {
      try {
        const { data } = await fetchWithToken(
          `/pacientes/${paciente.id}`,
          'PUT',
          tokenJWT,
          paciente
        );

        const pacientesActualizado = pacientes.map(pacienteState =>
          pacienteState._id === data._id ? data : pacienteState
        );
        setPacientes(pacientesActualizado);
        setPaciente({});
      } catch (error) {
        if (error) throw error;
      }
    } else {
      validateTokenFromLS();
      if (!tokenJWT) return;

      try {
        const { data } = await fetchWithToken(
          '/pacientes',
          'POST',
          tokenJWT,
          paciente
        );

        // eslint-disable-next-line no-unused-vars
        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
        setPacientes([pacienteAlmacenado, ...pacientes]);
      } catch (error) {
        console.log(error.response.data.msg);
        if (error) throw error;
      }
    }
  };

  // TODO: Limpiar pacientes al hacer logout

  const setEdicion = paciente => {
    validateTokenFromLS();
    if (!tokenJWT) return;
    setPaciente(paciente);
  };

  const eliminarPaciente = async id => {
    validateTokenFromLS();
    if (!tokenJWT) return;

    const confirmar = confirm('¿Confirmas que deseas eliminar ?');

    if (confirmar) {
      try {
        const config = validateTokenFromLS();
        if (!config) return;

        await fetchWithToken(`/pacientes/${id}`, 'DELETE', tokenJWT);

        const pacientesActualizado = pacientes.filter(
          pacientesState => pacientesState._id !== id
        );
        setPacientes(pacientesActualizado);
      } catch (error) {
        console.log(error);
        if (error) throw error;
      }
    }
  };

  return (
    <PacientesContext.Provider
      value={{
        setPatients,
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        eliminarPaciente,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export default PacientesContext;

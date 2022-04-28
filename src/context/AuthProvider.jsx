/* import { useState, useEffect, createContext } from 'react';
import { axiosClient } from '../config/axios';
import { fetchWithoutToken } from '../helpers/fetch';
// juan1@juan.com
const AuthContext = createContext();

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

const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const autenticarUsuario = async () => {
      const config = validateTokenFromLS();
      if (!config) return setCargando(false);

      try {
        const { data } = await axiosClient('/veterinarios/perfil', config);
        setAuth(data);
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({});
      }

      setCargando(false);
    };

    autenticarUsuario();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    setAuth({});
  };

  const actualizarPerfil = async datos => {
    const config = validateTokenFromLS();
    if (!config) return setCargando(false);

    try {
      const url = `/veterinarios/perfil/${datos._id}`;
      await axiosClient.put(url, datos, config);

      return {
        msg: 'Almacenado Correctamente',
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  const guardarPassword = async datos => {
    const config = validateTokenFromLS();
    if (!config) return setCargando(false);

    try {
      const url = '/veterinarios/actualizar-password';

      const { data } = await axiosClient.put(url, datos, config);
      console.log(data);

      return {
        msg: data.msg,
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        actualizarPerfil,
        guardarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
 */

import { useState, useEffect, createContext } from 'react';
import { fetchWithToken } from '../helpers/fetch';
// juan1@juan.com
const AuthContext = createContext();
let tokenJWT;

const validateTokenFromLS = () =>
  (tokenJWT = localStorage.getItem('token') || false);

const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const autenticarUsuario = async () => {
      validateTokenFromLS();
      if (!tokenJWT) return setCargando(false);

      try {
        const { data } = await fetchWithToken(
          '/veterinarios/perfil',
          'GET',
          tokenJWT
        );
        setAuth(data);
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({});
      }

      // Private Routes
      setCargando(false);
    };

    autenticarUsuario();
    // return () => {
    //   autenticarUsuario();
    // };
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    setAuth({});
  };

  const actualizarPerfil = async datos => {
    validateTokenFromLS();
    if (!tokenJWT) return setCargando(false);

    try {
      const url = `/veterinarios/perfil/${datos._id}`;
      await fetchWithToken(url, 'PUT', tokenJWT, datos);

      return {
        msg: 'Almacenado Correctamente',
        error: false,
      };
    } catch (error) {
      if (error) throw error;
    }
  };

  const guardarPassword = async datos => {
    validateTokenFromLS();
    if (!tokenJWT) return setCargando(false);

    try {
      const url = '/veterinarios/actualizar-password';
      const { data } = await fetchWithToken(url, 'PUT', tokenJWT, datos);

      return {
        msg: data.msg,
      };
    } catch (error) {
      if (error) throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        actualizarPerfil,
        guardarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;

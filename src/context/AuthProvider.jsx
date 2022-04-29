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

    setTimeout(() => {
      window.location.reload();
    }, 100);
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

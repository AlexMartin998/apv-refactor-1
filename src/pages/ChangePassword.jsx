import { useState } from 'react';
import AdminNav from '../components/AdminNav';
import { Alert } from '../components/Alerta';
import useAuth from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';

const initState = {
  currentPassword: '',
  newPassword: '',
};

export const ChangePassword = () => {
  const { guardarPassword, cerrarSesion } = useAuth();

  const [formValues, handleInputChange, reset] = useForm(initState);
  const { currentPassword, newPassword } = formValues;

  const [alerta, setAlerta] = useState({});
  const { msg } = alerta;

  const handleSubmit = async e => {
    e.preventDefault();
    if (Object.values(formValues).some(field => !field))
      return setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });

    if (newPassword.length < 6)
      return setAlerta({
        msg: 'El password nuevo debe tener minimo 6 caracteres',
        error: true,
      });

    try {
      const { msg } = await guardarPassword({
        pwd_actual: currentPassword,
        pwd_nuevo: newPassword,
      });

      reset();
      setAlerta({ msg, error: false });

      setTimeout(() => {
        cerrarSesion();
      }, 1200);
    } catch (error) {
      // console.log(error.response);
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">
        Cambiar Password
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu {''}
        <span className="text-indigo-600 font-bold">Password aquí</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alert alerta={alerta} />}

          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Password Actual
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Escribe tu password actual"
                name="currentPassword"
                value={currentPassword}
                onChange={handleInputChange}
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Password Nuevo
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Escribe tu nuevo password"
                name="newPassword"
                value={newPassword}
                onChange={handleInputChange}
              />
            </div>

            <input
              type="submit"
              value="Actualizar Password"
              className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
            />
          </form>
        </div>
      </div>
    </>
  );
};

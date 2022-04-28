import { useState, useEffect } from 'react';
import { Alert } from './Alerta';
import usePacientes from '../hooks/usePacientes';
import { useForm } from '../hooks/useForm';

const initState = {
  nombre: '',
  propietario: '',
  email: '',
  fecha: '',
  sintomas: '',
  id: '',
};

const Formulario = () => {
  const [formValues, handleInputChange, reset] = useForm(initState);
  const { nombre, propietario, email, fecha, sintomas, id } = formValues;

  const [alerta, setAlerta] = useState({});

  const { guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    if (paciente?.nombre) {
      reset();
    }
  }, [paciente]);

  const handleSubmit = e => {
    e.preventDefault();

    // validar el formulario
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    guardarPaciente({ nombre, propietario, email, fecha, sintomas, id });
    setAlerta({
      msg: 'Guardado Correctamente',
    });
    reset();
  };

  const { msg } = alerta;
  return (
    <>
      <h2 className="font-black text-3xl text-center">
        Administrador de Pacientes
      </h2>

      <p className="text-xl mt-5 mb-10 text-center">
        Añade tus pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            name="nombre"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="text-gray-700 uppercase font-bold"
          >
            Nombre Propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            name="propietario"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 uppercase font-bold">
            Email Propietario
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            name="email"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">
            Fecha Alta
          </label>
          <input
            id="fecha"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            name="fecha"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="text-gray-700 uppercase font-bold"
          >
            Síntomas
          </label>
          <textarea
            id="sintomas"
            placeholder="Describe los Síntomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            name="sintomas"
            onChange={handleInputChange}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={id ? 'Guardar Cambios' : 'Agregar Paciente'}
        />

        <input
          type="button"
          value="Reset Form"
          className="bg-red-500 w-full mt-4 p-3 text-white uppercase font-bold hover:bg-red-700 cursor-pointer transition-colors"
          onClick={() => reset()}
        />
      </form>

      {msg && <Alert alerta={alerta} />}
    </>
  );
};

export default Formulario;

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  // Esquema de validación de Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Correo inválido').required('Correo es requerido'),
    password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('Contraseña es requerida'),
  });

  // Función de envío del formulario
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Llamada al backend para autenticar al usuario
      const response = await axios.post('http://localhost:5000/api/users/login', values);
      console.log(response);
      // Almacenar el token y los datos del usuario en localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data._id));  // Guardar los datos del usuario
      
      // Llamar al login del contexto para actualizar el estado global
      login(response.data._id);
      
      // Redirigir al usuario a la página de perfil
      navigate('/profile');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
    setSubmitting(false);
  };
  


  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <Field type="password" name="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Iniciar Sesión
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;



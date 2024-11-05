import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const RegisterPage = () => {
  // Estado para manejar el mensaje de respuesta del servidor
  const [message, setMessage] = useState('');

  // Esquema de validación de Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Nombre es requerido'),
    email: Yup.string().email('Correo inválido').required('Correo es requerido'),
    password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('Contraseña es requerida'),
  });

  // Función de envío del formulario
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Llamada al backend para registrar un nuevo usuario
      const response = await axios.post('http://localhost:5000/api/users/register', values);
      
      // Si el registro es exitoso, muestra el mensaje de éxito
      setMessage(response.data.message);
      resetForm();
    } catch (error) {
      // Si hay un error, muestra el mensaje de error
      setMessage(error.response?.data?.message || 'Error al registrar usuario');
    }
    setSubmitting(false);
  };

  return (
    <div className="container">
      <h2>Registro de Usuario</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <Field type="text" name="name" className="form-control" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

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
              Registrar
            </button>
          </Form>
        )}
      </Formik>

      {/* Mostrar el mensaje de respuesta */}
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default RegisterPage;


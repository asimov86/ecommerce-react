import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);  // Estado para almacenar datos del usuario
  const [error, setError] = useState(null);  // Estado para manejar errores
  const navigate = useNavigate();

  // Obtener el token almacenado en localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      // Si no hay token, redirigir al login
      navigate('/login');
    } else {
      // Llamada al backend para obtener los datos del usuario
      const fetchUserData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/users/profile', {
            headers: {
              Authorization: `Bearer ${token}`,  // Enviar token en los headers
            },
          });
          setUserData(response.data);  // Guardar los datos del usuario
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
          
          // Si el error es debido a un token inválido, redirigir al login
          if (error.response && error.response.status === 401) {
            setError('Sesión expirada. Por favor, vuelve a iniciar sesión.');
            navigate('/login');
          } else {
            setError('Ocurrió un error al obtener los datos. Inténtalo más tarde.');
          }
        }
      };
      fetchUserData();
    }
  }, [token, navigate]);

  // Si hay un error, mostrar el mensaje
  if (error) {
    return <div>{error}</div>;
  }

  // Si los datos del usuario no están disponibles, mostrar un indicador de carga
  if (!userData) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Bienvenido, {userData.name}!</h1>
      <p>Correo electrónico: {userData.email}</p>
      <p>Fecha de creación de la cuenta: {new Date(userData.createdAt).toLocaleDateString()}</p>
      {/* Aquí puedes mostrar más información sobre el usuario */}
    </div>
  );
};

export default ProfilePage;

import { useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const VerifyAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Función para obtener el token de los parámetros de consulta
  const getTokenFromQuery = useCallback(() => {
    const params = new URLSearchParams(location.search);
    return params.get('token');
  }, [location.search]); // Depende de location.search

  useEffect(() => {
    const token = getTokenFromQuery(); // Obtener el token

    const verifyEmail = async () => {
      if (!token) {
        console.error('Token no encontrado');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/users/verify?token=${token}`);
        if (response.status === 200) {
          // Mostrar mensaje de éxito y redirigir al usuario después de 3 segundos
          alert(response.data.message);
          setTimeout(() => {
            navigate('/login'); // Redirigir al login después de mostrar el mensaje
          }, 3000); // 3 segundos
        }
      } catch (error) {
        console.error('Error al verificar el correo:', error);
      }
    };

    verifyEmail();
  }, [getTokenFromQuery, navigate]); // Incluir getTokenFromQuery en las dependencias

  return <div>Verificando tu cuenta...</div>;
};

export default VerifyAccount;

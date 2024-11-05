import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';  // Asegúrate de tener un contexto de autenticación

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();  // Obtener el estado de autenticación desde el contexto

  if (!user) {
    // Si no hay un usuario autenticado, redirigir al login
    return <Navigate to="/login" />;
  }

  // Si el usuario está autenticado, renderizar el componente hijo
  return children;
};

export default ProtectedRoute;

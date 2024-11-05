import { createContext, useContext, useState, useEffect } from 'react';

// Crea el contexto
export const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
  // Simula la carga del usuario desde localStorage o una API
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      setUser(null); // Asegura que el estado no quede inconsistente si hay un error
    }
  }
}, []);

  

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Guarda el usuario en localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Elimina el usuario de localStorage
    localStorage.removeItem('token'); // Elimina el usuario de localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

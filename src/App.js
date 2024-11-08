import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyAccount from './pages/VerifyAccount'; 
import ProfilePage from './pages/ProfilePage';  // Importa la nueva página de perfil
import ChangePassword from './pages/ChangePassword';
import ResetPassword from './pages/ResetPassword';
import Cart from './pages/Cart';
import ProtectedRoute from './components/ProtectedRoute'; // Importa tu componente de protección de rutas
//import Footer from './components/Footer'; // Asegúrate de ajustar la ruta según tu estructura de carpetas
import MainLayout from './components/MainLayout'; // Importa el layout principal
import HomePage from './pages/HomePage';
import Header from './components/Header'; 
import AddProductPage from './pages/addProductPage';
import UploadJson from './pages/addProductsPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Rutas sin el layout principal */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify" element={<VerifyAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Rutas con el layout principal */}
        <Route path="/profile" element={<ProtectedRoute><MainLayout><ProfilePage /></MainLayout></ProtectedRoute>} />
        <Route path="/change-password" element={<ProtectedRoute><MainLayout><ChangePassword /></MainLayout></ProtectedRoute>}/>
        <Route path="/cart" element={<MainLayout><Cart /></MainLayout>}/>
        <Route path="/admin/add-product" element={<AddProductPage />} />
        <Route path="/admin/add-products" element={<UploadJson />} />
      </Routes>
    </Router>
  );
}

export default App;
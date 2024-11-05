import { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = new URLSearchParams(window.location.search).get('token');
    try {
      const response = await axios.put('/api/users/reset-password', { token, newPassword });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label>Nueva contraseña</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Restablecer Contraseña</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;

import { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/users/change-password', { oldPassword, newPassword });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label>Contraseña actual</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <label>Nueva contraseña</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Cambiar Contraseña</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangePassword;

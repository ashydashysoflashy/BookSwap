import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css'; // Make sure to create a ResetPassword.css file

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:4000/api/user/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to reset password');
      }
      setMessage('Password has been successfully reset.');
      setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="login_page">
      <h2>Reset Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;

// Importing necessary React hooks and components
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Import Stylesheet
import './ResetPassword.css';

// Component for resetting a user's password
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [message, setMessage] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  // Effect to validate password against specified requirements
  useEffect(() => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{9,}$/;
    setValidPassword(passwordRegex.test(newPassword));
  }, [newPassword]);

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validPassword) {
      setMessage("Password does not meet requirements.");
      return;
    }

    try {
      // Attempt to reset password with the token and new password
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
      // Redirect to login page after 3 seconds
      setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Render the reset password form
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
          {!validPassword && newPassword && <p className="password-requirements">
            Password must be at least 9 characters, include an uppercase letter, and a non-alphabetical character.
          </p>}
        </div>
        <button type="submit" className="login-button">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;

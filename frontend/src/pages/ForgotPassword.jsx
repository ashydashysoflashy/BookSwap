import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css'; // Assuming you have a CSS file named ForgotPassword.css

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:4000/api/user/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset link');
      }
      setMessage('Check your email for the reset link.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="login_page">
      <h2>Forgot Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Send Reset Link</button>
      </form>
      <p className="register-text">
        <Link to="/login">Back to Login</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;

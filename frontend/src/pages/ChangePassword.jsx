import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';


const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useAuthContext();
  const navigate = useNavigate();


  useEffect(() => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{9,}$/;
    setValidPassword(passwordRegex.test(newPassword));
  }, [newPassword]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }

    if (!validPassword) {
      setMessage("New password does not meet requirements.");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/user/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`, // userToken should be the logged in user's token
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to change password');
      }
      setMessage('Password successfully changed.');
      setTimeout(() => navigate('/home'), 3000); // Redirect after 3 seconds
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="login_page">
      <h2>Change Password</h2>
      {message && <div className='message'>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Change Password</button>
      </form>
    </div>
  );
};


export default ChangePassword;

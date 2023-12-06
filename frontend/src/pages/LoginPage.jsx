// Importing necessary React hooks and components
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import {useLogin} from '../hooks/useLogin'
import { useEffect } from 'react';
import {useAuthContext} from '../hooks/useAuthContext'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Get the signup function from the hook (login functionality)
  const {login,loading,error} = useLogin()
  let navigate = useNavigate();
  // Accessing the user context
  const {user} = useAuthContext()

  // Handle the login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    //wait to login 
    await login(email,password)
  };
  
  // Redirect to homepage if the user is authenticated
  useEffect(() => {
    if(user){
      window.location.reload(); // This will reload the page
      navigate('/Home')
    }
  },[user, navigate])

  // Used ChatGPT to understand how to add functionality onChange.
  // Render the login form
  return (
    <div className="login_page">
      <h2>Login</h2>
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
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="button" className="text-button">
            <Link to="/forgot-password">Forgot Password?</Link>
          </button>
        </div>
        <button type="submit" className="login-button" disabled={loading}>Log In</button>
        {error && <div className='register-error'>{error}</div>}
      </form>
      <p className="register-text">
        Not Registered? <Link to="/register">Create an Account</Link>
      </p>
    </div>
  );
}

export default LoginPage;

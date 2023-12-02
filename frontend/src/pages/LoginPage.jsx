import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import {useLogin} from '../hooks/useLogin'
import { useEffect } from 'react';
import {useAuthContext} from '../hooks/useAuthContext'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //get the signup function from the hook
  const {login,loading,error} = useLogin()
  let navigate = useNavigate();
  const {user} = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault();
    //wait to login 
    await login(email,password)
  };
  
  //if theres a user go back to home page
  useEffect(() => {
    if(user){
      navigate('/Home')
    }
  },[user])

  // Used ChatGPT to understand how to add functionality onChange.
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
            Forgot Password?
          </button>
        </div>
        <button type="submit" className="login-button" disabled={loading}>Log In</button>
        {error && <div className='login-error'>{error}</div>}
      </form>
      <p className="register-text">
        Not Registered? <Link to="/register">Create an Account</Link>
      </p>
    </div>
  );
}

export default LoginPage;

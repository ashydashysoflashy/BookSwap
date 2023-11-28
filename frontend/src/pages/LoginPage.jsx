import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = (props) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login with:', email, password);
    //object for user
    const userDetails = {email,password};
    const response = await fetch('http://localhost:4000/api/user/login', {
        method: 'POST',
        body: JSON.stringify(userDetails),
        headers: {
          'Content-type': 'application/json'
        }
      });
    const json = await response.json();
    if (!response.ok) {
        console.log("error", json);
    }
    if (response.ok) {
        console.log("success",json)
        navigate('/Home');
        props.setLoggedIn(true);
    }

  };

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
        <button type="submit" className="login-button">Log In</button>
      </form>
      <p className="register-text">
        Not Registered? <Link to="/register">Create an Account</Link>
      </p>
    </div>
  );
}

export default LoginPage;

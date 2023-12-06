// Importing necessary React hooks and components
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'
import './RegisterPage.css';

// Component for the registration page
const RegisterPage = () => {
  // State hooks for form fields and validation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  // Get the signup function from the hook
  const { signup, loading, error } = useSignup()
  let navigate = useNavigate();
  // Accessing user context to determine if a user is logged in
  const { user } = useAuthContext()

  // Used ChatGPT to understand how to add functionality for special case checks in password field.
  useEffect(() => {
    // Password must be at least 9 characters, include an uppercase letter and a non-alphabetical character
    const passwordRegex = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{9,}/;
    setValidPassword(passwordRegex.test(password));
    setValidPassword(password)
  }, [password]);

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validPassword && password === confirmPassword) {
      //wait to sign up
      await signup(email, password, username)
    } else {
      // Show an error message
      console.log("passwords dont match")
    }
  };

  // Effect hook to navigate to the home page after successful registration
  useEffect(() => {
    if (user) {
      window.location.reload();
      navigate('/Home')
    }
  }, [user, navigate])

  // Render the registration form
  return (
    <div className="register_page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email Address:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!validPassword && password && <p className="password-requirements">
            Password must be at least 9 characters, include an uppercase letter, and a non-alphabetical character.
          </p>}
        </div>
        <div>
          <label>Verify Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-button" disabled={loading}>Register</button>
        {error && <div className='register-error'>{error}</div>}
      </form>
      <p className="login-text">
        Already Registered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default RegisterPage;

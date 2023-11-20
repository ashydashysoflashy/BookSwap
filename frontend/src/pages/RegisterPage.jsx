import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.css'; // Make sure to create this CSS file

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    // Used ChatGPT to understand how to add functionality for special case checks in password field.
    useEffect(() => {
        // Password must be at least 9 characters, include an uppercase letter and a non-alphabetical character
        const passwordRegex = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{9,}/;
        setValidPassword(passwordRegex.test(password));
    }, [password]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validPassword && password === confirmPassword) {
            // Handle registration logic here
            console.log('Register with:', email, password, confirmPassword);
            // Redirect or show error messages based on registration success/failure
        } else {
            // Show an error message
            console.error('Password does not meet requirements or passwords do not match.');
        }
    };

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
                <button type="submit" className="register-button" >Register</button>
            </form>
            <p className="login-text">
                Already Registered? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}

export default RegisterPage;

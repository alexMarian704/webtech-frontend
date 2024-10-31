import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return email.endsWith('@stud.ase.ro');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');

        if (!validateEmail(email)) {
            setError('Email must end with @stud.ase.ro');
            return;
        }

        try {
          const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, name, password }),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('jwt', data.token);
            navigate('/dashboard');
          } else {
            const errorData = await response.json();
            setError(errorData.message || 'Register failed');
          }
        } catch (error) {
          console.error('Error:', error);
          setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container">
            <div className="login-form" id="loginForm">
                <h2 id="formTitle">Register</h2>
                {error && (
                    <p id="errorMessage">
                        {error}
                    </p>
                )}
                <form id="loginFormElement" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="emailInput" id="emailLabel">Email:</label>
                        <input
                            type="email"
                            id="emailInput"
                            placeholder="example@stud.ase.ro"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="nameInput" id="nameLabel">Name:</label>
                        <input
                            type="text"
                            id="nameInput"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="passwordInput" id="passwordLabel">Password:</label>
                        <input
                            type="password"
                            id="passwordInput"
                            placeholder="Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>
                    <button type="submit" id="submitButton">Register</button>
                </form>
                <p id="signupText">
                    Already a user? <Link to="/login" id="signupLink">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(AuthContext);

  const validateEmail = (email) => {
    return email.endsWith('@stud.ase.ro');
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (!validateEmail(email)) {
      setError('Email must end with @stud.ase.ro');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.jwt);
        navigate('/');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="login-form" id="loginForm">
        <h2 id="formTitle">Login</h2>
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
          <button type="submit" id="submitButton">Login</button>
        </form>
        <p id="signupText">
          Don't have an account? <Link to="/register" id="signupLink">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
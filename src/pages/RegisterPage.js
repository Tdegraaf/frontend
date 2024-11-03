import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                email,
                password
            });
            // Sla de token op en ga naar het dashboard
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error during registration:', error); // Voor debugging

            // Verbeterde foutafhandeling
            if (error.response) {
                // Server gaf een foutmelding terug
                setError(error.response.data.message);
            } else if (error.request) {
                // Geen reactie van de server
                setError('No response from server.');
            } else {
                // Algemeen probleem
                setError(error.message);
            }
        }
    };

    return (
        <div className="page-container">
          <h1>Register</h1>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="submit-button">Register</button>
          </form>
        </div>
      );
    };

export default RegisterPage;

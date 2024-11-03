// frontend/src/components/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const { token, user } = response.data;

            // Sla het token op in localStorage
            localStorage.setItem('token', token);

            // Redirect op basis van de rol van de gebruiker
            if (user.role === 'customer') {
                navigate('/customer-dashboard'); // Pad voor klanten dashboard
            } else if (user.role === 'employee') {
                navigate('/employee-dashboard'); // Pad voor medewerkers dashboard
            } else if (user.role === 'admin') {
                navigate('/admin-dashboard'); // Pad voor admin dashboard
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed: ' + error.response.data.message);
        }
    };

    // return (
    //     <form onSubmit={handleSubmit}>
    //         <h1>Login</h1>
    //         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
    //         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
    //         <button type="submit">Login</button>
    //     </form>
    // );
    return (
        <div className="page-container">
            <h1>Login</h1>
            <form className="form" onSubmit={handleSubmit}>
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
                <button type="submit" className="submit-button">Login</button>
            </form>
        </div>
    );
};


export default LoginPage;

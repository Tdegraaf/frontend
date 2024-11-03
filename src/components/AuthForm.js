// src/components/AuthForm.js
import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance'; // Gebruik de Axios-instantie
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ isRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = isRegister ? '/auth/register' : '/auth/login';
    const data = isRegister ? { username, email, password } : { email, password };

    try {
      const response = await axiosInstance.post(url, data); // Gebruik de Axios-instantie
      localStorage.setItem('token', response.data.token); // Opslaan van het token
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Error: ' + error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {isRegister && (
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
      )}
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
    </form>
  );
};

export default AuthForm;

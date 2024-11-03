// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/user/profile'); // Voeg een endpoint toe in de backend
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {userData ? (
        <div>
          <h2>User Profile</h2>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.role}</p>
          {/* Hier kun je reserveringen en andere gegevens weergeven */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LoginRegister from './Components/LoginRegister/LoginRegister';
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import Appointment from './Components/Appointment/appointment.jsx'; // Import Appointment component
import ProtectedRoute from './lib/protectedRoute.js';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard.jsx';
import { setAuthToken } from './lib/axios'; // Adjust the import path as needed

const App = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Clear local storage when the tab/window is closed
    const handleBeforeUnload = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token); // Set token for authenticated requests
      // You can add any additional check here, like fetching user details
    } else {
      navigate('/'); // Redirect to login if no token found
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, [navigate]);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 bg-blue-500 dark:bg-yellow-500 text-white p-2 rounded"
      >
        Toggle Theme
      </button>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
        <Route path="/admindashboard" element={<ProtectedRoute component={AdminDashboard} />} />
        <Route path="/appointment" element={<ProtectedRoute component={Appointment} />} /> {/* Add this line */}
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;

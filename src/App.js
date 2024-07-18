import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LoginRegister from './Components/LoginRegister/LoginRegister';
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import Appointment from './Components/Appointment/appointment.jsx';
import ProtectedRoute from './lib/protectedRoute.js';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard.jsx';
import Paramedic_Staff_Dashboard from './Components/Paramedic_Staff_Dashboard/Paramedic_Staff_Dashboard.jsx';
import DoctorDashboard from './Components/DoctorDashboard/DoctorDashboard.jsx';
import Reminder from './Components/Reminder/Reminder.jsx';
import EditProfile from './Components/EditProfile/EditProfile.jsx';
import { setAuthToken } from './lib/axios'; // Adjust the import path as needed
import { ReminderProvider } from './contexts/ReminderContext'; 
import ReleaseReport from './Components/ReleaseReport/ReleaseReport.jsx';
import DoctorList from './Components/DoctorList/DoctorList.jsx';
import CheckPatient from './Components/CheckPatient/CheckPatient.jsx';

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
    <ReminderProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
          <Route path="/admindashboard" element={<ProtectedRoute component={AdminDashboard} />} />
          <Route path="/appointment" element={<ProtectedRoute component={Appointment} />} />
          <Route path="/reminder" element={<ProtectedRoute component={Reminder} />} />
          <Route path="/editProfile" element={<ProtectedRoute component={EditProfile} />} />
          <Route path="/paramedic_staff_dashboard" element={<ProtectedRoute component={Paramedic_Staff_Dashboard} />} />
          <Route path="/releaseReport" element={<ProtectedRoute component={ReleaseReport} />} />
          <Route path="/doctordashboard" element={<ProtectedRoute component={DoctorDashboard} />} />
          <Route path="/doctorlist" element={<ProtectedRoute component={DoctorList} />} />
          <Route path="/checkpatient" element={<ProtectedRoute component={CheckPatient} />} />
        </Routes>
      </div>
    </ReminderProvider>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;

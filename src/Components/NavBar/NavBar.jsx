import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import { setAuthToken } from './../../lib/axios'; // Adjust the import path as needed
import axiosInstance from './../../lib/axios'; // Adjust the import path as needed

const NavBar = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/logout', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setAuthToken(null); // Remove token from Axios instance
      navigate('/');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <nav className="fixed w-full z-20 bg-[#FCF8F3]">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link to="/Dashboard" className="flex-shrink-0 h-12 w-12 logo">
              <a></a>
            </Link>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link to="/appointment" className="text-black hover:bg-emerald-300 hover:text-white px-3 py-2 rounded-md text-2xl font-medium">Appointment</Link>
                <Link to="/reminder" className="text-black hover:bg-emerald-300 hover:text-white px-3 py-2 rounded-md text-2xl font-medium">Reminder</Link>
                <Link to="/" className="text-black hover:bg-emerald-300 hover:text-white px-3 py-2 rounded-md text-2xl font-medium">Report</Link>
                <Link to="/" className="text-black hover:bg-emerald-300 hover:text-white px-3 py-2 rounded-md text-2xl font-medium">Minder Chat</Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button onClick={handleLogout} className="text-black hover:bg-emerald-300 hover:text-white px-3 py-2 rounded-md text-2xl font-medium">Logout</button>
            <button
              onClick={toggleTheme}
              className="fixed top-4 right-4 bg-blue-500 dark:bg-yellow-500 text-white p-2 rounded"
            >
              Toggle Theme
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

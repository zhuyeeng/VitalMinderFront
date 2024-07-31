import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import { setAuthToken } from './../../lib/axios'; // Adjust the import path as needed
import axiosInstance from './../../lib/axios'; // Adjust the import path as needed
import { FaUserDoctor } from "react-icons/fa6";
import PatientRegisterForm from '../PatientRegisterForm/PatientRegisterForm'; // Import the PatientRegisterForm
import RegisterForm from '../RegisterForm/RegisterForm'; // Import the RegisterForm
import { ImProfile } from "react-icons/im";
import { TbReportAnalytics } from "react-icons/tb";
import { MdPersonSearch } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import AppointmentModal from '../AppointmentModal/AppointmentModal'; // Import the AppointmentModal
import { MdAccountBox } from "react-icons/md";

const Sidebar = ({ onToggle }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isPatientRegisterModalOpen, setIsPatientRegisterModalOpen] = useState(false); // State for patient register modal
  const [isRegisterFormModalOpen, setIsRegisterFormModalOpen] = useState(false); // State for admin register modal
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false); // State for appointment modal
  const [patients, setPatients] = useState([]); // State for patient names
  const navigate = useNavigate();
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.user_role) {
      setUserRole(user.user_role);
    }

    // Fetch all patients when the sidebar is loaded
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axiosInstance.get('/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error.response?.data || error.message);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    if (onToggle) {
      onToggle();
    }
  };

  const handleRegisterClick = () => {
    if (userRole === 'admin') {
      setIsRegisterFormModalOpen(true); // Open the admin register modal
    } else if (userRole === 'paramedic') {
      setIsPatientRegisterModalOpen(true); // Open the patient register modal
    }
  };

  const closePatientRegisterModal = () => {
    setIsPatientRegisterModalOpen(false); // Close the patient register modal
  };

  const closeRegisterFormModal = () => {
    setIsRegisterFormModalOpen(false); // Close the admin register modal
  };

  const closeAppointmentModal = () => {
    setIsAppointmentModalOpen(false); // Close the appointment modal
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

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const handleAppointmentSubmit = async (appointment) => {
    try {
      const response = await axiosInstance.post('/appointments', appointment);
      alert('Appointment created successfully:', response.data);
      setIsAppointmentModalOpen(false);
    } catch (error) {
      console.error('Error creating appointment:', error.response?.data || error.message);
    }
  };

  return (
    <>
      <aside className={`w-60 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-48'} fixed transition transform ease-in-out duration-1000 z-40 flex h-screen bg-gray-800 dark:bg-gray-900`}>
        {/* Open sidebar button */}
        <div className={`max-toolbar ${isSidebarOpen ? 'translate-x-0' : 'translate-x-24 scale-x-0'} w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between border-4 border-white dark:border-gray-800 bg-gray-800 dark:bg-gray-900 absolute top-2 rounded-full h-12`}>
          <div className="flex pl-4 items-center space-x-2">
            <div onClick={toggleTheme} className="moon text-white hover:text-blue-500 dark:hover:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            </div>
            <div onClick={toggleSidebar} className="sun hidden text-white hover:text-blue-500 dark:hover:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center space-x-3 group bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-purple-500 pl-10 pr-2 py-1 rounded-full text-white">
            <div className="transform ease-in-out duration-300 mr-12">
              Vital Minder
            </div>
          </div>
        </div>
        <div onClick={toggleSidebar} className="-right-6 transition transform ease-in-out duration-500 flex border-4 border-white dark:border-gray-800 bg-gray-800 dark:bg-gray-900 dark:hover:bg-blue-500 hover:bg-purple-500 absolute top-2 p-3 rounded-full text-white hover:rotate-45">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
          </svg>
        </div>
        {/* MAX SIDEBAR */}
        <div className={`max ${isSidebarOpen ? 'flex' : 'hidden'} text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)]`}>
          {userRole === 'admin' && (
            <>
              <Link to="/admindashboard">
                <div className="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-400 bg-gray-800 dark:bg-gray-900 p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                  Home
                </div>
              </Link>
              <div onClick={handleRegisterClick} className="hover:ml-4 w-full cursor-pointer text-white hover:text-purple-500 dark:hover:text-blue-400 bg-gray-800 dark:bg-gray-900 p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>
                <button>Register</button>
              </div>
            </>
          )}
          {userRole === 'doctor' && (
            <>
              <Link to="/doctordashboard">
                <div className="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-400 bg-gray-800 dark:bg-gray-900 p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    Home
                  </div>
                </Link>
                <Link to="/checkpatient">
                  <div className="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-400 bg-gray-800 dark:bg-gray-900 p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
                    <MdPersonSearch />
                    Check Patient
                  </div>
                </Link>
                <Link to="/staffschedule">
                  <div className="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-400 bg-gray-800 dark:bg-gray-900 p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
                    <AiOutlineSchedule />
                    View Staff Schedule
                  </div> 
                </Link>
                <Link to="/editProfile">
                  <div className="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-400 bg-gray-800 dark:bg-gray-900 p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
                    <ImProfile />
                    Edit Profile
                  </div>
                </Link>
              </>
            )}
            {userRole === 'paramedic' && (
              <>
                <Link to="/paramedic_staff_dashboard">
                  <div className="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-400 bg-gray-800 dark:bg-gray-900 p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    Home
                  </div>
                </Link>
                <div onClick={handleRegisterClick} className="hover:ml-4 w-full cursor-pointer text-white hover:text-purple-500 dark:hover:text-blue-400 bg-gray-800 dark:bg-gray-900 p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                  </svg>
                  <button>Register Patient</button>
                </div>
                <Link to="/checkpatient">
                  <div className="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-400 bg-gray-800 dark:bg-gray-900 p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
                    <MdPersonSearch />
                    Check Patient
                  </div>
                </Link>
                <Link to="/staffschedule">
                  <div className="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-400 bg-gray-800 dark:bg-gray-900 p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
                    <FaUserDoctor className='cursor-pointer' />
                    Staff Schedule
                  </div>
                </Link>
                <Link to="/releaseReport">
                  <div className="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-400 bg-gray-800 dark:bg-gray-900 p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
                    <TbReportAnalytics  className='cursor-pointer' />
                    Release Report
                  </div>
                </Link>
                <Link to="/editProfile">
                  <div className="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-400 bg-gray-800 dark:bg-gray-900 p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
                    <ImProfile className='cursor-pointer' />
                    Edit Profile
                  </div>
                </Link>
                <div onClick={() => setIsAppointmentModalOpen(true)} className="hover:ml-4 w-full cursor-pointer text-white hover:text-purple-500 dark:hover:text-blue-400 bg-gray-800 dark:bg-gray-900 p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
                  <MdAccountBox/>
                  <button>Create Appointment</button>
                </div>
              </>
            )}
            <div 
              className="cursor-pointer hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-400 bg-gray-800 dark:bg-gray-900 p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3"
              onClick={handleLogout}
            >
              <IoIosLogOut className="w-4 h-4" />
              <span>Logout</span>
            </div>
          </div>
          {/* MINI SIDEBAR */}
          <div className={`mini mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)] ${isSidebarOpen ? 'hidden' : 'flex'}`}>
            {userRole === 'admin' && (
              <>
                <Link to="/admindashboard">
                    <div className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-400 w-full bg-gray-800 dark:bg-gray-900 p-3 rounded-full transform ease-in-out duration-300 flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 cursor-pointer">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </div>
                  </Link>
                <div onClick={handleRegisterClick} className="hover:ml-4 justify-end cursor-pointer pr-5 text-white hover:text-purple-500 dark:hover:text-blue-400 w-full bg-gray-800 dark:bg-gray-900 p-3 rounded-full transform ease-in-out duration-300 flex">
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>
                  </button>
                </div>
              </>
            )}
            {userRole === 'doctor' && (
              <>
                <Link to="/doctordashboard">
                  <div className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-400 w-full bg-gray-800 dark:bg-gray-900 p-3 rounded-full transform ease-in-out duration-300 flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                  </div>
                </Link>
                <Link to="/checkpatient">
                  <div className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-400 w-full bg-gray-800 dark:bg-gray-900 p-3 rounded-full transform ease-in-out duration-300 flex">
                      <MdPersonSearch className='cursor-pointer'/>
                  </div>
                </Link>
                <Link to="/staffschedule">
                  <div className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-400 w-full bg-gray-800 dark:bg-gray-900 p-3 rounded-full transform ease-in-out duration-300 flex">
                      <AiOutlineSchedule className='cursor-pointer'/>
                  </div>
                </Link> 
                <Link to="/editProfile">
                  <div className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-400 w-full bg-gray-800 dark:bg-gray-900 p-3 rounded-full transform ease-in-out duration-300 flex">
                      <ImProfile className='cursor-pointer'/>
                  </div>
                </Link>
              </>
            )}
            {userRole === 'paramedic' && (
              <>
                <Link to="/paramedic_staff_dashboard">
                  <div className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-400 w-full bg-gray-800 dark:bg-gray-900 p-3 rounded-full transform ease-in-out duration-300 flex">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                      </svg>
                  </div>
                </Link>
                <div onClick={handleRegisterClick} className="hover:ml-4 cursor-pointer justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-400 w-full bg-gray-800 dark:bg-gray-900 p-3 rounded-full transform ease-in-out duration-300 flex">
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>
                  </button>
                </div>
                <Link to="/checkpatient">
                  <div className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-400 w-full bg-gray-800 dark:bg-gray-900 p-3 rounded-full transform ease-in-out duration-300 flex">
                      <MdPersonSearch className='cursor-pointer'/>
                  </div>
                </Link>
                <Link to="/staffschedule">
                  <div className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-400 w-full bg-gray-800 dark:bg-gray-900 p-3 rounded-full transform ease-in-out duration-300 flex">
                      <FaUserDoctor className='cursor-pointer'/>
                  </div>
                </Link>
                <Link to="/releaseReport">
                  <div className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-400 w-full bg-gray-800 dark:bg-gray-900 p-3 rounded-full transform ease-in-out duration-300 flex">
                      <TbReportAnalytics className='cursor-pointer'/>
                  </div>
                </Link>  
                <Link to="/editProfile">
                  <div className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-400 w-full bg-gray-800 dark:bg-gray-900 p-3 rounded-full transform ease-in-out duration-300 flex">
                      <ImProfile className='cursor-pointer'/>
                  </div>
                </Link>
                <div onClick={() => setIsAppointmentModalOpen(true)} className="hover:ml-4 cursor-pointer justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-400 w-full bg-gray-800 dark:bg-gray-900 p-3 rounded-full transform ease-in-out duration-300 flex">
                  <button ><MdAccountBox/></button>
                </div>
              </>
            )}
            <div 
              className="cursor-pointer hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-400 w-full bg-gray-800 dark:bg-gray-900 p-3 rounded-full transform ease-in-out duration-300 flex"
              onClick={handleLogout}
            >
              <IoIosLogOut className="w-4 h-4" />
            </div>
          </div>
        </aside>
        {isPatientRegisterModalOpen && <PatientRegisterForm onClose={closePatientRegisterModal} />}
        {isRegisterFormModalOpen && <RegisterForm onClose={closeRegisterFormModal} />}
        {isAppointmentModalOpen && <AppointmentModal show={isAppointmentModalOpen} onClose={closeAppointmentModal} patients={patients} onSubmit={handleAppointmentSubmit} userRole={userRole} />}
      </>
    );
  };

export default Sidebar;

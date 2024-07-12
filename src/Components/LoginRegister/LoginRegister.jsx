import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaCalendarAlt, FaGenderless, FaIdCard } from "react-icons/fa";
import './LoginRegister.css'; 
import { registerUser, loginUser, setAuthToken } from './../../lib/axios'; 
import axiosInstance from './../../lib/axios'; 

const LoginRegister = () => {
  const [userType, setUserType] = useState('patient');
  const [mounted, setMounted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [action, setAction] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    date_of_birth: '',
    gender: '',
    identity_card_number: ''
  });
  const [error, setError] = useState('');
  const [user, setUser] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    setMounted(true);
  },[]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      axiosInstance.get('/user')
        .then(response => {
          setUser(response.data);
        })
        .catch(err => {
          console.error('Failed to fetch user', err);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/');
        });
    }
  }, [navigate]);

  if (!mounted) return null; 

  const registerLink = () => {
    setAction('active');
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone_number: '',
      date_of_birth: '',
      gender: '',
      identity_card_number: ''
    });
    setError('');
  };

  const loginLink = () => {
    setAction('');
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone_number: '',
      date_of_birth: '',
      gender: '',
      identity_card_number: ''
    });
    setError('');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await registerUser({
        name: formData.username,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phone_number,
        date_of_birth: formData.date_of_birth,
        gender: formData.gender,
        user_role: userType,
        identity_card_number: formData.identity_card_number
      });
      setAuthToken(response.token); 
      setValidationErrors({}); 
      setError(''); 
      navigate('/'); 
    } catch (err) {
      if (err.data) {
        setValidationErrors(err.data);
        setError('');
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await loginUser({
            email: formData.email,
            password: formData.password
        });

        // Check if the user account is banned
        if (response.status === 'false' && response.message === 'Your account is banned. Please contact support.') {
            setError(response.message);
            return;
        }

        setAuthToken(response.token); 
        localStorage.setItem('token', response.token); 
        setUser(response.user); 
        localStorage.setItem('user', JSON.stringify(response.user)); 
        setValidationErrors({});
        
        if (response.user.user_role === "patient") {
            navigate('./Dashboard'); 
        } else if (response.user.user_role === "admin") {
            navigate('./AdminDashboard');
        }
    } catch (err) {
        if (err.errors) {
            setValidationErrors(err.errors);
        } else {
            setError('Login Failed. Please try again.');
        }
    }
};

  return (
    <div className='flex justify-center items-center min-h-screen w-full h-full background backdrop-blur-2xl'>
      <div className={`wrapper relative w-[420px] h-[450px] bg-transparent border-[2px] border-[rgba(255,255,255,0.1)] rounded-xl text-white flex items-center overflow-hidden transition-height duration-200 ease-in-out ${action === 'active' ? 'h-[45rem] w-[50rem]' : 'h-[450px]'}`}>
        <div className={`form-box login w-full p-10 transition-transform duration-150 ease-in-out ${action === 'active' ? 'translate-x-[-800px] transition-none' : 'translate-x-0'}`}>
          <form onSubmit={handleLogin}>
            <h1 className='text-4xl text-center'>Login</h1>
            <div className='input-box relative w-full h-14 mt-8 mb-0'>
              <input type='email' name='email' placeholder='Email' required className='w-full h-full bg-transparent outline-none border-[2px] border-[rgba(255,255,255,0.1)] rounded-[40px] text-[16px] text-white placeholder:text-white py-5 pr-11 pl-5' value={formData.email} onChange={handleInputChange} />
              <FaEnvelope className='icon absolute right-5 top-2/4 transform -translate-y-1/2 text-base' />
            </div>
            <div className='input-box relative w-full h-14 mt-8 mb-0'>
              <input type='password' name='password' placeholder='Password' required className='w-full h-full bg-transparent outline-none border-[2px] border-[rgba(255,255,255,0.1)] rounded-[40px] text-[16px] text-white placeholder:text-white py-5 pr-11 pl-5' value={formData.password} onChange={handleInputChange} />
              <FaLock className='icon absolute right-5 top-2/4 transform -translate-y-1/2 text-base' />
            </div>

            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

            <div className='remember-forgot flex justify-between text-sm my-5'>
              <label className='mr-1 accent-white'><input type='checkbox' />Remember me</label>
              <a href="#" className='text-white no-underline hover:underline'>Forgot Password?</a>
            </div>

            <button type='submit' className='w-full h-11 bg-white border-none outline-none rounded-[40px] shadow-[0_0_10px_rgba(0,0,0,0.1)] cursor-pointer text-lg text-[#333] font-bold mt-3'>Login</button>

            <div className='register-link text-sm text-center mx-0 mt-5 mb-4'>
              <p> Don't have an account? <a href='#' onClick={registerLink} className='text-white no-underline font-semibold hover:underline'>Register</a></p>
            </div>
          </form>
        </div>

        {/* Registration Form */}
        <div className={`form-box register w-full p-10 absolute transition-transform duration-150 ease-in-out ${action === 'active' ? 'translate-x-0' : 'translate-x-[400px]'}`}>
          <form onSubmit={handleRegister}>
            <h1 className='text-4xl text-center'>Registration</h1>
            <div className='input-group flex gap-4'>
              <div className='input-box relative w-full h-14 mt-8 mb-0'>
                <input type='text' name='username' placeholder='Username' required className='w-full h-full bg-transparent outline-none border-[2px] border-[rgba(255,255,255,0.1)] rounded-[40px] text-[16px] text-white placeholder:text-white py-5 pr-11 pl-5' value={formData.username} onChange={handleInputChange} />
                <FaUser className='icon absolute right-5 top-2/4 transform -translate-y-1/2 text-base' />
                {validationErrors.username && <p className="text-red-500 text-sm">{validationErrors.username[0]}</p>}
              </div>
              <div className='input-box relative w-full h-14 mt-8 mb-0'>
                <input type='email' name='email' placeholder='Email' required className='w-full h-full bg-transparent outline-none border-[2px] border-[rgba(255,255,255,0.1)] rounded-[40px] text-[16px] text-white placeholder:text-white py-5 pr-11 pl-5' value={formData.email} onChange={handleInputChange} />
                <FaEnvelope className='icon absolute right-5 top-2/4 transform -translate-y-1/2 text-base' />
                {validationErrors.email && <p className="text-red-500 text-sm">{validationErrors.email[0]}</p>}
              </div>
            </div>
            <div className='input-group flex gap-4'>
              <div className='input-box relative w-full h-14 mt-8 mb-0'>
                <input type='password' name='password' placeholder='Password' required className='w-full h-full bg-transparent outline-none border-[2px] border-[rgba(255,255,255,0.1)] rounded-[40px] text-[16px] text-white placeholder:text-white py-5 pr-11 pl-5' value={formData.password} onChange={handleInputChange} />
                <FaLock className='icon absolute right-5 top-2/4 transform -translate-y-1/2 text-base' />
                {validationErrors.password && <p className="text-red-500 text-sm">{validationErrors.password[0]}</p>}
              </div>
              <div className='input-box relative w-full h-14 mt-8 mb-0'>
                <input type='password' name='confirmPassword' placeholder='Confirm Password' required className='w-full h-full bg-transparent outline-none border-[2px] border-[rgba(255,255,255,0.1)] rounded-[40px] text-[16px] text-white placeholder:text-white py-5 pr-11 pl-5' value={formData.confirmPassword} onChange={handleInputChange} />
                <FaLock className='icon absolute right-5 top-2/4 transform -translate-y-1/2 text-base' />
              </div>
            </div>
            <div className='input-box relative w-full h-14 mt-8 mb-0'>
              <input type='tel' name='phone_number' placeholder='Phone Number' required className='w-full h-full bg-transparent outline-none border-[2px] border-[rgba(255,255,255,0.1)] rounded-[40px] text-[16px] text-white placeholder:text-white py-5 pr-11 pl-5' value={formData.phone_number} onChange={handleInputChange} />
              <FaPhone className='icon absolute right-5 top-2/4 transform -translate-y-1/2 text-base' />
              {validationErrors.phone_number && <p className="text-red-500 text-sm">{validationErrors.phone_number[0]}</p>}
            </div>
            <div className='input-group flex gap-4'>
              <div className='input-box relative w-full h-14 mt-8 mb-0'>
                <input type='date' name='date_of_birth' placeholder='Date of Birth' required className='w-full h-full bg-transparent outline-none border-[2px] border-[rgba(255,255,255,0.1)] rounded-[40px] text-[16px] text-white placeholder:text-white py-5 pr-11 pl-5' value={formData.date_of_birth} onChange={handleInputChange} />
                <FaCalendarAlt className='icon absolute right-5 top-2/4 transform -translate-y-1/2 text-base' />
                {validationErrors.date_of_birth && <p className="text-red-500 text-sm">{validationErrors.date_of_birth[0]}</p>}
              </div>
              <div className='input-box relative w-full h-14 mt-8 mb-0'>
              <select name='gender' required className='w-full h-[110%] bg-transparent text-white outline-none border-[2px] border-[rgba(255,255,255,0.1)] rounded-[40px] text-[16px] py-5 pr-11 pl-5 appearance-none' value={formData.gender} onChange={handleInputChange}>
                <option className='text-black' value='' disabled>Select Gender</option>
                <option className='text-black' value='male'>Male</option>
                <option className='text-black' value='female'>Female</option>
                <option className='text-black' value='other'>Other</option>
              </select>
                <FaGenderless className='icon absolute right-5 top-2/4 transform -translate-y-1/2 text-base text-white' />
                {validationErrors.gender && <p className="text-red-500 text-sm">{validationErrors.gender[0]}</p>}
              </div>
            </div>
            <div className='input-box relative w-full h-14 mt-8 mb-0'>
              <input type='text' name='identity_card_number' placeholder='Identity Card Number' required className='w-full h-full bg-transparent outline-none border-[2px] border-[rgba(255,255,255,0.1)] rounded-[40px] text-[16px] text-white placeholder:text-white py-5 pr-11 pl-5' value={formData.identity_card_number} onChange={handleInputChange} />
              <FaIdCard className='icon absolute right-5 top-2/4 transform -translate-y-1/2 text-base' />
              {validationErrors.identity_card_number && <p className="text-red-500 text-sm">{validationErrors.identity_card_number[0]}</p>}
            </div>
            <div className='remember-forgot flex justify-between text-sm my-5'>
              <label className='mr-1 accent-white'><input type='checkbox' />I agree to the term & conditions</label>
            </div>

            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            {validationErrors.email && <p className="text-red-500 text-sm mt-4">{validationErrors.email[0]}</p>}
            {validationErrors.identity_card_number && <p className="text-red-500 text-sm mt-4">{validationErrors.identity_card_number[0]}</p>}

            <button type='submit' className='w-full h-11 bg-white border-none outline-none rounded-[40px] shadow-[0_0_10px_rgba(0,0,0,0.1)] cursor-pointer text-lg text-[#333] font-bold mt-3'>Register</button>

            <div className='register-link text-sm text-center mx-0 mt-5 mb-4'>
              <p> Already have an account? <a href='#' className='text-white no-underline font-semibold hover:underline' onClick={loginLink}>Login</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
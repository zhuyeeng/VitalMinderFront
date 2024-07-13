import React, { useState } from 'react';
import { FaEnvelope } from "react-icons/fa";
// import './ForgotPassword.css'; 
import { sendPasswordResetEmail } from './../../lib/axios'; // Adjust the import path as needed

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();
//     try {
//       await sendPasswordResetEmail({ email });
//       setMessage('Password reset email sent successfully.');
//       setError('');
//     } catch (err) {
//       setError('Failed to send password reset email. Please try again.');
//       setMessage('');
//     }
//   };

  return (
    <div className='flex justify-center items-center min-h-screen w-full h-full background backdrop-blur-2xl'>
      <div className='wrapper relative w-[420px] h-[250px] bg-transparent border-[2px] border-[rgba(255,255,255,0.1)] rounded-xl text-white flex items-center overflow-hidden'>
        <div className='form-box forgot-password w-full p-10'>
          <form>
            <h1 className='text-4xl text-center'>Forgot Password</h1>
            <div className='input-box relative w-full h-14 mt-8 mb-0'>
              <input type='email' name='email' placeholder='Email' required className='w-full h-full bg-transparent outline-none border-[2px] border-[rgba(255,255,255,0.1)] rounded-[40px] text-[16px] text-white placeholder:text-white py-5 pr-11 pl-5' value={email} onChange={handleInputChange} />
              <FaEnvelope className='icon absolute right-5 top-2/4 transform -translate-y-1/2 text-base' />
            </div>
            
            {message && <p className="text-green-500 text-sm mt-4">{message}</p>}
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            
            <button type='submit' className='w-full h-11 bg-white border-none outline-none rounded-[40px] shadow-[0_0_10px_rgba(0,0,0,0.1)] cursor-pointer text-lg text-[#333] font-bold mt-3'>Send Reset Email</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

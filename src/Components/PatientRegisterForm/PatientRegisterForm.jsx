import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, setAuthToken } from '../../lib/axios'; // Adjust the path to your axios file
import './PatientRegisterForm.css'; // Ensure this path is correct based on your project structure

const PatientRegisterForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        gender: 'male', // Set a default value for gender
        phoneNumber: '',
        identityCardNumber: ''
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone_number: formData.phoneNumber,
                date_of_birth: formData.dateOfBirth,
                gender: formData.gender,
                user_role: 'patient',
                identity_card_number: formData.identityCardNumber
            });
            setAuthToken(response.token);
            setValidationErrors({});
            setError('');
            navigate('/');
            onClose(); // Close the form after successful registration
        } catch (err) {
            if (err.data) {
                setValidationErrors(err.data);
                setError('');
            } else {
                setError('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-200 rounded-lg shadow-lg p-8 w-full max-w-3xl max-h-screen overflow-y-auto relative">
                <button 
                    className="absolute top-2 right-2 text-gray-700 font-bold"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h1 className="text-2xl font-bold mb-4">Register Patient</h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                            <label className="block text-gray-700" htmlFor="name">Name:</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter the patient's full name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700" htmlFor="email">Email:</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter the patient's email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700" htmlFor="password">Password:</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter a password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700" htmlFor="confirmPassword">Confirm Password:</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm the password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700" htmlFor="dateOfBirth">Date of Birth:</label>
                            <input
                                id="dateOfBirth"
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700" htmlFor="gender">Gender:</label>
                            <select
                                id="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700" htmlFor="phoneNumber">Phone Number:</label>
                            <input
                                id="phoneNumber"
                                type="text"
                                placeholder="Enter the patient's phone number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700" htmlFor="identityCardNumber">Identity Card Number:</label>
                            <input
                                id="identityCardNumber"
                                type="text"
                                placeholder="Enter the patient's ID card number"
                                value={formData.identityCardNumber}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-900" type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PatientRegisterForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, setAuthToken } from '../../lib/axios'; // Adjust the path to your axios file
import './RegisterForm.css';

const RegisterForm = ({ onClose }) => {
    const [userType, setUserType] = useState('doctor');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        gender: 'male', // Set a default value for gender
        phoneNumber: '',
        qualifications: '', // Ensure this is included
        specialization: '',
        yearsOfExperience: '',
        clinicAddress: '',
        assignedArea: '',
        fieldExperience: '',
        identityCardNumber: '',
        certificate: null // Add certificate state
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleUserRoleChange = (role) => {
        setUserType(role);
        setFormData({
            ...formData,
            specialization: '',
            yearsOfExperience: '',
            clinicAddress: '',
            assignedArea: '',
            fieldExperience: ''
        });
    };

    const handleChange = (e) => {
        const { id, value, files } = e.target;
        setFormData({
            ...formData,
            [id]: files ? files[0] : value // Handle file input
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
    
        const payload = new FormData(); // Use FormData for file upload
        payload.append('name', formData.name);
        payload.append('email', formData.email);
        payload.append('password', formData.password);
        payload.append('date_of_birth', formData.dateOfBirth);
        payload.append('gender', formData.gender);
        payload.append('phone_number', formData.phoneNumber);
        payload.append('qualifications', formData.qualifications);
        payload.append('user_role', userType);
        payload.append('identity_card_number', formData.identityCardNumber);
        payload.append('certificate', formData.certificate); // Append certificate
    
        if (userType === 'doctor') {
            payload.append('specialization', formData.specialization);
            payload.append('years_of_experience', formData.yearsOfExperience);
            payload.append('clinic_address', formData.clinicAddress);
        } else if (userType === 'paramedic') {
            payload.append('assigned_area', formData.assignedArea);
            payload.append('field_experience', formData.fieldExperience);
        }
    
        console.log('Payload:', payload); // Debug: Ensure qualifications is included
    
        try {
            const response = await registerUser(payload);
            setAuthToken(response.token);
            setValidationErrors({});
            setError('');
            alert('Register Successfully')
            onClose(); // Close the form after successful registration
        } catch (err) {
            if (err.response && err.response.data) {
                setValidationErrors(err.response.data);
                setError('');
            } else {
                setError('Registration failed. Please try again.');
            }
        }
    };  

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[#EEEDEB] rounded-lg shadow-lg p-5 w-full max-w-3xl max-h-screen overflow-y-auto relative">
                <button 
                    className="absolute top-2 right-2 text-gray-700 font-bold text-4xl"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h1 className="text-2xl font-bold mb-2">Register Form</h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                            <label className="block text-gray-700" htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700" htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700" htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700" htmlFor="dateOfBirth">Date of Birth</label>
                            <input
                                id="dateOfBirth"
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700" htmlFor="gender">Gender</label>
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
                            <label className="block text-gray-700" htmlFor="phoneNumber">Phone Number</label>
                            <input
                                id="phoneNumber"
                                type="text"
                                placeholder="Enter your phone number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700" htmlFor="identityCardNumber">Identity Card Number</label>
                            <input
                                id="identityCardNumber"
                                type="text"
                                placeholder="Enter your ID card number"
                                value={formData.identityCardNumber}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700">Select User Type</label>
                        <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="doctor"
                                    name="userType"
                                    value="doctor"
                                    checked={userType === 'doctor'}
                                    onChange={(e) => handleUserRoleChange(e.target.value)}
                                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                />
                                <label htmlFor="doctor" className="ml-2 block text-gray-700">Doctor</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="paramedic"
                                    name="userType"
                                    value="paramedic"
                                    checked={userType === 'paramedic'}
                                    onChange={(e) => handleUserRoleChange(e.target.value)}
                                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                />
                                <label htmlFor="paramedic" className="ml-2 block text-gray-700">Paramedic Staff</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700" htmlFor="qualifications">Qualifications</label>
                        <input
                            id="qualifications"
                            type="text"
                            placeholder="Enter your qualifications"
                            value={formData.qualifications}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700" htmlFor="certificate">Upload Certificate</label>
                        <input
                            id="certificate"
                            type="file"
                            accept=".pdf"
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    {userType === 'doctor' && (
                        <>
                            <div className="form-group">
                                <label className="block text-gray-700" htmlFor="specialization">Specialization</label>
                                <input
                                    id="specialization"
                                    type="text"
                                    placeholder="Enter your specialization"
                                    value={formData.specialization}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div className="form-group">
                                <label className="block text-gray-700" htmlFor="yearsOfExperience">Years of Experience</label>
                                <input
                                    id="yearsOfExperience"
                                    type="number"
                                    placeholder="Enter your years of experience"
                                    value={formData.yearsOfExperience}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div className="form-group">
                                <label className="block text-gray-700" htmlFor="clinicAddress">Clinic Address</label>
                                <input
                                    id="clinicAddress"
                                    type="text"
                                    placeholder="Enter your clinic address"
                                    value={formData.clinicAddress}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </>
                    )}
                    {userType === 'paramedic' && (
                        <>
                            <div className="form-group">
                                <label className="block text-gray-700" htmlFor="assignedArea">Assigned Area</label>
                                <input
                                    id="assignedArea"
                                    type="text"
                                    placeholder="Enter your assigned area"
                                    value={formData.assignedArea}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div className="form-group">
                                <label className="block text-gray-700" htmlFor="fieldExperience">Field Experience</label>
                                <input
                                    id="fieldExperience"
                                    type="number"
                                    placeholder="Enter your field experience"
                                    value={formData.fieldExperience}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </>
                    )}
                    <div className="flex justify-end">
                        <button class="RegBtn" type="submit"> Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;

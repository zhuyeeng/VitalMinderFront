import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, setAuthToken } from '../../lib/axios'; // Adjust the path to your axios file

const RegisterForm = () => {
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
        identityCardNumber: ''
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
    
        const payload = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            date_of_birth: formData.dateOfBirth,
            gender: formData.gender,
            phone_number: formData.phoneNumber,
            qualifications: formData.qualifications, // Ensure this is included
            user_role: userType,
            identity_card_number: formData.identityCardNumber,
            ...(userType === 'doctor' && {
                specialization: formData.specialization,
                years_of_experience: formData.yearsOfExperience,
                clinic_address: formData.clinicAddress
            }),
            ...(userType === 'paramedic' && {
                assigned_area: formData.assignedArea,
                field_experience: formData.fieldExperience
            })
        };
    
        console.log('Payload:', payload); // Debug: Ensure qualifications is included
    
        try {
            const response = await registerUser(payload);
            setAuthToken(response.token);
            setValidationErrors({});
            setError('');
            navigate('/AdminDashboard');
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
        <div className="w-3/4 h-3/4 bg-orange-300 rounded-2xl p-8">
            <h1 className="text-2xl font-sans mb-4">Register Form</h1>
            <form onSubmit={handleRegister} className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="col-span-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="col-span-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="col-span-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="col-span-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfBirth">
                        Date of Birth
                    </label>
                    <input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="col-span-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                        Gender
                    </label>
                    <select
                        id="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="col-span-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                        Phone Number
                    </label>
                    <input
                        id="phoneNumber"
                        type="text"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="col-span-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="qualification">
                        Qualifications
                    </label>
                    <input
                        id="qualifications" // Ensure the ID matches the state key
                        type="text"
                        value={formData.qualifications} // Ensure the value is mapped correctly
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="col-span-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="identityCardNumber">
                        Identity Card Number
                    </label>
                    <input
                        id="identityCardNumber"
                        type="text"
                        value={formData.identityCardNumber}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Select User Type
                    </label>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="doctor"
                            name="userType"
                            value="doctor"
                            checked={userType === 'doctor'}
                            onChange={(e) => handleUserRoleChange(e.target.value)}
                            className="mr-2"
                        />
                        <label htmlFor="doctor" className="mr-4">Doctor</label>
                        <input
                            type="radio"
                            id="paramedic"
                            name="userType"
                            value="paramedic"
                            checked={userType === 'paramedic'}
                            onChange={(e) => handleUserRoleChange(e.target.value)}
                            className="mr-2"
                        />
                        <label htmlFor="paramedic">Paramedic Staff</label>
                    </div>
                </div>

                {userType === 'doctor' && (
                    <>
                        <div className="col-span-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specialization">
                                Specialization
                            </label>
                            <input
                                id="specialization"
                                type="text"
                                value={formData.specialization}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="yearsOfExperience">
                                Years of Experience
                            </label>
                            <input
                                id="yearsOfExperience"
                                type="number"
                                value={formData.yearsOfExperience}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clinicAddress">
                                Clinic Address
                            </label>
                            <input
                                id="clinicAddress"
                                type="text"
                                value={formData.clinicAddress}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </>
                )}

                {userType === 'paramedic' && (
                    <>
                        <div className="col-span-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignedArea">
                                Assigned Area
                            </label>
                            <input
                                id="assignedArea"
                                type="text"
                                value={formData.assignedArea}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fieldExperience">
                                Field Experience
                            </label>
                            <input
                                id="fieldExperience"
                                type="number"
                                value={formData.fieldExperience}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </>
                )}

                <div className="col-span-2 flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;

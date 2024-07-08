import React, { useState, useEffect } from 'react';

const UpdateModal = ({ staff, onClose }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData({ ...staff });
    }, [staff]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement the update logic here
        console.log('Updated data:', formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Update Staff</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.role === 'doctor' ? formData.doctor_name : formData.paramedic_staff_name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.role === 'doctor' ? formData.doctor_email : formData.paramedic_email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.role === 'doctor' ? formData.doctor_phone_number : formData.paramedic_staff_phone}
                            onChange={handleChange}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.role === 'doctor' ? formData.doctor_date_of_birth : formData.paramedic_date_of_birth}
                            onChange={handleChange}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateModal;

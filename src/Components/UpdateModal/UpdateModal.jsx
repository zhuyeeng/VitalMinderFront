import React, { useState, useEffect } from 'react';
import { updateStaff } from '../../lib/axios'; // Adjust the path as needed

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting form data:', formData); // Log the form data before sending
            const response = await updateStaff(formData.id, formData);
            console.log('Updated data:', response.data);
            onClose();
        } catch (error) {
            console.error('Error updating staff:', error.response?.data || error.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Update Staff</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex mb-4">
                        <div className="w-1/2 pr-2">
                            <label className="block text-gray-700 dark:text-gray-300">Name</label>
                            <input
                                type="text"
                                name={formData.role === 'doctor' ? 'doctor_name' : 'paramedic_staff_name'}
                                value={formData.role === 'doctor' ? formData.doctor_name : formData.paramedic_staff_name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div className="w-1/2 pl-2">
                            <label className="block text-gray-700 dark:text-gray-300">Email</label>
                            <input
                                type="email"
                                name={formData.role === 'doctor' ? 'doctor_email' : 'paramedic_staff_email'}
                                value={formData.role === 'doctor' ? formData.doctor_email : formData.paramedic_staff_email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </div>
                    <div className="flex mb-4">
                        <div className="w-1/2 pr-2">
                            <label className="block text-gray-700 dark:text-gray-300">Phone Number</label>
                            <input
                                type="text"
                                name={formData.role === 'doctor' ? 'doctor_phone_number' : 'paramedic_staff_phone_number'}
                                value={formData.role === 'doctor' ? formData.doctor_phone_number : formData.paramedic_staff_phone_number}
                                onChange={handleChange}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div className="w-1/2 pl-2">
                            <label className="block text-gray-700 dark:text-gray-300">Gender</label>
                            <select
                                name={formData.role === 'doctor' ? 'doctor_gender' : 'paramedic_staff_gender'}
                                value={formData.role === 'doctor' ? formData.doctor_gender : formData.paramedic_staff_gender}
                                onChange={handleChange}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex mb-4">
                        <div className="w-1/2 pr-2">
                            <label className="block text-gray-700 dark:text-gray-300">Date of Birth</label>
                            <input
                                type="date"
                                name={formData.role === 'doctor' ? 'doctor_date_of_birth' : 'paramedic_staff_date_of_birth'}
                                value={formData.role === 'doctor' ? formData.doctor_date_of_birth : formData.paramedic_staff_date_of_birth}
                                onChange={handleChange}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </div>
                    {formData.role === 'doctor' && (
                        <>
                            <div className="flex mb-4">
                                <div className="w-1/2 pr-2">
                                    <label className="block text-gray-700 dark:text-gray-300">Specialization</label>
                                    <input
                                        type="text"
                                        name="specialization"
                                        value={formData.specialization || ''}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div className="w-1/2 pl-2">
                                    <label className="block text-gray-700 dark:text-gray-300">Clinic Address</label>
                                    <input
                                        type="text"
                                        name="clinic_address"
                                        value={formData.clinic_address || ''}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>
                            <div className="flex mb-4">
                                <div className="w-1/2 pr-2">
                                    <label className="block text-gray-700 dark:text-gray-300">Qualifications</label>
                                    <input
                                        type="text"
                                        name="qualifications"
                                        value={formData.qualifications || ''}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div className="w-1/2 pl-2">
                                    <label className="block text-gray-700 dark:text-gray-300">Years of Experience</label>
                                    <input
                                        type="number"
                                        name="years_of_experience"
                                        value={formData.years_of_experience || ''}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    {formData.role === 'paramedic' && (
                        <>
                            <div className="flex mb-4">
                                <div className="w-1/2 pr-2">
                                    <label className="block text-gray-700 dark:text-gray-300">Qualifications</label>
                                    <input
                                        type="text"
                                        name="qualifications"
                                        value={formData.qualifications || ''}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div className="w-1/2 pl-2">
                                    <label className="block text-gray-700 dark:text-gray-300">Assigned Area</label>
                                    <input
                                        type="text"
                                        name="assigned_area"
                                        value={formData.assigned_area || ''}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300">Field Experience</label>
                                <input
                                    type="number"
                                    name="field_experience"
                                    value={formData.field_experience || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                        </>
                    )}
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

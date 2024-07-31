import React, { useState, useEffect } from 'react';
import { updateStaff } from '../../lib/axios'; // Adjust the path as needed

const UpdateModal = ({ staff, onClose }) => {
  const [formData, setFormData] = useState({ details: {}, user: {}, role: '' });

  useEffect(() => {
    if (staff) {
      setFormData({ ...staff });
    }
  }, [staff]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      details: {
        ...prevData.details,
        [name]: value,
      },
      user: {
        ...prevData.user,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { role, details } = formData;
      const payload = {
        ...details,
        email: role === 'doctor' ? details.doctor_email : details.paramedic_staff_email,
        name: role === 'doctor' ? details.doctor_name : details.paramedic_staff_name,
        phone_number: role === 'doctor' ? details.doctor_phone_number : details.paramedic_staff_phone_number,
        gender: role === 'doctor' ? details.doctor_gender : details.paramedic_staff_gender,
        date_of_birth: role === 'doctor' ? details.doctor_date_of_birth : details.paramedic_staff_date_of_birth,
        specialization: details.specialization,
        clinic_address: details.clinic_address,
        qualifications: details.qualifications,
        years_of_experience: details.years_of_experience,
        assigned_area: details.assigned_area,
        field_experience: details.field_experience,
        role: role // Include the role in the payload
      };

      // console.log('Submitting payload:', payload); // Log the payload before sending
      const response = await updateStaff(details.id, payload);
      // console.log('Updated data:', response.data);
      alert('Successfully updated staff information.');
      onClose();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      alert('Error on updating staff details.');
      console.error('Error updating staff:', errorMessage);

      // Check for specific error messages or codes
      if (errorMessage.includes('Duplicate entry')) {
        alert('The username or email you are trying to use is already taken. Please use a different one.');
      } else {
        alert(`An error occurred: ${errorMessage}`);
      }
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
                value={formData.role === 'doctor' ? formData.details?.doctor_name || '' : formData.details?.paramedic_staff_name || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                name={formData.role === 'doctor' ? 'doctor_email' : 'paramedic_staff_email'}
                value={formData.role === 'doctor' ? formData.details?.doctor_email || '' : formData.details?.paramedic_staff_email || ''}
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
                value={formData.role === 'doctor' ? formData.details?.doctor_phone_number || '' : formData.details?.paramedic_staff_phone_number || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700 dark:text-gray-300">Gender</label>
              <select
                name={formData.role === 'doctor' ? 'doctor_gender' : 'paramedic_staff_gender'}
                value={formData.role === 'doctor' ? formData.details?.doctor_gender || '' : formData.details?.paramedic_staff_gender || ''}
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
                value={formData.role === 'doctor' ? formData.details?.doctor_date_of_birth || '' : formData.details?.paramedic_staff_date_of_birth || ''}
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
                    value={formData.details?.specialization || ''}
                    onChange={handleChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <label className="block text-gray-700 dark:text-gray-300">Clinic Address</label>
                  <input
                    type="text"
                    name="clinic_address"
                    value={formData.details?.clinic_address || ''}
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
                    value={formData.details?.qualifications || ''}
                    onChange={handleChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <label className="block text-gray-700 dark:text-gray-300">Years of Experience</label>
                  <input
                    type="number"
                    name="years_of_experience"
                    value={formData.details?.years_of_experience || ''}
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
                    value={formData.details?.qualifications || ''}
                    onChange={handleChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <label className="block text-gray-700 dark:text-gray-300">Assigned Area</label>
                  <input
                    type="text"
                    name="assigned_area"
                    value={formData.details?.assigned_area || ''}
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
                  value={formData.details?.field_experience || ''}
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

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../lib/axios'; // Adjust the path as needed

const AssignDoctorModal = ({ appointment, onSubmit, onCancel }) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [paramedicId, setParamedicId] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosInstance.get('/fetchMedicalStaffWithDetails');
        console.log('Response data:', response.data); // Log the response data
        const doctors = response.data.filter(user => user.user_role === 'doctor');
        console.log('Filtered doctors:', doctors); // Log the filtered doctors
        setDoctors(doctors);
      } catch (error) {
        console.error('Error fetching doctors:', error.response?.data || error.message);
      }
    };

    const fetchParamedicId = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user')); // Retrieve user from local storage
        const response = await axiosInstance.get(`/paramedic-id/${user.id}`);
        setParamedicId(response.data.paramedic_id);
      } catch (error) {
        console.error('Error fetching paramedic ID:', error.response?.data || error.message);
      }
    };

    fetchDoctors();
    fetchParamedicId();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedDoctor, paramedicId);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Assign Doctor</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Doctor</label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.details.id} value={doctor.details.id}>
                  {doctor.username}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Assign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignDoctorModal;

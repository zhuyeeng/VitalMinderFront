import React, { useState, useEffect } from 'react';
import axiosInstance, { addToWaitingList } from '../../lib/axios';

const AppointmentLine = ({ refreshLists }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAcceptedAppointments();
  }, []);

  const fetchAcceptedAppointments = async () => {
    try {
      const response = await axiosInstance.get('/appointments/accepted');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching accepted appointments:', error);
    }
  };

  const handlePutIntoLine = async (appointment) => {
    try {
      const data = {
        appointment_id: appointment.id,
        doctor_id: appointment.doctor_id,
        patient_name: appointment.patient_name,
        patient_id: appointment.patient_id || null,
      };
      await addToWaitingList(data);
      alert('Appointment added to the waiting list successfully!');
      fetchAcceptedAppointments(); // Refresh the list of accepted appointments
      refreshLists(); // Refresh both appointment and waiting list
    } catch (error) {
      console.error('Error adding to waiting list:', error);
      alert('Failed to add to waiting list. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th colSpan="4" className="py-2 px-4 text-center text-gray-700 font-bold">Accepted Appointment</th>
          </tr>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="py-2 px-4 text-left text-gray-600">Appointment Name</th>
            <th className="py-2 px-4 text-left text-gray-600">Patient Name</th>
            <th className="py-2 px-4 text-left text-gray-600">Date & Time</th>
            <th className="py-2 px-4 text-left text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-10 bg-gray-100">No accepted appointments</td>
            </tr>
          ) : (
            appointments.map((appointment) => (
              <tr key={appointment.id} className="border-b border-gray-300">
                <td className="py-2 px-4">{appointment.details || 'N/A'}</td>
                <td className="py-2 px-4">{appointment.patient_name || 'N/A'}</td>
                <td className="py-2 px-4">{new Date(appointment.date).toLocaleString()}</td>
                <td className="py-2 px-4">
                  <button
                    className="bg-gray-200 border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition duration-300"
                    onClick={() => handlePutIntoLine(appointment)}
                  >
                    Put into line
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentLine;

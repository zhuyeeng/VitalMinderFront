import React, { useState, useEffect } from 'react';
import axiosInstance, { addToWaitingList } from './../../lib/axios';

const AppointmentLine = ({ refreshFlag }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAcceptedAppointments();
    const intervalId = setInterval(fetchAcceptedAppointments, 5000); // Fetch data every 5 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [refreshFlag]);

  const fetchAcceptedAppointments = async () => {
    try {
      const response = await axiosInstance.get('/appointments/accepted-paramedic');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching accepted appointments:', error);
      alert('Failed to fetch accepted appointments.');
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
      console.log(data);
      const response = await addToWaitingList(data);
      // console.log('Data pushed into the waiting list:', response);
      alert('Appointment added to the waiting list successfully!');
      // Remove the appointment from the list after successful addition to the waiting list
      setAppointments((prevAppointments) =>
        prevAppointments.filter((item) => item.id !== appointment.id)
      );
    } catch (error) {
      console.error('Error adding to waiting list:', error);
      alert('Failed to add to the waiting list. Please try again.');
    }
  };

  return (
    <div className="p-4 w-full">
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
              <td colSpan="4" className="text-center py-10 bg-gray-100 text-black">No accepted appointments available</td>
            </tr>
          ) : (
            appointments.map((appointment) => (
              <tr key={appointment.id} className="border-b border-gray-300 hover:bg-gray-50 transition duration-300">
                <td className="py-2 px-4 text-black">{appointment.details || 'N/A'}</td>
                <td className="py-2 px-4 text-black">{appointment.patient_name || 'N/A'}</td>
                <td className="py-2 px-4 text-black">{appointment.date}, {appointment.time}</td>
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
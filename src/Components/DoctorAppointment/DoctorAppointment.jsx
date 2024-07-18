import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; 
import { setAuthToken, fetchDoctorId, fetchAppointmentsByDoctorId, storeMedicationReport } from '../../lib/axios'; 
import DoctorProgressNoteModal from '../DoctorProgressNote/DoctorProgressNote';
import 'react-calendar/dist/Calendar.css'; 

const DoctorAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorId, setDoctorId] = useState(null);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setAuthToken(localStorage.getItem('token')); 
      initializeDoctorData(user.id);
    }

    const intervalId = setInterval(() => {
      if (doctorId) {
        fetchAppointments();
      }
    }, 10000); 

    return () => clearInterval(intervalId); 
  }, [doctorId]);

  const initializeDoctorData = async (userId) => {
    try {
      const doctorId = await fetchDoctorId(userId);
      setDoctorId(doctorId);
      fetchAppointments(doctorId);
    } catch (error) {
      console.error('Error initializing doctor data:', error);
      setError('Error initializing doctor data. Please try again.');
    }
  };

  const fetchAppointments = async () => {
    try {
      const appointments = await fetchAppointmentsByDoctorId(doctorId);
      setAppointments(appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError('Error fetching appointments. Please try again.');
    }
  };

  const handleOpenModal = (appointment) => {
    setSelectedAppointment(appointment);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
    setModalOpen(false);
  };

  const handleSaveReport = async (reportData) => {
    try {
      await storeMedicationReport(reportData);
      setAppointments(appointments.filter(appointment => appointment.id !== reportData.appointment_id));
    } catch (error) {
      console.error('Error saving medication report:', error);
      setError('Error saving medication report. Please try again.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 p-4">
      <div className="flex-1 h-full">
        <h2 className="text-2xl font-semibold mb-4">Appointments</h2>
        <div className="w-full bg-gray-400 rounded-lg shadow-lg h-full overflow-x-auto p-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Appointment Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Patient Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date & Time</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100 divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="px-4 py-2 text-gray-900">{appointment.type}</td>
                  <td className="px-4 py-2 text-gray-900">{appointment.patient_name}</td>
                  <td className="px-4 py-2 text-gray-900">{appointment.date} {appointment.time}</td>
                  <td className="px-4 py-2">
                    <button 
                      onClick={() => handleOpenModal(appointment)}
                      className="bg-blue-500 text-white py-1 px-3 rounded">
                      Write Progress Note
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>
      </div>
      <div className="h-full">
        <h2 className="text-2xl font-semibold mb-4">Calendar</h2>
        <div className="w-full bg-white h-full rounded-lg shadow-lg flex items-center justify-center">
          <Calendar
            className="text-black"
            tileContent={({ date, view }) => {
              const appointmentDates = appointments.map((appt) => new Date(appt.date).toDateString());
              if (appointmentDates.includes(date.toDateString())) {
                return <div className="dot"></div>;
              }
            }}
          />
        </div>
      </div>
      <DoctorProgressNoteModal 
        isOpen={modalOpen} 
        onClose={handleCloseModal} 
        appointmentId={selectedAppointment?.id} 
        patientId={selectedAppointment?.patient_id} 
        doctorId={doctorId} 
        onSave={handleSaveReport}
      />
    </div>
  );
};

export default DoctorAppointment;

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { setAuthToken, fetchStaffByUserId, fetchDoctorWaitingList, storeMedicationReport, updateWaitingListStatus } from '../../lib/axios';
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
        fetchWaitingList();
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, [doctorId]);

  const initializeDoctorData = async (userId) => {
    try {
      const doctorData = await fetchStaffByUserId(userId);
      const doctor = doctorData.details.id;
      setDoctorId(doctor);
    } catch (error) {
      console.error('Error initializing doctor data:', error);
      setError('Error initializing doctor data. Please try again.');
    }
  };

  const fetchWaitingList = async () => {
    try {
      const waitingList = await fetchDoctorWaitingList(doctorId);
      setAppointments(waitingList);
      console.log(waitingList);
    } catch (error) {
      console.error('Error fetching waiting list:', error);
      setError('Error fetching waiting list. Please try again.');
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
      await updateWaitingListStatus(reportData.appointment_id, 'pending');
      setAppointments(appointments.filter(appointment => appointment.appointment.id !== reportData.appointment_id));
    } catch (error) {
      console.error('Error saving medication report:', error);
      setError('Error saving medication report. Please try again.');
    }
  };

  const appointmentCounts = appointments.reduce((acc, appt) => {
    const date = new Date(appt.appointment.date).toDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  console.log("Appointment Counts: ", appointmentCounts);

  return (
    <div className="flex flex-col md:flex-row gap-10 p-4">
      <div className="flex-1 h-full">
        <h2 className="text-2xl font-semibold mb-4">Appointments</h2>
        <div className="w-full rounded-lg shadow-lg h-full overflow-x-auto p-4">
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
              {appointments.length > 0 ? (
                appointments.map((waitingListItem) => (
                  <tr key={waitingListItem.id}>
                    <td className="px-4 py-2 text-gray-900">{waitingListItem.appointment.type}</td>
                    <td className="px-4 py-2 text-gray-900">{waitingListItem.patient_name}</td>
                    <td className="px-4 py-2 text-gray-900">{waitingListItem.appointment.date} {waitingListItem.appointment.time}</td>
                    <td className="px-4 py-2">
                      <button 
                        onClick={() => handleOpenModal(waitingListItem.appointment)}
                        className="bg-blue-500 text-white py-1 px-3 rounded">
                        Write Progress Note
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-center text-gray-900">No appointment found</td>
                </tr>
              )}
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
              const dateString = date.toDateString();
              const count = appointmentCounts[dateString];
              return count ? (
                <div className="flex justify-center items-center h-full w-full">
                  <div className="bg-yellow-200 text-black rounded-full h-6 w-6 flex items-center justify-center">
                    {count}
                  </div>
                </div>
              ) : null;
            }}
          />
        </div>
      </div>
      <DoctorProgressNoteModal 
        isOpen={modalOpen} 
        onClose={handleCloseModal} 
        appointmentId={selectedAppointment?.id} 
        patientId={selectedAppointment?.patient_id} 
        patient_name={selectedAppointment?.patient_name}
        doctorId={doctorId} 
        onSave={handleSaveReport}
      />
    </div>
  );
};

export default DoctorAppointment;

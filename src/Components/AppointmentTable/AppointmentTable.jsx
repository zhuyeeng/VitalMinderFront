import React, { useState, useEffect } from 'react';
import axiosInstance from '../../lib/axios';
import RejectFormModal from '../RejectAppointmentForm/RejectAppointmentForm';
import AssignDoctorModal from '../AssignDoctor/AssignDoctor';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [pendingAcceptedAppointment, setPendingAcceptedAppointment] = useState([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await fetchPendingAndAcceptedAppointments();
        setPendingAcceptedAppointment(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const intervalId = setInterval(loadAppointments, 5000); // Fetch data every 5 seconds

    loadAppointments();
    fetchAppointments();

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axiosInstance.get('/appointments', {
        params: { status: ['pending', 'accepted'] },
      });
      if (Array.isArray(response.data)) {
        setAppointments(response.data);
      } else {
        throw new Error('API response is not an array');
      }
    } catch (error) {
      setError(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingAndAcceptedAppointments = async () => {
    try {
      const response = await axiosInstance.get('/appointments/pending-and-accepted');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  const handleAccept = (appointment) => {
    setSelectedAppointment(appointment);
    setShowAssignModal(true);
  };

  const handleAssignSubmit = async (doctorId, paramedicId) => {
    try {
      await axiosInstance.put(`/appointments/status/${selectedAppointment.id}`, {
        status: 'accepted',
        doctor_id: doctorId,
        paramedic_id: paramedicId,
      });
      setShowAssignModal(false);
      fetchAppointments(); // Refresh appointments after accepting
    } catch (error) {
      console.error('Error assigning doctor to appointment:', error.response?.data || error.message);
    }
  };

  const handleReject = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRejectModal(true);
  };

  const handleRejectSubmit = async (reason) => {
    try {
      await axiosInstance.put(`/appointments/status/${selectedAppointment.id}`, {
        status: 'rejected',
        reason: reason,
      });
      setShowRejectModal(false);
      fetchAppointments(); // Refresh appointments after rejecting
    } catch (error) {
      console.error('Error rejecting appointment:', error.response?.data || error.message);
    }
  };

  const handleRejectCancel = () => {
    setShowRejectModal(false);
    setSelectedAppointment(null);
  };

  const handleAssignCancel = () => {
    setShowAssignModal(false);
    setSelectedAppointment(null);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayAppointments = pendingAcceptedAppointment.filter(
        (appointment) => new Date(appointment.date).toDateString() === date.toDateString()
      );
      return (
        <div>
          {dayAppointments.length > 0 && (
            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
              {dayAppointments.length}
            </span>
          )}
        </div>
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row p-4 space-x-4">
      {showRejectModal && (
        <RejectFormModal
          appointment={selectedAppointment}
          onSubmit={handleRejectSubmit}
          onCancel={handleRejectCancel}
        />
      )}
      {showAssignModal && (
        <AssignDoctorModal
          appointment={selectedAppointment}
          onSubmit={handleAssignSubmit}
          onCancel={handleAssignCancel}
        />
      )}
      <div className="w-full lg:w-2/3 flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow-lg min-h-[400px] max-h-[600px] overflow-y-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Appointment Type</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Patient Name</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Date & Time</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Status</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 bg-gray-100">No appointments available</td>
              </tr>
            ) : (
              appointments.map((appointment, index) => (
                <tr key={appointment.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
                  <td className="py-3 px-4 border-b text-black">{appointment.type}</td>
                  <td className="py-3 px-4 border-b text-black">{appointment.patient_name}</td>
                  <td className="py-3 px-4 border-b text-black">{appointment.date}, {appointment.time}</td>
                  <td className="py-3 px-4 border-b text-black">{appointment.status}</td>
                  <td className="py-3 px-4 border-b flex">
                    <button className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600" onClick={() => handleAccept(appointment)}>
                      Accept
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => handleReject(appointment)}>
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="w-full lg:w-1/3 mt-4 lg:mt-0 min-h-[400px]">
        <Calendar onChange={setDate} value={date} tileContent={tileContent} className="border border-gray-200 rounded-lg shadow-lg text-black" />
      </div>
    </div>
  );
};

export default AppointmentTable;

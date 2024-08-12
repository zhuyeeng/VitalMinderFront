import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import './Appointment.css';
import axiosInstance from '../../lib/axios';
import AppointmentModal from '../AppointmentModal/AppointmentModal';
import AppointmentDetails from '../AppointmentDetail/AppointmentDetail';
import { useReminder, ReminderProvider } from '../../contexts/ReminderContext';

const Appointment = () => {
  const [selectedStatus, setSelectedStatus] = useState('Pending');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [isForSelf, setIsForSelf] = useState(true);
  const [userRole, setUserRole] = useState('');
  const [username, setUsername] = useState('');
  const [patientId, setPatientId] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    name: '',
    date: '',
    time: '',
    type: '',
    blood_type: '',
    details: '',
    creator_id: '',
    patient_name: '',
    patient_id: null
  });

  const { reminders, fetchReminders } = useReminder();

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchAppointmentsByUserIdAndPatientId = async (userId, patientId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get('/appointments/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          user_id: userId,
          patient_id: patientId,
        },
      });
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error.response?.data || error.message);
    }
  };
  
  const fetchPatientId = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.id;
    setUserRole(user.user_role);
    setUsername(user.username);
  
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get(`/appointments/patient-id/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const patient = response.data;
      setPatientId(patient.patient.id);
      setPatients(patient);
      setNewAppointment((prevState) => ({
        ...prevState,
        creator_id: userId,
        patient_id: isForSelf ? patientId : null,
        patient_name: isForSelf ? user.username : ''
      }));
      await fetchAppointmentsByUserIdAndPatientId(userId, patientId);
    } catch (error) {
      console.error('Error fetching patient ID:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchPatientId();
  }, [isForSelf]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPatientId();
    }, 10000); 

    return () => clearInterval(interval);
  }, []);

  const handleAppointmentSubmit = async (appointment) => {
    try {
      const response = await axiosInstance.post('/appointments', appointment);
      setAppointments([...appointments, response.data]);
      setIsCreating(false);
      alert('Appointment create successfully.');
    } catch (error) {
      console.error('Error creating appointment:', error.response?.data || error.message);
    }
  };

  const handleUpdateAppointment = async (id, updatedData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.put(`/appointments/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Appointment updated successfully.');
      setAppointments(appointments.map(appt => (appt.id === id ? response.data : appt)));
    } catch (error) {
      alert('Fail to update appointment, please try again.');
      console.error('Error updating appointment:', error.response?.data || error.message);
    }
  };

  // const handleDeleteAppointment = async (id) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     await axiosInstance.delete(`/appointments/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setAppointments(appointments.filter(appt => appt.id !== id));
  //   } catch (error) {
  //     console.error('Error deleting appointment:', error.response?.data || error.message);
  //   }
  // };

  const handleModalChange = (field, value) => {
    setNewAppointment((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleDetailsChange = (field, value) => {
    setSelectedAppointment((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleUpdateAppointment(selectedAppointment.id, selectedAppointment);
      setSelectedAppointment(null);
    } catch (error) {
      console.error('Error updating appointment:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const checkAppointments = () => {
      const now = new Date();
      const nowTime = [now.getHours(), now.getMinutes()];
      const nowDate = now.toISOString().split('T')[0];

      appointments.forEach(appointment => {
        const appointmentTime = appointment.time.split(':').map(Number);
        const appointmentDate = appointment.date;

        if (appointment.status === 'accepted' && 
            appointmentDate === nowDate &&
            appointmentTime[0] === nowTime[0] && 
            appointmentTime[1] === nowTime[1]) {
          console.log('Showing notification for appointment:', appointment);
          showNotification(appointment);
        }
      });
    };

    const interval = setInterval(checkAppointments, 60000); // Check every minute

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [appointments]);

  const showNotification = (appointment) => {
    if (Notification.permission === 'granted') {
      new Notification('Appointment Reminder', {
        body: `You have an appointment: ${appointment.type} at ${appointment.time}`,
        icon: '/path-to-icon/icon.png', // Adjust the path to your icon if you have one
      });
    } else {
      console.log('Notification permission not granted.');
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const statusMatches = appointment.status && appointment.status.toLowerCase() === selectedStatus.toLowerCase();
    const typeMatches = filterType === '' || (appointment.type && appointment.type.toLowerCase().includes(filterType.toLowerCase()));
    const creatorMatches = appointment.creator_id === JSON.parse(localStorage.getItem('user')).id || appointment.patient_id === patientId;
  
    return statusMatches && typeMatches && creatorMatches;
  });

  return (
    <div className='flex flex-col h-screen'>
      <div className='w-full fixed top-0 z-50'>
        <NavBar />
      </div>
      <div className='flex flex-col md:flex-row h-full'>
        <div className='sidebar w-full md:w-[30%] p-4 border-r-2 border-black bg-[#F1F1F1] h-full flex flex-col'>
          <div className='static md:sticky top-0 bg-[#F1F1F1] p-4 mt-12'>
            <div className='flex justify-between mb-4'>
              <button className="boton-elegante static md:relative" onClick={() => setSelectedStatus('Pending')}>Pending</button>
              <button className="boton-elegante static md:relative" onClick={() => setSelectedStatus('Accepted')}>Accepted</button>
              <button className="boton-elegante static md:relative" onClick={() => setSelectedStatus('Rejected')}>Rejected</button>
              <button className="boton-elegante static md:relative" onClick={() => setSelectedStatus('Completed')}>Pass</button>
            </div>
            <div className='flex flex-col md:flex-row justify-between mb-4 gap-1'>
              <button type="button" className="add-button w-full static md:relative md:w-auto mb-2 md:mb-0" onClick={() => setIsCreating(true)}>
                <span className="add-text">Create Appointment</span>
                <span className="add-icon static md:absolute">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" fill="none">
                    <line y2="19" y1="5" x2="12" x1="12"></line>
                    <line y2="12" y1="12" x2="19" x1="5"></line>
                  </svg>
                </span>
              </button>
              <input
                type="text"
                placeholder="Filter box"
                className='p-2 border rounded-md text-black w-full md:w-40'
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              />
            </div>
          </div>
          <div className='overflow-y-auto flex-grow flex flex-row md:flex-col gap-3'>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map(appointment => (
                <div key={appointment.id} className='mb-2 appointment-card max-h-80 bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg'
                  onClick={() => setSelectedAppointment(appointment)}
                >
                  <div className='flex flex-col md:flex-row justify-between'>
                    <div>
                      <h3 className='text-lg font-semibold text-black'>Appointment Type: {appointment.type}</h3>
                    </div>
                    <div className='text-right'>
                      <p className='text-gray-600'>{appointment.date}</p>
                      <p className='text-gray-600'>{appointment.time}</p>
                    </div>
                  </div>
                  <div className='mt-8 flex flex-col md:flex-row justify-between'>
                    <div>
                      <p className='text-gray-600'>Patient Name: {appointment.patient?.username || appointment.patient_name}</p>
                      <p className='text-gray-600'>Doctor: {appointment.doctor?.doctor_name || 'N/A'}</p>
                    </div>
                    <div>
                      <div className='border border-gray-500 bg-[#FF6969] text-black text-lg px-4 py-2 rounded'>{appointment.status.toUpperCase()}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center text-gray-600'>No Appointment Found</div>
            )}
          </div>
        </div>
        <div className='content w-full md:w-3/4 p-4 flex flex-col justify-center items-center'>
          {selectedAppointment && (
            <div className='flex justify-center items-center'>
              <AppointmentDetails
                appointment={selectedAppointment}
                status={selectedAppointment.status}
                onChange={handleDetailsChange}
                onSubmit={handleDetailsSubmit}
              />
            </div>
          )}
        </div>
      </div>
      <AppointmentModal
        show={isCreating}
        onClose={() => setIsCreating(false)}
        patients={patients}
        onSubmit={handleAppointmentSubmit}
        userRole={userRole}
        username={username}
      />
    </div>
  );
};

export default () => (
  <ReminderProvider>
    <Appointment />
  </ReminderProvider>
);

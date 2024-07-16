import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import './Appointment.css';
import axiosInstance from '../../lib/axios';
import AppointmentModal from '../AppointmentModal/AppointmentModal';
import AppointmentDetails from '../AppointmentDetail/AppointmentDetail';

const Appointment = () => {
  const [selectedStatus, setSelectedStatus] = useState('Pending');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [isForSelf, setIsForSelf] = useState(true);
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

  const fetchAppointmentsByUserId = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get(`/appointments/creator/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Fetched appointments:', response.data); // Log fetched appointments
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error.response?.data || error.message);
    }
  };

  const fetchPatientId = async () => {
    const user = JSON.parse(localStorage.getItem('user')); // Parse the user object
    const userId = user.id; // Extract the user ID
    console.log('Fetching patient ID for user ID:', userId); // Debugging output

    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get(`/appointments/patient-id/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const patientId = response.data.patient_id;
      setNewAppointment((prevState) => ({
        ...prevState,
        creator_id: userId,
        patient_id: isForSelf ? patientId : null,
        patient_name: isForSelf ? user.username : ''
      }));
      await fetchAppointmentsByUserId(userId);
    } catch (error) {
      console.error('Error fetching patient ID:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    fetchAppointmentsByUserId(user.id);
    fetchPatientId();
  }, [isForSelf]);

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    try {
      console.log('Creating appointment with:', newAppointment);
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post('/appointments', newAppointment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Created appointment:', response.data);
      setAppointments([...appointments, response.data]);
      setIsCreating(false);
      setNewAppointment({
        name: '',
        date: '',
        time: '',
        type: '',
        blood_type: '',
        details: '',
        creator_id: newAppointment.creator_id,
        patient_id: isForSelf ? newAppointment.patient_id : null,
        patient_name: ''
      });
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
      console.log('Updated appointment:', response.data);
      setAppointments(appointments.map(appt => (appt.id === id ? response.data : appt)));
    } catch (error) {
      console.error('Error updating appointment:', error.response?.data || error.message);
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.delete(`/appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Deleted appointment with ID:', id);
      setAppointments(appointments.filter(appt => appt.id !== id));
    } catch (error) {
      console.error('Error deleting appointment:', error.response?.data || error.message);
    }
  };

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
      setSelectedAppointment(null); // Close the details view after updating
    } catch (error) {
      console.error('Error updating appointment:', error.response?.data || error.message);
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const statusMatches = appointment.status && appointment.status.toLowerCase() === selectedStatus.toLowerCase();
    const typeMatches = filterType === '' || (appointment.type && appointment.type.toLowerCase().includes(filterType.toLowerCase()));
    const creatorMatches = appointment.creator_id === JSON.parse(localStorage.getItem('user')).id;

    console.log(`Filtering appointment ${appointment.id}: statusMatches=${statusMatches}, typeMatches=${typeMatches}, creatorMatches=${creatorMatches}`);
    return statusMatches && typeMatches && creatorMatches;
  });

  console.log('Filtered appointments:', filteredAppointments);

  return (
    <div className='flex flex-col h-screen'>
      {/* Navigation Bar */}
      <div className='w-full fixed top-0'>
        <NavBar />
      </div>
  
      {/* Main Body part */}
      <div className='flex flex-col md:flex-row h-full mt-16'>
        {/* Appointment Sidebar */}
        <div className='w-full md:w-[30%] p-4 border-r-2 border-black bg-[#F1F1F1]'>
          <div className='flex justify-between mb-4 flex-wrap'>
            <button className="boton-elegante" onClick={() => setSelectedStatus('Pending')}>Pending</button>
            <button className="boton-elegante" onClick={() => setSelectedStatus('Accepted')}>Accepted</button>
            <button className="boton-elegante" onClick={() => setSelectedStatus('Rejected')}>Rejected</button>
            <button className="boton-elegante" onClick={() => setSelectedStatus('Pass')}>Pass</button>
          </div>
  
          <div className='flex flex-col md:flex-row justify-between mb-4 gap-1'>
            <button type="button" className="add-button w-full md:w-auto mb-2 md:mb-0" onClick={() => setIsCreating(true)}>
              <span className="add-text">Create Appointment</span>
              <span className="add-icon">
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
  
          <div className='flex flex-nowrap overflow-x-auto md:flex-wrap md:overflow-y-auto'>
            {filteredAppointments.map(appointment => (
              <div key={appointment.id} className='appointment-card bg-white p-4 mb-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg w-64 md:w-full flex-shrink-0 md:flex-shrink'>
                <div className='flex justify-between'>
                  <div>
                    <h3 className='text-lg font-semibold text-black'>Appointment Type: {appointment.type}</h3>
                  </div>
                  <div className='text-right'>
                    <p className='text-gray-600'>{appointment.date}</p>
                    <p className='text-gray-600'>{appointment.time}</p>
                  </div>
                </div>
  
                <div className='mt-8 flex justify-between'>
                  <div>
                    <p className='text-gray-600'>Patient Name: {appointment.patient?.username || appointment.patient_name}</p>
                    <p className='text-gray-600'>Doctor: {appointment.doctor?.doctor_name || 'N/A'}</p>
                  </div>
                  <div>
                    <div className='border border-gray-500 bg-[#FF6969] text-black text-lg px-4 py-2 rounded'>{appointment.status}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Appointment Detail/Create Form Section */}
        <div className='w-full md:w-3/4 p-4 flex justify-center'>
          {selectedAppointment && (
            <AppointmentDetails
              appointment={selectedAppointment}
              onChange={handleDetailsChange}
              onSubmit={handleDetailsSubmit}
            />
          )}
        </div>
      </div>
  
      {/* Create Appointment Modal */}
      <AppointmentModal
        show={isCreating}
        onClose={() => setIsCreating(false)}
        onChange={handleModalChange}
        onSubmit={handleCreateAppointment}
        appointment={newAppointment}
        isForSelf={isForSelf}
        onForSelfChange={setIsForSelf}
      />
    </div>
  );
};

export default Appointment;

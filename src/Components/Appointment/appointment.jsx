import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import './Appointment.css';
import axiosInstance from '../../lib/axios';

const Appointment = () => {
  const [selectedStatus, setSelectedStatus] = useState('Pending');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    name: '',
    date: '',
    time: '',
    type: '',
    blood_type: '',
    details: ''
  });

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get(`/appointments/1`, { // Replace '1' with actual patient ID
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post('/appointments', newAppointment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointments([...appointments, response.data]);
      setIsCreating(false);
      setNewAppointment({
        name: '',
        date: '',
        time: '',
        type: '',
        blood_type: '',
        details: ''
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
      setAppointments(appointments.filter(appt => appt.id !== id));
    } catch (error) {
      console.error('Error deleting appointment:', error.response?.data || error.message);
    }
  };

  const filteredAppointments = appointments.filter(appointment =>
    appointment.status === selectedStatus &&
    (filterType === '' || appointment.type.toLowerCase().includes(filterType.toLowerCase()))
  );
// create a modal for the create appointment function
  return (
    <div className='flex flex-col h-screen'>
      {/* Navigation Bar */}
      <div className='w-full fixed top-0'>
        <NavBar />
      </div>

      {/* Main Body part */}
      <div className='flex flex-row h-full mt-16'>

        {/* Appointment Sidebar */}
        <div className='bg-slate-300 w-1/4 p-4 gap-2'>
          <div className='flex justify-between mb-4'>
            <button className="boton-elegante" onClick={() => setSelectedStatus('Pending')}>Pending</button>
            <button className="boton-elegante" onClick={() => setSelectedStatus('Accepted')}>Accepted</button>
            <button className="boton-elegante" onClick={() => setSelectedStatus('Rejected')}>Rejected</button>
            <button className="boton-elegante" onClick={() => setSelectedStatus('Pass')}>Pass</button>
          </div>

          <div className='flex justify-between mb-4'>
            <button onClick={() => setIsCreating(true)} className='bg-blue-500 text-white px-4 py-2 rounded'>Create Appointment</button>
            <input
              type="text"
              placeholder="Filter box"
              className='p-2 border rounded-md'
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            />
          </div>

          {filteredAppointments.map(appointment => (
            <div key={appointment.id} className='bg-gray-200 p-4 mb-4 rounded-lg shadow-md cursor-pointer' onClick={() => { setSelectedAppointment(appointment); setIsCreating(false); }}>
              <div className='flex justify-between'>
                <div>
                  <h3 className='text-lg font-semibold'>Appointment Type: {appointment.type}</h3>
                </div>
                <div className='text-right'>
                  <p className='text-gray-600'>{appointment.date}</p>
                  <p className='text-gray-600'>{appointment.time}</p>
                </div>
              </div>

              <div className='mt-8 flex justify-between'>
                <div>
                  <p className='text-gray-600'>Patient Name: {appointment.name}</p>
                  <p className='text-gray-600'>Doctor: Name</p>
                </div>
                <div>
                  <div className='border border-gray-500 text-gray-700 px-4 py-2 rounded'>{appointment.status}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Appointment Detail/Create Form Section */}
        <div className='bg-slate-100 w-3/4 p-4'>
          {isCreating ? (
            <div className='bg-white p-4 rounded-lg shadow-md'>
              <h2 className='text-2xl font-semibold mb-4'>Create Appointment Form</h2>
              <form onSubmit={handleCreateAppointment}>
                <div className='mb-4'>
                  <label className='block text-gray-700'>Appointment Name</label>
                  <input
                    type='text'
                    className='w-full p-2 border rounded-md'
                    value={newAppointment.name}
                    onChange={(e) => setNewAppointment({ ...newAppointment, name: e.target.value })}
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700'>Appointment Date</label>
                  <input
                    type='date'
                    className='w-full p-2 border rounded-md'
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700'>Appointment Time</label>
                  <input
                    type='time'
                    className='w-full p-2 border rounded-md'
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700'>Appointment Type</label>
                  <input
                    type='text'
                    className='w-full p-2 border rounded-md'
                    value={newAppointment.type}
                    onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700'>Blood Type</label>
                  <select
                    className='w-full p-2 border rounded-md'
                    value={newAppointment.blood_type}
                    onChange={(e) => setNewAppointment({ ...newAppointment, blood_type: e.target.value })}
                  >
                    <option value=''>Select Blood Type</option>
                    <option value='A+'>A+</option>
                    <option value='A-'>A-</option>
                    <option value='B+'>B+</option>
                    <option value='B-'>B-</option>
                    <option value='AB+'>AB+</option>
                    <option value='AB-'>AB-</option>
                    <option value='O+'>O+</option>
                    <option value='O-'>O-</option>
                  </select>
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700'>Appointment Details</label>
                  <textarea
                    className='w-full p-2 border rounded-md'
                    value={newAppointment.details}
                    onChange={(e) => setNewAppointment({ ...newAppointment, details: e.target.value })}
                  ></textarea>
                </div>
                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md'>Create</button>
              </form>
            </div>
          ) : (
            selectedAppointment && (
              <div className='bg-white p-4 rounded-lg shadow-md'>
                <h2 className='text-2xl font-semibold mb-4'>Appointment Details</h2>
                <p className='mb-2'><strong>Name:</strong> {selectedAppointment.name}</p>
                <p className='mb-2'><strong>Date:</strong> {selectedAppointment.date}</p>
                <p className='mb-2'><strong>Time:</strong> {selectedAppointment.time}</p>
                <p className='mb-2'><strong>Type:</strong> {selectedAppointment.type}</p>
                <p className='mb-2'><strong>Blood Type:</strong> {selectedAppointment.blood_type}</p>
                <p className='mb-2'><strong>Status:</strong> <span className={`px-2 py-1 rounded ${selectedAppointment.status === 'Pending' ? 'bg-yellow-500' : selectedAppointment.status === 'Accepted' ? 'bg-green-500' : selectedAppointment.status === 'Rejected' ? 'bg-red-500' : 'bg-blue-500'}`}>{selectedAppointment.status}</span></p>
                <button onClick={() => handleDeleteAppointment(selectedAppointment.id)} className='bg-red-500 text-white px-4 py-2 rounded-md'>Delete</button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointment;

import React, { useState, useEffect } from 'react';
import { useReminder } from '../../contexts/ReminderContext';
import axiosInstance from '../../lib/axios';
import NavBar from '../NavBar/NavBar';
import ReminderModal from '../ReminderModal/ReminderModal';
import './Reminder.css';

const Reminder = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [editableReminder, setEditableReminder] = useState(null);
  const [isCreator, setIsCreator] = useState(false);

  const { reminders, fetchReminders } = useReminder();

  useEffect(() => {
    // Fetch reminders when the component mounts
    fetchReminders();
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Call fetchReminders after closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    fetchReminders();
  };

  const handleReminderClick = async (id) => {
    try {
      const user = localStorage.getItem('user');
      const parsedUser = JSON.parse(user);
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get(`/fetch-reminder/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedReminder(response.data);
      setIsCreator(response.data.user.id === parsedUser.id);
      setEditableReminder(response.data);
      console.log('Selected reminder:', response.data); // Log selected reminder
    } catch (error) {
      console.error('Error fetching reminder:', error.response?.data || error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableReminder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateReminder = async () => {
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.put(`/update-reminder/${editableReminder.id}`, editableReminder, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchReminders(); // Fetch reminders after update
      alert('Reminder updated successfully');
    } catch (error) {
      console.error('Error updating reminder:', error.response?.data || error.message);
    }
  };

  const handleDeleteReminder = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.delete(`/delete-reminder/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchReminders();
      setSelectedReminder(null);
      alert('Reminder deleted successfully');
    } catch (error) {
      console.error('Error deleting reminder:', error.response?.data || error.message);
    }
  };

  return (
    <div className='flex flex-col h-screen'>
      <div className='w-full fixed top-0'>
        <NavBar />
      </div>
      
      <div className='flex flex-row h-full mt-16'>
        <div className='w-1/4 p-4 overflow-y-auto border-r-2 border-black bg-[#F1F1F1]'>
          <div className='w-full h-full'>
            {reminders.map((reminder) => (
              <div 
                key={reminder.id} 
                className='p-4 mb-2 flex justify-between items-center cursor-pointer bg-white shadow-md rounded-md hover:bg-gray-100 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg' 
                onClick={() => handleReminderClick(reminder.id)}
              >
                <div>
                  <p className='font-bold text-xl text-black'>{reminder.reminder_name}</p>
                  <small className='text-gray-500 text-sm'>Created By: {reminder.user?.username || 'Unknown'}</small>
                </div>
                <div className='text-gray-500 text-sm text-right'>
                  <p>{new Date(reminder.created_at).toLocaleDateString()}</p>
                  <p>{new Date(reminder.created_at).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className='flex-1 flex items-center justify-center'>
          {selectedReminder ? (
            <div className='bg-gray-100 p-8 rounded-lg shadow-lg w-1/2 text-black'>
              {isCreator ? (
                <div>
                  <div className='flex flex-col mb-4'>
                    <label className='mb-2 font-semibold'>Reminder Name:</label>
                    <input
                      type="text"
                      name="reminder_name"
                      value={editableReminder.reminder_name}
                      onChange={handleInputChange}
                      placeholder="Reminder Name"
                      className='p-2 rounded-md border border-gray-300 text-black'
                    />
                  </div>
                  <div className='flex flex-col mb-4'>
                    <label className='mb-2 font-semibold'>Medication Type:</label>
                    <input
                      type="text"
                      name="medication_types"
                      value={editableReminder.medication_types}
                      onChange={handleInputChange}
                      placeholder="Medication Types"
                      className='p-2 rounded-md border border-gray-300 text-black'
                    />
                  </div>
                  <div className='flex flex-col mb-4'>
                    <label className='mb-2 font-semibold'>Number Of Pills:</label>
                    <input
                      type="text"
                      name="pills_number"
                      value={editableReminder.pills_number}
                      onChange={handleInputChange}
                      placeholder="Pills Number"
                      className='p-2 rounded-md border border-gray-300 text-black'
                    />
                  </div>
                  <div className='flex flex-col mb-4'>
                    <label className='mb-2 font-semibold'>Time:</label>
                    <input
                      type="time"
                      name="time"
                      value={editableReminder.time}
                      onChange={handleInputChange}
                      placeholder="Time"
                      className='p-2 rounded-md border border-gray-300 text-black'
                    />
                  </div>
                  <div className='flex flex-col mb-4'>
                    <label className='mb-2 font-semibold'>Frequency:</label>
                    <input
                      type="text"
                      name="frequency"
                      value={editableReminder.frequency}
                      onChange={handleInputChange}
                      placeholder="Frequency"
                      className='p-2 rounded-md border border-gray-300 text-black'
                    />
                  </div>
                  <div className='flex flex-col mb-4'>
                    <label className='mb-2 font-semibold'>Instructions:</label>
                    <input
                      type="text"
                      name="instructions"
                      value={editableReminder.instructions}
                      onChange={handleInputChange}
                      placeholder="Instructions"
                      className='p-2 rounded-md border border-gray-300 text-black'
                    />
                  </div>
                  <div className='flex flex-col mb-4'>
                    <label className='mb-2 font-semibold'>Side Effects:</label>
                    <input
                      type="text"
                      name="side_effects"
                      value={editableReminder.side_effects}
                      onChange={handleInputChange}
                      placeholder="Side Effects"
                      className='p-2 rounded-md border border-gray-300 text-black'
                    />
                  </div>
                  <div className='flex justify-between'>
                    <button className="update-btn" onClick={handleUpdateReminder}>Update</button>
                    <button id="btn" onClick={() => handleDeleteReminder(editableReminder.id)}><span className="text">Delete</span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className='text-2xl font-bold mb-4 text-gray-700'>{selectedReminder.reminder_name}</h2>
                  <p className='mb-2'><span className='font-semibold'>Patient Name:</span> {selectedReminder.patient?.username || 'Unknown'}</p>
                  <p className='mb-2'><span className='font-semibold'>Created By:</span> {selectedReminder.user?.username || 'Unknown'}</p>
                  <p className='mb-2'><span className='font-semibold'>Medication Types:</span> {selectedReminder.medication_types}</p>
                  <p className='mb-2'><span className='font-semibold'>Pills Number:</span> {selectedReminder.pills_number}</p>
                  <p className='mb-2'><span className='font-semibold'>Time:</span> {selectedReminder.time}</p>
                  <p className='mb-2'><span className='font-semibold'>Frequency:</span> {selectedReminder.frequency}</p>
                  <p className='mb-2'><span className='font-semibold'>Instructions:</span> {selectedReminder.instructions}</p>
                  <p className='mb-4'><span className='font-semibold'>Side Effects:</span> {selectedReminder.side_effects}</p>
                  <div className='flex justify-end'>
                    <button id="btn" onClick={() => handleDeleteReminder(editableReminder.id)}><span className="text">Delete</span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className='text-gray-500'>Select a reminder to view details</p>
          )}
        </div>
        
        <div className='fixed top-20 right-11'>
          <button className="icon-btn add-btn" onClick={handleOpenModal}>
            <div className="add-icon"></div>
            <div className="btn-txt text-black">Add Reminder</div>
          </button>
        </div>
      </div>

      <ReminderModal 
        showModal={showModal} 
        handleClose={handleCloseModal} 
      />
    </div>
  );
}

export default Reminder;

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../lib/axios'; // Ensure you have the axios instance configured

const ReminderModal = ({ showModal, handleClose }) => {
  const [reminderData, setReminderData] = useState({
    reminder_name: '',
    medication_types: '',
    pills_number: '',
    time: '',
    frequency: '',
    instructions: '',
    side_effects: '',
  });
  const [userRole, setUserRole] = useState();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      if(parsedUser.user_role == "patient"){
        setUserId(parsedUser.id);
        setUserRole(parsedUser.user_role);
      }
    }
  }, []);

  if (!showModal) return null;

  const handleChange = (e) => {
    setReminderData({ ...reminderData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(userRole == "patient"){
        const response = await axiosInstance.post('/add-reminder', {
          ...reminderData,
          created_by: userId
        });
        // console.log('Reminder created:', response.data);
        alert("Reminder Create Successfully.");
        handleClose();
      }
    } catch (error) {
      console.error('Error creating reminder:', error.response?.data || error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
      <div className="w-96 bg-indigo-50 rounded shadow p-5 relative">
        <form className="text-indigo-500" onSubmit={handleSubmit}>
          <fieldset className="border-4 border-dotted border-indigo-500 p-5">
            <legend className="px-2 italic -mx-2">Create Reminder</legend>
            <button 
              onClick={handleClose} 
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-3 py-1">
              X
            </button>
            <label className="block text-xs font-bold after:content-['*'] after:text-red-400 mt-4" htmlFor="reminder_name">Reminder Name</label>
            <input 
              className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500 text-black" 
              type="text" 
              name="reminder_name" 
              value={reminderData.reminder_name} 
              onChange={handleChange} 
              placeholder="Reminder Name" 
              required 
            />
            
            <label className="block text-xs font-bold after:content-['*'] after:text-red-400 mt-4" htmlFor="medication_types">Medication Types</label>
            <input 
              className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500 text-black" 
              type="text" 
              name="medication_types" 
              value={reminderData.medication_types} 
              onChange={handleChange} 
              placeholder="Medication Types" 
              required 
            />
            
            <label className="block text-xs font-bold after:content-['*'] after:text-red-400 mt-4" htmlFor="pills_number">Pills Number</label>
            <input 
              className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500 text-black" 
              type="text" 
              name="pills_number" 
              value={reminderData.pills_number} 
              onChange={handleChange} 
              placeholder="Pills Number" 
              required 
            />
            
            <label className="block text-xs font-bold after:content-['*'] after:text-red-400 mt-4" htmlFor="time">Time</label>
            <input 
              className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500 text-black" 
              type="time" 
              name="time" 
              value={reminderData.time} 
              onChange={handleChange} 
              required 
            />
            
            <label className="block text-xs font-bold after:content-['*'] after:text-red-400 mt-4" htmlFor="frequency">Frequency</label>
            <input 
              className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500 text-black" 
              type="text" 
              name="frequency" 
              value={reminderData.frequency} 
              onChange={handleChange} 
              placeholder="Frequency" 
              required 
            />
            
            <label className="block text-xs font-bold mt-4" htmlFor="instructions">Instructions</label>
            <input 
              className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500 text-black" 
              type="text" 
              name="instructions" 
              value={reminderData.instructions} 
              onChange={handleChange} 
              placeholder="Instructions" 
            />
            
            <label className="block text-xs font-bold mt-4" htmlFor="side_effects">Side Effects</label>
            <input 
              className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500 text-black" 
              type="text" 
              name="side_effects" 
              value={reminderData.side_effects} 
              onChange={handleChange} 
              placeholder="Side Effects" 
            />
            
            <button type="submit" className="w-full rounded bg-indigo-500 text-indigo-50 p-2 text-center font-bold hover:bg-indigo-400 mt-4">Create</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default ReminderModal;

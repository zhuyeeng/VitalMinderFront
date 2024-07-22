import React, { useState } from 'react';
import { saveSchedule } from '../../lib/axios'; // Ensure the path matches your project structure

const ArrangeScheduleModal = ({ isOpen, onClose, staffId, userRole }) => {
  const [schedule, setSchedule] = useState({
    monday_start: '',
    monday_end: '',
    tuesday_start: '',
    tuesday_end: '',
    wednesday_start: '',
    wednesday_end: '',
    thursday_start: '',
    thursday_end: '',
    friday_start: '',
    friday_end: '',
    saturday_start: '',
    saturday_end: '',
    sunday_start: '',
    sunday_end: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule({
      ...schedule,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      console.log("schedule: ", schedule);
      console.log("staffId:", staffId);
      console.log("userRole:", userRole); // Log userRole to ensure it matches backend expectations

      // Use the saveSchedule function from the axios instance
      const response = await saveSchedule(userRole, staffId, schedule);

      console.log('Schedule saved successfully:', response);
      // Optionally, handle UI updates or notifications
    } catch (error) {
      console.error('Failed to save schedule:', error);
      // Optionally, handle the error, e.g., show a notification to the user
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Schedule Your Working Time</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div></div>
          <div className="text-center font-semibold">Start Time</div>
          <div className="text-center font-semibold">End Time</div>
          {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
            <React.Fragment key={day}>
              <div className="capitalize">{day}:</div>
              <input
                type="time"
                name={`${day}_start`}
                value={schedule[`${day}_start`]}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
              <input
                type="time"
                name={`${day}_end`}
                value={schedule[`${day}_end`]}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            className="py-2 px-6 bg-blue-500 text-white rounded"
            onClick={handleSave}
          >
            Save
          </button>
          <button onClick={onClose} className="ml-4 py-2 px-6 bg-gray-300 text-black rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ArrangeScheduleModal;

import React, { useState, useEffect } from 'react';
import { fetchStaffSchedule, setStaffSchedule } from '../../lib/axios';

const ScheduleModal = ({ isOpen, onClose, staffId, isDoctor }) => {
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
    sunday_end: '',
  });
  const [staffInfo, setStaffInfo] = useState({
    name: '',
    email: '',
    phone_number: '',
  });

  useEffect(() => {
    const getSchedule = async () => {
      if (staffId && isOpen) {
        try {
          const scheduleData = await fetchStaffSchedule(staffId, isDoctor);
          setSchedule(scheduleData.schedule);
          setStaffInfo(scheduleData.staffInfo);
        } catch (error) {
          console.error('Error fetching schedule:', error);
        }
      }
    };
    getSchedule();
  }, [staffId, isDoctor, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule({ ...schedule, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setStaffSchedule(staffId, isDoctor, schedule);
      onClose();
    } catch (error) {
      console.error('Error setting schedule:', error);
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 relative z-10 max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-4">Staff Schedule</h2>
        <div className="mb-4">
          <p><strong>Doctor Name:</strong> {staffInfo.name}</p>
          <p><strong>Doctor Email:</strong> {staffInfo.email}</p>
          <p><strong>Doctor Phone Number:</strong> {staffInfo.phone_number}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <table className="min-w-full bg-white border border-gray-200 mb-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Date</th>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <th key={day} className="py-2 px-4 border-b">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">{staffInfo.name}</td>
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                  <td key={day} className="py-2 px-4 border-b">
                    <input
                      type="time"
                      name={`${day}_start`}
                      value={schedule[`${day}_start`]}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-2 py-1 w-full mb-1"
                    />
                    <input
                      type="time"
                      name={`${day}_end`}
                      value={schedule[`${day}_end`]}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="py-2 px-4 bg-gray-500 text-white rounded"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded"
            >
              Save Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleModal;

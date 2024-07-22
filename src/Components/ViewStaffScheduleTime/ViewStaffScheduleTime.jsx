import React, { useState, useEffect } from 'react';
import { fetchStaffSchedule } from '../../lib/axios'; // Ensure the path matches your project structure

const ScheduleTimeModal = ({ isOpen, onClose, selectedStaff, role }) => {
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

  useEffect(() => {
    if (isOpen && selectedStaff && role) {
      const staffId = selectedStaff.details.id; // Use the id from details

      console.log(staffId);

      if (staffId) {
        fetchStaffSchedule(staffId, role)
          .then(scheduleData => {
            if (scheduleData) {
              setSchedule(scheduleData);
            } else {
              console.error('No schedule data found');
            }
          })
          .catch(error => {
            console.error('Error fetching schedule:', error);
          });
      } else {
        console.error('Selected staff does not have an id');
      }
    }
  }, [isOpen, selectedStaff, role]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 relative z-10 max-w-4xl w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Staff Schedule</h2>
        <div className="mb-4">
          <p><strong>Staff Name:</strong> {selectedStaff.details.doctor_name || selectedStaff.details.paramedic_staff_name}</p>
          <p><strong>Staff Email:</strong> {selectedStaff.details.doctor_email || selectedStaff.details.paramedic_staff_email}</p>
          <p><strong>Staff Phone Number:</strong> {selectedStaff.details.doctor_phone_number || selectedStaff.details.paramedic_staff_phone_number}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 mb-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Day</th>
                <th className="py-2 px-4 border-b">Start Time</th>
                <th className="py-2 px-4 border-b">End Time</th>
              </tr>
            </thead>
            <tbody>
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                <tr key={day}>
                  <td className="py-2 px-4 border-b capitalize">{day}</td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="time"
                      name={`${day}_start`}
                      value={schedule[`${day}_start`] || ''}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      readOnly
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="time"
                      name={`${day}_end`}
                      value={schedule[`${day}_end`] || ''}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      readOnly
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="py-2 px-4 bg-gray-500 text-white rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTimeModal;

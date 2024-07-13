import React from 'react';
import './AppointmentDetail.css';

const AppointmentDetails = ({ appointment, onChange, onSubmit }) => {
  if (!appointment) return null;

  return (
    <div className="bg-[#EEEDEB] p-5 rounded-l-xl shadow-lg w-full max-w-2xl mx-auto my-auto">
      <h2 className="text-3xl font-semibold mb-6 text-black">Appointment Details</h2>
      <form onSubmit={onSubmit}>
        <div className="flex flex-row gap-5 mb-4">
          <div className="w-1/2">
            <label className="block text-black font-medium">Created By:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-black"
              value={appointment.creator?.username || ''}
              disabled
            />
          </div>
          <div className="w-1/2">
            <label className="block text-black font-medium">Patient Name:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md text-black"
              value={appointment.patient_name}
              onChange={(e) => onChange('patient_name', e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row gap-5 mb-4">
          <div className="w-1/2">
            <label className="block text-black font-medium">Date:</label>
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-black"
              value={appointment.date}
              disabled
            />
          </div>
          <div className="w-1/2">
            <label className="block text-black font-medium">Time:</label>
            <input
              type="time"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-black"
              value={appointment.time}
              disabled
            />
          </div>
        </div>
        <div className="flex flex-row gap-5 mb-4">
          <div className="w-1/2">
            <label className="block text-black font-medium">Type:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md text-black"
              value={appointment.type}
              onChange={(e) => onChange('type', e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-black font-medium">Blood Type:</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md text-black"
              value={appointment.blood_type}
              onChange={(e) => onChange('blood_type', e.target.value)}
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-black font-medium">Details:</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md text-black"
            value={appointment.details}
            onChange={(e) => onChange('details', e.target.value)}
          ></textarea>
        </div>
        {appointment.reason && (
          <div className="mb-4">
            <label className="block text-black font-medium">Reason:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md text-black"
              value={appointment.reason}
              onChange={(e) => onChange('reason', e.target.value)}
            />
          </div>
        )}
        {appointment.doctor && (
          <div className="mb-4">
            <label className="block text-black font-medium">Doctor:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-black"
              value={appointment.doctor?.doctor_name || ''}
              disabled
            />
          </div>
        )}
        <div className="flex justify-end">
          <button type="submit" className="update-btn">Update</button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentDetails;

import React from 'react';

const AppointmentModal = ({ show, onClose, onChange, onSubmit, appointment }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">Create Appointment Form</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Appointment Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={appointment.name}
              onChange={(e) => onChange('name', e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Appointment Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded-md"
              value={appointment.date}
              onChange={(e) => onChange('date', e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Appointment Time</label>
            <input
              type="time"
              className="w-full p-2 border rounded-md"
              value={appointment.time}
              onChange={(e) => onChange('time', e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Appointment Type</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={appointment.type}
              onChange={(e) => onChange('type', e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Blood Type</label>
            <select
              className="w-full p-2 border rounded-md"
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
          <div className="mb-4">
            <label className="block text-gray-700">Appointment Details</label>
            <textarea
              className="w-full p-2 border rounded-md"
              value={appointment.details}
              onChange={(e) => onChange('details', e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;

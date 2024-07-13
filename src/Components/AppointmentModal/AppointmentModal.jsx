import React from 'react';

const AppointmentModal = ({ show, onClose, onChange, onSubmit, appointment, isForSelf, onForSelfChange }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#EEEDEB] p-6 rounded-lg shadow-lg relative w-1/2">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-black">Create Appointment Form</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Appointment For</label>
            <div className="flex items-center">
              <input
                type="radio"
                id="forSelf"
                name="forSelf"
                value="self"
                checked={isForSelf}
                onChange={() => onForSelfChange(true)}
              />
              <label htmlFor="forSelf" className="ml-2 text-black">Myself</label>
              <input
                type="radio"
                id="forOther"
                name="forSelf"
                value="other"
                checked={!isForSelf}
                onChange={() => onForSelfChange(false)}
                className="ml-4"
              />
              <label htmlFor="forOther" className="ml-2 text-black">Someone Else</label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-xl">Patient Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={appointment.patient_name}
              onChange={(e) => onChange('patient_name', e.target.value)}
              disabled={isForSelf}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-xl">Appointment Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={appointment.name}
              onChange={(e) => onChange('name', e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-xl">Appointment Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded-md"
              value={appointment.date}
              onChange={(e) => onChange('date', e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-xl">Appointment Time</label>
            <input
              type="time"
              className="w-full p-2 border rounded-md"
              value={appointment.time}
              onChange={(e) => onChange('time', e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-xl">Appointment Type</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={appointment.type}
              onChange={(e) => onChange('type', e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-xl">Blood Type</label>
            <select
              className="w-full p-2 border rounded-md"
              value={appointment.blood_type}
              onChange={(e) => onChange('blood_type', e.target.value)}
            >
              <option value="" className='text-black'>Select Blood Type</option>
              <option value="A+" className='text-black'>A+</option>
              <option value="A-" className='text-black'>A-</option>
              <option value="B+" className='text-black'>B+</option>
              <option value="B-" className='text-black'>B-</option>
              <option value="AB+" className='text-black'>AB+</option>
              <option value="AB-" className='text-black'>AB-</option>
              <option value="O+" className='text-black'>O+</option>
              <option value="O-" className='text-black'>O-</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-xl">Appointment Details</label>
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

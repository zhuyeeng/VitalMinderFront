import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

const DoctorDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Appointments</h2>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200">Appointment Name</th>
                  <th className="py-2 px-4 border-b border-gray-200">Patient Name</th>
                  <th className="py-2 px-4 border-b border-gray-200">Date & Time</th>
                  <th className="py-2 px-4 border-b border-gray-200">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array(8).fill().map((_, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-gray-200">Appointment Name</td>
                    <td className="py-2 px-4 border-b border-gray-200">Patient Name</td>
                    <td className="py-2 px-4 border-b border-gray-200">Date & Time</td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <button className="bg-blue-500 text-white py-1 px-3 rounded">Write Progress Note</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Calendar</h2>
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              Calendar
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;

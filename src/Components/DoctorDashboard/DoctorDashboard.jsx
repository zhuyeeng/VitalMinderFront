import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const DoctorDashboard = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={`${isToggled ? 'w-1/6' : 'w-20'} transition-all duration-500`}>
        <Sidebar onToggle={handleToggle} />
      </div>
      <div className={`flex-1 flex flex-col gap-10 p-4 transition-all duration-500 overflow-y-auto ${isToggled ? '' : 'items-center justify-center'}`}>
        <div className={`w-full flex flex-col md:flex-row gap-10 ${isToggled ? '' : 'items-center justify-center'}`}>
          <div className="flex-1 h-full">
            <h2 className="text-2xl font-semibold mb-4">Appointments</h2>
            <div className="w-full bg-white rounded-lg shadow-lg h-full">
              <table className="min-w-full h-full divide-y divide-gray-200">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Appointment Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Patient Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date & Time</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-100 divide-y divide-gray-200 h-full">
                  {Array(8).fill().map((_, index) => (
                    <tr key={index} className="h-full">
                      <td className="px-4 py-2 text-gray-900">Appointment Name</td>
                      <td className="px-4 py-2 text-gray-900">Patient Name</td>
                      <td className="px-4 py-2 text-gray-900">Date & Time</td>
                      <td className="px-4 py-2">
                        <button className="bg-blue-500 text-white py-1 px-3 rounded">Write Progress Note</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex-1 h-full">
            <h2 className="text-2xl font-semibold mb-4">Calendar</h2>
            <div className="w-full bg-gray-200 h-full rounded-lg shadow-lg flex items-center justify-center">
              Calendar
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;

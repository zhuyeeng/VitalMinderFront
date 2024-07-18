import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const CheckPatient = () => {
  const [view, setView] = useState('appointments');
  const appointments = [
    { name: 'Appointment 1', type: 'Type 1', dateTime: 'Date & Time' },
    { name: 'Appointment 2', type: 'Type 2', dateTime: 'Date & Time' },
    { name: 'Appointment 3', type: 'Type 3', dateTime: 'Date & Time' },
    // Add more appointments as needed
  ];

  const reports = [
    { name: 'Report 1', type: 'Type A', date: 'Date' },
    { name: 'Report 2', type: 'Type B', date: 'Date' },
    { name: 'Report 3', type: 'Type C', date: 'Date' },
    // Add more reports as needed
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Patient Name: [Patient Name]</h1>
        </div>
        <div className="flex justify-end mb-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="appointments"
              name="view"
              value="appointments"
              checked={view === 'appointments'}
              onChange={() => setView('appointments')}
              className="mr-2"
            />
            <label htmlFor="appointments" className="mr-4">Appointments</label>
            <input
              type="radio"
              id="reports"
              name="view"
              value="reports"
              checked={view === 'reports'}
              onChange={() => setView('reports')}
              className="mr-2"
            />
            <label htmlFor="reports">Reports</label>
          </div>
        </div>
        <div className="overflow-x-auto">
          {view === 'appointments' ? (
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full bg-gray-200">
                  <th className="py-2 px-4">Appointment Name</th>
                  <th className="py-2 px-4">Appointment Type</th>
                  <th className="py-2 px-4">Date & Time</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{appointment.name}</td>
                    <td className="py-2 px-4">{appointment.type}</td>
                    <td className="py-2 px-4">{appointment.dateTime}</td>
                    <td className="py-2 px-4">
                      <button className="bg-blue-500 text-white py-1 px-3 rounded">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full bg-gray-200">
                  <th className="py-2 px-4">Report Name</th>
                  <th className="py-2 px-4">Report Type</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{report.name}</td>
                    <td className="py-2 px-4">{report.type}</td>
                    <td className="py-2 px-4">{report.date}</td>
                    <td className="py-2 px-4">
                      <button className="bg-blue-500 text-white py-1 px-3 rounded">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckPatient;

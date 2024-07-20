// DoctorList.js
import React, { useState, useEffect } from 'react';
import { fetchDoctors } from '../../lib/axios'; // Adjust the path as necessary
import Sidebar from '../Sidebar/Sidebar';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctorsData();
  }, []);

  const fetchDoctorsData = async () => {
    try {
      const data = await fetchDoctors();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-5">Doctor List</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Doctor Name</th>
              <th className="py-2 px-4 border-b">Doctor Email</th>
              <th className="py-2 px-4 border-b">Doctor Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{doctor.doctor_name}</td>
                <td className="py-2 px-4 border-b">{doctor.doctor_email}</td>
                <td className="py-2 px-4 border-b">{doctor.doctor_phone_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorList;

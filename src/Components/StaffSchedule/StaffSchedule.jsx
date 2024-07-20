import React, { useState, useEffect } from 'react';
import { fetchAllStaffSchedules } from '../../lib/axios';
import ScheduleModal from '../ScheduleModal/ScheduleModal';
import Sidebar from '../Sidebar/Sidebar';

const StaffScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getAllSchedules = async () => {
      try {
        const schedulesData = await fetchAllStaffSchedules();
        setSchedules(schedulesData);
      } catch (error) {
        console.error('Error fetching all schedules:', error);
      }
    };
    getAllSchedules();
  }, []);

  const openModal = (staffId, isDoctor) => {
    setSelectedStaff(staffId);
    setIsDoctor(isDoctor);
    setIsModalOpen(true);
  };

  const filteredSchedules = schedules.filter(schedule =>
    (schedule.doctor ? schedule.doctor.name : schedule.paramedicStaff.name)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold mb-4">All Staff Schedules</h1>
        <div className="flex justify-between mb-4">
          <button className="py-2 px-4 bg-blue-500 text-white rounded">
            Schedule
          </button>
          <input
            type="text"
            placeholder="Search Doctor"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-2 px-4 border border-gray-300 rounded"
          />
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Doctor Name</th>
              <th className="py-2 px-4 border-b">Doctor Email</th>
              <th className="py-2 px-4 border-b">Doctor Phone Number</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchedules.map((schedule) => (
              <tr key={schedule.id}>
                <td className="py-2 px-4 border-b">{schedule.doctor ? schedule.doctor.name : schedule.paramedicStaff.name}</td>
                <td className="py-2 px-4 border-b">{schedule.doctor ? schedule.doctor.email : schedule.paramedicStaff.email}</td>
                <td className="py-2 px-4 border-b">{schedule.doctor ? schedule.doctor.phone_number : schedule.paramedicStaff.phone_number}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="py-2 px-4 bg-blue-500 text-white rounded"
                    onClick={() => openModal(schedule.doctor ? schedule.doctor.id : schedule.paramedicStaff.id, !!schedule.doctor)}
                  >
                    View Schedule
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && (
          <ScheduleModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            staffId={selectedStaff}
            isDoctor={isDoctor}
          />
        )}
      </div>
    </div>
  );
};

export default StaffScheduleList;

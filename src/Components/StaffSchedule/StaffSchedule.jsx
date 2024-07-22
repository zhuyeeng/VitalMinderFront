import React, { useState, useEffect } from 'react';
import { fetchAllStaffSchedules, fetchUsers } from '../../lib/axios';
import Sidebar from '../Sidebar/Sidebar';
import ScheduleTimeModal from '../ViewStaffScheduleTime/ViewStaffScheduleTime';

const StaffScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [role, setRole] = useState('');
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [staffDetails, setStaffDetails] = useState([]);

  useEffect(() => {
    const getAllSchedules = async () => {
      try {
        const schedulesData = await fetchAllStaffSchedules();
        setSchedules(schedulesData);
      } catch (error) {
        console.error('Error fetching all schedules:', error);
      }
    };

    const getStaffInformation = async () => {
      try {
        const staffInformation = await fetchUsers();
        if (staffInformation.doctors && staffInformation.paramedics) {
          const combinedStaffDetails = [
            ...staffInformation.doctors.map((doctor) => ({ ...doctor, role: 'doctor' })),
            ...staffInformation.paramedics.map((paramedic) => ({ ...paramedic, role: 'paramedic' })),
          ];
          setStaffDetails(combinedStaffDetails);
        } else {
          console.error('Unexpected format for staff information:', staffInformation);
        }
      } catch (error) {
        console.error("Error on fetching staff information: ", error);
      }
    };

    getStaffInformation();
    getAllSchedules();
  }, []);

  const openTimeModal = (staff) => {
    setSelectedStaff(staff);
    setRole(staff.role); // Ensure this is set before opening the modal
    setIsTimeModalOpen(true);
  };

  const filteredStaff = staffDetails.filter(staff =>
    (staff.details.doctor_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.details.paramedic_staff_name?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={`${isSidebarOpen ? 'w-1/6' : 'w-20'} transition-all duration-500`}>
        <Sidebar onToggle={handleSidebarToggle} />
      </div>
      <div className={`flex-1 flex flex-col gap-10 p-4 transition-all duration-500 overflow-y-auto ${isSidebarOpen ? '' : 'items-center justify-center'}`}>
        <h1 className="text-2xl font-bold mb-4 text-center">All Staff Schedules</h1>
        <div className={`flex justify-between mb-4 ${isSidebarOpen ? 'w-full' : 'w-2/3'}`}>
          <input
            type="text"
            placeholder="Search Staff"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-2 px-4 border border-gray-300 rounded w-72"
          />
        </div>
        <div className={`overflow-x-auto ${isSidebarOpen ? 'w-full lg:w-3/4' : 'w-3/4'}`}>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone Number</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((staff) => (
                <tr key={`${staff.details.id}-${staff.role}`}>
                  <td className="py-2 px-4 border-b">{staff.details.doctor_name || staff.details.paramedic_staff_name}</td>
                  <td className="py-2 px-4 border-b">{staff.details.doctor_email || staff.details.paramedic_staff_email}</td>
                  <td className="py-2 px-4 border-b">{staff.details.doctor_phone_number || staff.details.paramedic_staff_phone_number}</td>
                  <td className="py-2 px-4 border-b">{staff.role}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="py-2 px-4 bg-blue-500 text-white rounded"
                      onClick={() => openTimeModal(staff)}
                    >
                      View Schedule
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isTimeModalOpen && (
          <ScheduleTimeModal
            isOpen={isTimeModalOpen}
            onClose={() => setIsTimeModalOpen(false)}
            selectedStaff={selectedStaff}
            role={role} // Ensure role is passed here
          />
        )}
      </div>
    </div>
  );
};

export default StaffScheduleList;

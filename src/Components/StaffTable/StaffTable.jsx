import React, { useEffect, useState } from 'react';
import { fetchUsers, banUser, unbanUser } from '../../lib/axios'; // Adjust the path as needed
import UpdateModal from '../UpdateModal/UpdateModal'; // Adjust the path as needed
import ArrangeScheduleModal from '../ArrangeScheduleModal/ArrangeScheduleModal'; // Ensure the path matches your project structure
import './StaffTable.css';

const StaffTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedStaffForSchedule, setSelectedStaffForSchedule] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await fetchUsers();
        const combinedData = [
          ...usersData.doctors.map((doctor) => ({ ...doctor, role: 'doctor', key: `doctor-${doctor.details.id}` })),
          ...usersData.paramedics.map((paramedic) => ({ ...paramedic, role: 'paramedic', key: `paramedic-${paramedic.details.id}` })),
        ];
        setData(combinedData);
      } catch (error) {
        console.error('Error fetching users data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Initial fetch

    const intervalId = setInterval(fetchData, 3000); // Fetch data every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const handleBanClick = async (staff) => {
    try {
      await banUser(staff.details.id, staff.user.user_role);
      alert(`Banned ${staff.user.username}`);

      setData((prevData) =>
        prevData.map((item) =>
          item.details.id === staff.details.id
            ? { ...item, user: { ...item.user, status: 'banned' } }
            : item
        )
      );
    } catch (error) {
      console.error('Error banning user:', error);
      alert('Error banning user');
    }
  };

  const handleUnbanClick = async (staff) => {
    try {
      await unbanUser(staff.details.id, staff.user.user_role);
      alert(`Unbanned ${staff.user.username}`);

      setData((prevData) =>
        prevData.map((item) =>
          item.details.id === staff.details.id
            ? { ...item, user: { ...item.user, status: 'active' } }
            : item
        )
      );
    } catch (error) {
      console.error('Error unbanning user:', error);
      alert('Error unbanning user');
    }
  };

  const handleUpdateClick = (staff) => {
    setSelectedStaff(staff);
  };

  const handleScheduleClick = (staff) => {
    setSelectedStaffForSchedule(staff);
    setScheduleModalOpen(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 overflow-y-auto p-4 rounded-lg shadow-lg h-full">
        <h5 className="text-xl font-bold mb-4">Total Staff Information</h5>
        <div className="w-full bg-gray-400 rounded-lg shadow-lg">
          <table className="min-w-full h-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Staff Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Role</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-slate-300 divide-y divide-gray-700 h-full">
              {data.map((staff) => (
                <tr key={staff.key} className="h-full">
                  <td className="px-4 py-2 whitespace-nowrap text-black">{staff.user.username}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-black">{staff.role}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-black">{staff.user.email}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-black">{staff.user.status}</td>
                  <td className="px-4 py-2 whitespace-nowrap flex space-x-2">
                    <button className="update" onClick={() => handleUpdateClick(staff)}>Update</button>
                    {staff.user.status === 'banned' ? (
                      <button className="ban_button" onClick={() => handleUnbanClick(staff)}> Unban </button>
                    ) : (
                      <button className="ban_button" onClick={() => handleBanClick(staff)}> Ban </button>
                    )}
                    <button className="schedule" onClick={() => handleScheduleClick(staff)}>Set Schedule</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedStaff && <UpdateModal staff={selectedStaff} onClose={() => setSelectedStaff(null)} />}
          {scheduleModalOpen && (
            <ArrangeScheduleModal
              isOpen={scheduleModalOpen}
              onClose={() => setScheduleModalOpen(false)}
              staffId={selectedStaffForSchedule.details.id}
              userRole={selectedStaffForSchedule.user.user_role}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffTable;

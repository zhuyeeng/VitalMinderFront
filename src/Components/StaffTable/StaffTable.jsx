import React, { useEffect, useState } from 'react';
import { fetchUsers, banUser, unbanUser } from '../../lib/axios'; // Adjust the path as needed
import UpdateModal from '../UpdateModal/UpdateModal'; // Adjust the path as needed
import './StaffTable.css';

const StaffTable = ({ onUpdateClick }) => {
    const [data, setData] = useState({ doctors: [], paramedics: [] });
    const [loading, setLoading] = useState(true);
    const [selectedStaff, setSelectedStaff] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await fetchUsers();
                setData(usersData);
            } catch (error) {
                console.error('Error fetching users data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleBanClick = async (staff) => {
        try {
            await banUser(staff.id, staff.role);
            alert(`Banned ${staff.doctor_name || staff.paramedic_staff_name}`);

            // Update the UI to reflect the banned status
            setData((prevData) => {
                const updateStatus = (list) =>
                    list.map((item) =>
                        item.id === staff.id ? { ...item, account_status: 'banned' } : item
                    );
                return {
                    doctors: updateStatus(prevData.doctors),
                    paramedics: updateStatus(prevData.paramedics),
                };
            });
        } catch (error) {
            console.error('Error banning user:', error);
            alert('Error banning user');
        }
    };

    const handleUnbanClick = async (staff) => {
        try {
            await unbanUser(staff.id, staff.role);
            alert(`Unbanned ${staff.doctor_name || staff.paramedic_staff_name}`);

            // Update the UI to reflect the unbanned status
            setData((prevData) => {
                const updateStatus = (list) =>
                    list.map((item) =>
                        item.id === staff.id ? { ...item, account_status: 'active' } : item
                    );
                return {
                    doctors: updateStatus(prevData.doctors),
                    paramedics: updateStatus(prevData.paramedics),
                };
            });
        } catch (error) {
            console.error('Error unbanning user:', error);
            alert('Error unbanning user');
        }
    };

    const handleUpdateClick = (staff) => {
        setSelectedStaff(staff);
    };

    // Combine doctors and paramedics with unique keys
    const staffList = [
        ...data.doctors.map((doctor) => ({ ...doctor, role: 'doctor', key: `doctor-${doctor.id}` })),
        ...data.paramedics.map((paramedic) => ({ ...paramedic, role: 'paramedic', key: `paramedic-${paramedic.id}` })),
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col md:flex-row w-2/3">
            <div className="flex-1 max-h-[50rem] overflow-y-auto bg-gray-500 p-4 rounded-lg shadow-lg">
                <div className="w-full bg-gray-400 rounded-lg shadow-lg">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Staff Name</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-slate-300 divide-y divide-gray-700">
                            {staffList.map((staff) => (
                                <tr key={staff.key}>
                                    <td className="px-4 py-2 whitespace-nowrap">{staff.role === 'doctor' ? staff.doctor_name : staff.paramedic_staff_name}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{staff.role}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{staff.role === 'doctor' ? staff.doctor_email : staff.paramedic_staff_email}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{staff.account_status}</td>
                                    <td className="px-4 py-2 whitespace-nowrap flex space-x-2">
                                        <button class="update" onClick={() => handleUpdateClick(staff)}>Update</button>
                                        {staff.account_status === 'banned' ? (
                                            <button class="ban_button" onClick={() => handleUnbanClick(staff)}> Unban </button>
                                        ) : (
                                            <button class="ban_button" onClick={() => handleBanClick(staff)}> Ban </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {selectedStaff && <UpdateModal staff={selectedStaff} onClose={() => setSelectedStaff(null)} />}
                </div>
            </div>
        </div>
    );
};

export default StaffTable;

import React, { useEffect, useState } from 'react';
import { fetchUsers, banUser } from '../../lib/axios'; // Adjust the path as needed
import UpdateModal from '../UpdateModal/UpdateModal'; // Adjust the path as needed

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
            await banUser(staff.id);
            alert(`Banned ${staff.doctor_name || staff.paramedic_staff_name}`);

            // Update the UI to reflect the banned status
            setData((prevData) => {
                const updateStatus = (list) =>
                    list.map((item) =>
                        item.id === staff.id ? { ...item, status: 'banned' } : item
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
        <div className="w-full max-w-4xl bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Staff Name</th>
                        <th className="px-4 py-2">Role</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {staffList.map((staff) => (
                        <tr key={staff.key}>
                            <td className="border px-4 py-2">{staff.role === 'doctor' ? staff.doctor_name : staff.paramedic_staff_name}</td>
                            <td className="border px-4 py-2">{staff.role === 'doctor' ? staff.doctor_email : staff.paramedic_staff_email}</td>
                            <td className="border px-4 py-2">{staff.role}</td>
                            <td className="border px-4 py-2">{staff.account_status}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleUpdateClick(staff)}
                                >
                                    Update
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                                    onClick={() => handleBanClick(staff)}
                                    disabled={staff.status === 'banned'}
                                >
                                    Ban
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedStaff && <UpdateModal staff={selectedStaff} onClose={() => setSelectedStaff(null)} />}
        </div>
    );
};

export default StaffTable;

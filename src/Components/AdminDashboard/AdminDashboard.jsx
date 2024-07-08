import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import StaffDetail from '../StaffDetail/staffDetail';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Routes, Route } from 'react-router-dom';
import StaffTable from '../StaffTable/StaffTable';
import UpdateModal from '../UpdateModal/UpdateModal';

const AdminDashboard = () => {
    const [selectedStaff, setSelectedStaff] = useState(null);

    const handleUpdateClick = (staff) => {
        setSelectedStaff(staff);
    };

    const handleCloseModal = () => {
        setSelectedStaff(null);
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/4">
                <Sidebar />
            </div>
            <div className="w-3/4 flex gap-10 items-center justify-center my-auto space-y-6">
                <Routes>
                    <Route path="/" element={<StaffDetail />} />
                    <Route path="/register" element={<RegisterForm />} />
                </Routes>
                <StaffTable onUpdateClick={handleUpdateClick} />
            </div>
            {selectedStaff && (
                <UpdateModal staff={selectedStaff} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default AdminDashboard;

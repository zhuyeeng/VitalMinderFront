import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import StaffDetail from '../StaffDetail/staffDetail';
import RegisterForm from '../RegisterForm/RegisterForm';
import StaffTable from '../StaffTable/StaffTable';
import UpdateModal from '../UpdateModal/UpdateModal';

const AdminDashboard = () => {
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const handleUpdateClick = (staff) => {
        setSelectedStaff(staff);
    };

    const handleCloseModal = () => {
        setSelectedStaff(null);
    };

    const handleRegisterClick = () => {
        setShowRegisterForm(true);
    };

    const handleCloseRegisterForm = () => {
        setShowRegisterForm(false);
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/6">
                <Sidebar onRegisterClick={handleRegisterClick} />
            </div>
            <div className="w-3/4 flex gap-10 items-center justify-center">
                {!showRegisterForm ? (
                    <>
                        <StaffDetail />
                        <StaffTable onUpdateClick={handleUpdateClick} />
                    </>
                ) : (
                    <RegisterForm onClose={handleCloseRegisterForm} />
                )}
            </div>
            {selectedStaff && (
                <UpdateModal staff={selectedStaff} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default AdminDashboard;

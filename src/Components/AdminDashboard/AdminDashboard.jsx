import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import StaffDetail from '../StaffDetail/staffDetail';
import RegisterForm from '../RegisterForm/RegisterForm';
import StaffTable from '../StaffTable/StaffTable';
import UpdateModal from '../UpdateModal/UpdateModal';
import PatientDetail from '../PatientDetail/PatientDetail';
import PatientTable from '../PatientTable/PatientTable';

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
            <div className="w-5/6 flex flex-col gap-10 p-4">
                {!showRegisterForm ? (
                    <>
                        <div className="flex flex-col md:flex-row gap-10">
                            <StaffDetail />
                            <StaffTable onUpdateClick={handleUpdateClick} />
                        </div>
                        <div className="flex flex-col md:flex-row gap-10">
                            <PatientTable />
                            <PatientDetail />
                        </div>
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

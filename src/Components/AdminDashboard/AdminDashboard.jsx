import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import StaffDetail from '../StaffDetail/staffDetail';
import RegisterForm from '../RegisterForm/RegisterForm';
import StaffTable from '../StaffTable/StaffTable';
import UpdateModal from '../UpdateModal/UpdateModal';
import AppointmentTypeChart from '../AppointmentTypeChart/AppointmentTypeChart';
import AppointmentSummaryTable from '../AppointmentSummaryTable/AppointmentSummaryTable';

const AdminDashboard = () => {
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

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
        <div className="flex h-screen overflow-hidden">
            <div className={`${isToggled ? 'w-1/6' : 'w-[5%]'} transition-all duration-500`}>
                <Sidebar onRegisterClick={handleRegisterClick} onToggle={handleToggle} />
            </div>
            <div className={`flex-1 flex flex-col gap-5 p-4 transition-all duration-500 overflow-y-auto ${isToggled ? '' : 'items-center'}`}>
                {!showRegisterForm ? (
                    <>
                        <div className={`w-full h-2/3 flex flex-col md:flex-row gap-10 ${isToggled ? '' : 'items-center justify-center'}`}>
                            <StaffDetail />
                            <StaffTable onUpdateClick={handleUpdateClick} />
                        </div>
                        <div className={`w-full h-2/3 flex flex-col md:flex-row gap-10 ${isToggled ? '' : 'items-center justify-center'}`}>
                            <AppointmentSummaryTable />
                            <AppointmentTypeChart />
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

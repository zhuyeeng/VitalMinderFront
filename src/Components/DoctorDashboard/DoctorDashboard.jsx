import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import DoctorAppointment from '../DoctorAppointment/DoctorAppointment';

const DoctorDashboard = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={`${isToggled ? 'w-1/6' : 'w-20'} transition-all duration-500`}>
        <Sidebar onToggle={handleToggle} />
      </div>
      <div className={`flex-1 flex flex-col gap-10 p-4 transition-all duration-500 overflow-y-auto ${isToggled ? '' : 'items-center justify-center'}`}>
        <DoctorAppointment />
      </div>
    </div>
  );
}

export default DoctorDashboard;

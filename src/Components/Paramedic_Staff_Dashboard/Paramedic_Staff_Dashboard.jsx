import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import AppointmentTable from '../AppointmentTable/AppointmentTable';
import WaitingListTable from '../WaitingList/WaitingList';
import AppointmentLine from '../AppointmentLine/AppointmentLine';

const Paramedic_Staff_Dashboard = () => {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleRefresh = () => {
    setRefreshFlag(!refreshFlag);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <div className={`${isSidebarOpen ? 'w-1/6' : 'w-[10%]'}`}>
        <Sidebar onToggle={handleSidebarToggle} />
      </div>
      <div className={`${isSidebarOpen ? 'w-5/6' : 'w-full'} flex flex-col gap-10 p-4 transition-all duration-500`}>
        <AppointmentTable refreshFlag={refreshFlag} />
        <div className={`w-full h-full flex justify-around ${isSidebarOpen ? '' : 'items-center justify-center'}`}>
          <AppointmentLine refreshFlag={refreshFlag} />
          <WaitingListTable refreshFlag={refreshFlag} />
        </div>
      </div>
    </div>
  );
};

export default Paramedic_Staff_Dashboard;

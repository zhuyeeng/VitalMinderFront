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
      <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-500`}>
        <Sidebar onToggle={handleSidebarToggle} />
      </div>
      <div className="flex-1 flex flex-col gap-10 p-4">
        <AppointmentTable refreshFlag={refreshFlag} />
        <div className="flex flex-col lg:flex-row justify-around items-stretch h-full">
          <AppointmentLine refreshFlag={refreshFlag} />
          <WaitingListTable refreshFlag={refreshFlag} />
        </div>
      </div>
    </div>
  );
};

export default Paramedic_Staff_Dashboard;

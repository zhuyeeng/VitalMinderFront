import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import AppointmentTable from '../AppointmentTable/AppointmentTable';
import WaitingListTable from '../WaitingList/WaitingList';
import AppointmentLine from '../AppointmentLine/AppointmentLine';

const Paramedic_Staff_Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const refreshLists = () => {
    setRefreshFlag(!refreshFlag); // Toggle the refresh flag to trigger data reload in child components
  };

  return (
    <div className="flex h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`transition-all duration-500 flex flex-col gap-10 p-4 ${isSidebarOpen ? 'ml-60' : 'ml-20'} w-full`}>
        <div className={`w-full flex flex-col gap-10 ${isSidebarOpen ? '' : 'items-center justify-center'}`}>
          <AppointmentTable refreshFlag={refreshFlag} />
          <div className="w-full h-full flex justify-center items-center gap-10">
            <AppointmentLine refreshLists={refreshLists} />
            <WaitingListTable refreshFlag={refreshFlag} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paramedic_Staff_Dashboard;

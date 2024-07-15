import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import AppointmentTable from '../AppointmentTable/AppointmentTable';
import WaitingList from '../WaitingList/WaitingList';
import AppointmentLine from '../AppointmentLine/AppointmentLine';

const Paramedic_Staff_Dashboard = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-5/6 flex flex-col gap-10 p-4">
        <AppointmentTable />
        <div className="w-full h-full flex">
          <AppointmentLine />
          <WaitingList />
        </div>
      </div>
    </div>
  );
}

export default Paramedic_Staff_Dashboard;

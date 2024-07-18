import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { fetchUsers } from '../../lib/axios'; // Adjust the path as needed
import 'chart.js/auto';

const StaffDetail = ({ refreshFlag }) => {
  const [data, setData] = useState({ doctors: [], paramedics: [] });
  const [loading, setLoading] = useState(true);

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
  }, [refreshFlag]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: ['Doctors', 'Paramedic Staff'],
    datasets: [
      {
        data: [data.doctors.length, data.paramedics.length],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    // <div className="max-w-full w-full md:w-1/2 bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
    //   <div className="flex justify-between mb-3">
    //     <div className="flex justify-center items-center">
    //       <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Staff Details</h5>
    //     </div>
    //   </div>
    <div className="w-full max-w-sm bg-white rounded-lg shadow p-4">
      <h5 className="text-xl font-bold mb-3 text-black">Staff Details</h5>

      <div className="py-6">
        <Doughnut data={chartData} />
      </div>
    </div>
  );
};

export default StaffDetail;

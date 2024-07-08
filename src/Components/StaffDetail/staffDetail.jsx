import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { fetchUsers } from '../../lib/axios'; // Adjust the path as needed
import 'chart.js/auto';

const StaffDetail = () => {
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
  }, []);

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
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between mb-3">
        <div className="flex justify-center items-center">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">Staff Details</h5>
          <svg data-popover-target="chart-info" data-popover-placement="bottom" className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z"/>
          </svg>
        </div>
      </div>

      <div className="py-6" id="donut-chart">
        <Doughnut data={chartData} />
      </div>
    </div>
  );
};

export default StaffDetail;

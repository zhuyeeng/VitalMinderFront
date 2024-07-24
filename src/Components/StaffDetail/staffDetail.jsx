import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { fetchUsers } from '../../lib/axios'; // Adjust the path as needed
import 'chart.js/auto';

const StaffDetail = ({ refreshFlag }) => {
  const [data, setData] = useState({ doctors: [], paramedics: [] });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const usersData = await fetchUsers();
      setData(usersData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 5000); // Fetch every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
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
    <div className="w-full max-w-sm bg-white rounded-lg shadow p-4">
      <h5 className="text-xl font-bold mb-3 text-black">Staff Details</h5>

      <div className="py-6">
        <Doughnut data={chartData} />
      </div>
    </div>
  );
};

export default StaffDetail;

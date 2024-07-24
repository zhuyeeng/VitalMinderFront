import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { fetchAppointmentsSummary } from '../../lib/axios';
import 'chart.js/auto';

const AppointmentTypeChart = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetchAppointmentsSummary();
      if (response && Array.isArray(response)) {
        const typeCounts = response.reduce((acc, appointment) => {
          acc[appointment.type] = (acc[appointment.type] || 0) + 1;
          return acc;
        }, {});

        const chartData = {
          labels: Object.keys(typeCounts),
          datasets: [
            {
              data: Object.values(typeCounts),
              backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
              hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            },
          ],
        };

        setData(chartData);
      } else {
        throw new Error('Data is not an array');
      }
    } catch (error) {
      console.error('Error fetching appointment summary:', error);
      setError('Error fetching appointment summary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 5000); // Fetch every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow p-4">
      <h5 className="text-xl font-bold mb-3 text-black">Appointment Type Distribution</h5>
      <div className="py-6">
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default AppointmentTypeChart;

import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { fetchPatients } from '../../lib/axios';
import 'chart.js/auto';

const PatientDetail = () => {
  const [data, setData] = useState({ male: 0, female: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPatients();
        console.log('Fetched patients data:', response);
        if (response && Array.isArray(response.patients)) {
          const maleCount = response.patients.filter(patient => patient.gender.toLowerCase() === 'male').length;
          const femaleCount = response.patients.filter(patient => patient.gender.toLowerCase() === 'female').length;
          setData({ male: maleCount, female: femaleCount });
        } else {
          throw new Error('Data is not an array');
        }
      } catch (error) {
        console.error('Error fetching patients data:', error);
        setError('Error fetching patients data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const chartData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [data.male, data.female],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow p-4">
      <h5 className="text-xl font-bold mb-3">Patient Details</h5>
      <div className="py-6">
        <Doughnut data={chartData} />
      </div>
    </div>
  );
};

export default PatientDetail;

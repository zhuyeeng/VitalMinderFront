import React, { useEffect, useState } from 'react';
import { fetchAppointmentsSummary } from '../../lib/axios';

const AppointmentSummary = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetchAppointmentsSummary();
      setAppointments(response);
    } catch (error) {
      console.error('Error fetching appointment summary:', error);
      setError('Error fetching appointment summary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    // const interval = setInterval(fetchData, 5000); // Fetch every 10 seconds

    // return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-4">
        <h6 className="text-lg font-bold mb-2">Appointment Table</h6>
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-white">Patient Name</th>
              <th className="px-4 py-2 text-white">Type</th>
              <th className="px-4 py-2 text-white">Date</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 text-black">{appointment.patient_name}</td>
                <td className="px-4 py-2 text-black">{appointment.type}</td>
                <td className="px-4 py-2 text-black">{new Date(appointment.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentSummary;

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../lib/axios';

const WaitingListTable = ({ refreshFlag }) => {
  const [waitingList, setWaitingList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWaitingList();
  }, [refreshFlag]); // Refresh the list when refreshFlag changes

  const fetchWaitingList = async () => {
    try {
      const response = await axiosInstance.get('/waiting-list');
      setWaitingList(response.data);
    } catch (error) {
      console.error('Error fetching waiting list:', error);
      setError(error);
    }
  };

  return (
    <div className="p-4">
      {error && (
        <div className="text-red-500 mb-4">
          Error: {error.message || 'An error occurred while fetching the waiting list.'}
        </div>
      )}
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th colSpan="3" className="py-2 px-4 text-center text-gray-700 font-bold">Waiting List</th>
          </tr>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="py-2 px-4 text-left text-gray-600">Patient Name</th>
            <th className="py-2 px-4 text-left text-gray-600">Doctor Name</th>
            <th className="py-2 px-4 text-left text-gray-600">Waiting Number</th>
          </tr>
        </thead>
        <tbody>
          {waitingList.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-10 bg-gray-100">No waiting list items</td>
            </tr>
          ) : (
            waitingList.map((item) => (
              <tr key={item.id} className="border-b border-gray-300">
                <td className="py-2 px-4">{item.patient_name || 'N/A'}</td>
                <td className="py-2 px-4">{item.doctor.doctor_name || 'N/A'}</td>
                <td className="py-2 px-4">{item.waiting_number}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WaitingListTable;

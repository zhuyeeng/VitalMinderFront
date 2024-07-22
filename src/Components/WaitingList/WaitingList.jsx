import React, { useState, useEffect } from 'react';
import { fetchWaitingList, fetchMedicationReportByAppointmentId } from '../../lib/axios'; // Adjust the import path as needed
import MedicationReportModal from '../MedicationReportModal/MedicationReportModal'; // Adjust the import path as needed

const WaitingListTable = ({ refreshFlag, isParamedic }) => {
  const [waitingList, setWaitingList] = useState([]);
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const getWaitingList = async () => {
      try {
        const data = await fetchWaitingList();
        console.log('Waiting list data:', data); // Debug log
        setWaitingList(data);
      } catch (error) {
        console.error('Error fetching waiting list:', error);
        setError(error);
      }
    };

    getWaitingList(); // Initial fetch
    const intervalId = setInterval(getWaitingList, 5000); // Fetch data every 5 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [refreshFlag]); // Refresh the list when refreshFlag changes

  const handleViewReport = async (appointmentId) => {
    try {
      const report = await fetchMedicationReportByAppointmentId(appointmentId);
      console.log('Fetched report:', report); // Debug log
      setSelectedReport(report);
    } catch (error) {
      console.error('Error fetching medication report:', error);
      setError(error);
    }
  };

  const handleCloseModal = () => {
    setSelectedReport(null);
  };

  const handleStatusUpdate = (appointmentId) => {
    setWaitingList((prevList) => prevList.filter(item => item.appointment_id !== appointmentId));
  };

  return (
    <div className="p-4 w-full">
      {error && (
        <div className="text-red-500 mb-4">
          Error: {error.message || 'An error occurred while fetching the waiting list.'}
        </div>
      )}
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md z-10 md:z-0">
        <thead>
          <tr className="bg-gray-200">
            <th colSpan="4" className="py-2 px-4 text-center text-gray-700 font-bold">Waiting List</th>
          </tr>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="py-2 px-4 text-left text-gray-600">Patient Name</th>
            <th className="py-2 px-4 text-left text-gray-600">Doctor Name</th>
            <th className="py-2 px-4 text-left text-gray-600">Waiting Number</th>
            <th className="py-2 px-4 text-left text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {waitingList.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-10 bg-gray-100 text-black">No waiting list items</td>
            </tr>
          ) : (
            waitingList.map((item) => (
              <tr
                key={item.id} className="border-b border-gray-300 hover:bg-gray-50 transition duration-300">
                <td className="py-2 px-4 text-black">{item.patient_name || 'N/A'}</td>
                <td className="py-2 px-4 text-black">{item.doctor.doctor_name || 'N/A'}</td>
                <td className="py-2 px-4 text-black">{item.waiting_number}</td>
                <td className="py-2 px-4 text-black">
                  {item.status === 'pending' ? (
                    <button
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                      onClick={() => handleViewReport(item.appointment_id)}
                    >
                      View Report
                    </button>
                  ) : (
                    'Pending...'
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {selectedReport && (
        <MedicationReportModal 
          report={selectedReport} 
          onClose={handleCloseModal} 
          isParamedic={isParamedic}
          onUpdateStatus={handleStatusUpdate}
        />
      )}
    </div>
  );
};

export default WaitingListTable;

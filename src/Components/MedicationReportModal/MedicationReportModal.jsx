import React from 'react';
import { updateReportStatus, updateWaitingListStatus } from '../../lib/axios'; // Import the new functions from your axios file

const MedicationReportModal = ({ report, onClose, isParamedic, onUpdateStatus }) => {
  if (!report) return null;

  const handleUpdateStatus = async () => {
    try {
      // Update the medication report status to 'ended'
      await updateReportStatus(report.id, 'ended');

      // Update the waiting list status to 'completed'
      await updateWaitingListStatus(report.appointment_id, 'completed');

      // Inform the user about the successful update
      alert('Status updated successfully.');
      onClose(); // Close the modal

      // Call the callback function to update the waiting list
      onUpdateStatus(report.appointment_id);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  // console.log('Modal report data:', report); // Debug log

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4 text-black">{report.report_title}</h2>
        <p className='text-black'><strong>Doctor Name:</strong> {report.creator_name || 'N/A'}</p>
        <p className='text-black'><strong>Date & Time:</strong> {report.report_created_date}</p>
        <p className='text-black'><strong>Physical Examination Note:</strong> {report.physical_examination_note}</p>
        <p className='text-black'><strong>Diagnostic Tests Results:</strong> {report.diagnostic_tests_results}</p>
        <p className='text-black'><strong>Treatment Plan Instruction:</strong> {report.treatment_plan_instruction}</p>
        <p className='text-black'><strong>Doctor Note:</strong> {report.doctor_note}</p>
        <button className="bg-red-500 text-white px-4 py-2 rounded mt-4" onClick={onClose}>
          Close
        </button>
        {isParamedic && (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mt-4 ml-4"
            onClick={handleUpdateStatus}
          >
            Mark as Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default MedicationReportModal;

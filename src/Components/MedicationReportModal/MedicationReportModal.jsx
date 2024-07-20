import React, { useState, useEffect } from 'react';
import { fetchDoctorNameById } from '../../lib/axios'; // Assume this function is defined in axios library

const MedicationReportModal = ({ report, onClose }) => {
  const [doctorName, setDoctorName] = useState('');

  useEffect(() => {
    if (report) {
      fetchDoctorName(report.created_by);
    }
  }, [report]);

  const fetchDoctorName = async (doctorId) => {
    try {
      const name = await fetchDoctorNameById(doctorId);
      setDoctorName(name);
    } catch (error) {
      console.error('Error fetching doctor name:', error);
      setDoctorName('Unknown');
    }
  };

  if (!report) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">{report.report_title}</h2>
        <p><strong>Doctor Name:</strong> {doctorName}</p>
        <p><strong>Date & Time:</strong> {report.report_created_date}</p>
        <p><strong>Physical Examination Note:</strong> {report.physical_examination_note}</p>
        <p><strong>Diagnostic Tests Results:</strong> {report.diagnostic_tests_results}</p>
        <p><strong>Treatment Plan Instruction:</strong> {report.treatment_plan_instruction}</p>
        <p><strong>Doctor Note:</strong> {report.doctor_note}</p>
        <button className="bg-red-500 text-white px-4 py-2 rounded mt-4" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default MedicationReportModal;

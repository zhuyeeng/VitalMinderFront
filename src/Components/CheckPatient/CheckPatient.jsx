import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import {
  searchPatientByName,
  getPatientIdByUserId,
  getPatientReportsByPatientId,
  getMedicationReportsByPatientId,
} from '../../lib/axios';
import ReportModal from '../ReportModal/ReportModal';
import MedicationReportModal from '../MedicationReportModal/MedicationReportModal';

const CheckPatientPage = () => {
  const [patientName, setPatientName] = useState('');
  const [patientReports, setPatientReports] = useState([]);
  const [medicationReports, setMedicationReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reportType, setReportType] = useState('patient');
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    if (patientId) {
      fetchReports(patientId);
    }
  }, [patientId, reportType]);

  const handleSearch = async () => {
    try {
      const userId = await searchPatientByName(patientName);
      const patientId = await getPatientIdByUserId(userId);
      setPatientId(patientId);
    } catch (error) {
      console.error('Error fetching patient ID:', error);
      setPatientId(null); // Ensure patientId is reset on error
    }
  };

  const fetchReports = async (patientId) => {
    try {
      if (reportType === 'patient') {
        const reports = await getPatientReportsByPatientId(patientId);
        setPatientReports(reports);
        setMedicationReports([]); // Clear medication reports when patient reports are fetched
      } else {
        const reports = await getMedicationReportsByPatientId(patientId);
        setMedicationReports(reports);
        setPatientReports([]); // Clear patient reports when medication reports are fetched
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      setPatientReports([]); // Reset to empty array on error
      setMedicationReports([]); // Reset to empty array on error
    }
  };

  const openModal = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <label className="font-bold mr-2">Patient Name:</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="border rounded p-2"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <div className="flex">
            <button
              className={`bg-blue-500 text-white px-4 py-2 rounded mr-2 ${reportType === 'patient' ? 'bg-blue-700' : ''}`}
              onClick={() => setReportType('patient')}
            >
              Patient Reports
            </button>
            <button
              className={`bg-green-500 text-white px-4 py-2 rounded ${reportType === 'medication' ? 'bg-green-700' : ''}`}
              onClick={() => setReportType('medication')}
            >
              Medication Reports
            </button>
          </div>
        </div>

        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">Report Title</th>
              <th className="py-2 px-4 border-b border-gray-300">Report Type</th>
              <th className="py-2 px-4 border-b border-gray-300">Date & Time</th>
              <th className="py-2 px-4 border-b border-gray-300">View</th>
            </tr>
          </thead>
          <tbody>
            {(reportType === 'patient' ? patientReports : medicationReports).length > 0 ? (
              (reportType === 'patient' ? patientReports : medicationReports).map((report) => (
                <tr key={report.id}>
                  <td className="py-2 px-4 border-b border-gray-300">{report.report_title || 'N/A'}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{reportType === 'patient' ? 'Patient Report' : 'Medication Report'}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{report.report_created_date}</td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => openModal(report)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-2 px-4 border-b border-gray-300 text-center">No reports available</td>
              </tr>
            )}
          </tbody>
        </table>

        {showModal && selectedReport && reportType === 'patient' && (
          <ReportModal report={selectedReport} onClose={() => setShowModal(false)} />
        )}

        {showModal && selectedReport && reportType === 'medication' && (
          <MedicationReportModal report={selectedReport} onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
};

export default CheckPatientPage;

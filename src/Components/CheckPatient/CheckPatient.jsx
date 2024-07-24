import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import {
  searchPatientByName,
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
  const [patients, setPatients] = useState(null);
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    if (patients) {
      fetchReports(patients.id);
    }
  }, [patients, reportType]);

  const handleSearch = async () => {
    try {
      const foundPatients = await searchPatientByName(patientName);
      if (foundPatients.length > 0) {
        setPatients(foundPatients[0]);
      } else {
        setPatients(null);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
      setPatients(null);
    }
  };

  const fetchReports = async (patientId) => {
    try {
      if (reportType === 'patient') {
        const reports = await getPatientReportsByPatientId(patientId);
        setPatientReports(reports);
        setMedicationReports([]);
      } else {
        const reports = await getMedicationReportsByPatientId(patientId);
        setMedicationReports(reports);
        setPatientReports([]);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      setPatientReports([]);
      setMedicationReports([]);
    }
  };

  const openModal = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={`${isToggled ? 'w-1/6' : 'w-20'} transition-all duration-500`}>
        <Sidebar onToggle={handleToggle} />
      </div>
      <div className={`flex-1 flex flex-col gap-10 p-4 transition-all duration-500 overflow-y-auto ${isToggled ? '' : 'items-center justify-center'}`}>
        <div className="w-full max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
              <label className="font-bold mr-2">Patient Name:</label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="border rounded p-2 mb-2 md:mb-0 md:mr-2"
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            <div className="flex flex-col md:flex-row">
              <button
                className={`bg-blue-500 text-white px-4 py-2 rounded mb-2 md:mb-0 md:mr-2 ${reportType === 'patient' ? 'bg-blue-700' : ''}`}
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
          {patients ? (
            <>
              <h3>Blood pressure: {patients.blood_pressure}</h3>
              <h3>Blood sugar: {patients.blood_sugar}</h3>
              <h3>Emergency Contact: {patients.emergency_contact}</h3>
              <h3>Height: {patients.height}</h3>
              <h3>Medication History: {patients.medical_history}</h3>
              <h3>Medications: {patients.medications}</h3>
              <h3>Weight: {patients.weight}</h3>
            </>
          ) : (
            <div>No patient information available.</div>
          )}
          <div className="overflow-x-auto">
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
          </div>
        </div>

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

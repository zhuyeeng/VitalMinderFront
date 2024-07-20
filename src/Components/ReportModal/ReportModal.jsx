import React from 'react';

const ReportModal = ({ report, onClose }) => {
  if (!report) return null;

  // Remove the 'public/' prefix from the report path
  const reportPath = report.report.replace('public/', '');
  const reportUrl = `${process.env.REACT_APP_API_BASE_URL}/storage/${reportPath}`;

  // Log the report URL for debugging
  console.log('Report URL:', reportUrl);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-3/4 h-3/4 overflow-auto">
        <h2 className="text-xl font-bold mb-4">{report.report_title || 'Report Details'}</h2>
        <div className="mb-4">
          <p><strong>Report Title:</strong> {report.report_title}</p>
          <p><strong>Created Date:</strong> {report.report_created_date}</p>
          <p><strong>Physical Examination Note:</strong> {report.physical_examination_note}</p>
          {report.diagnostic_tests_results && (
            <p><strong>Diagnostic Tests Results:</strong> {report.diagnostic_tests_results}</p>
          )}
          <p><strong>Treatment Plan Instruction:</strong> {report.treatment_plan_instruction}</p>
          {report.doctor_note && (
            <p><strong>Doctor Note:</strong> {report.doctor_note}</p>
          )}
        </div>
        {report.report && (
          <iframe src={reportUrl} width="100%" height="400px" title="Report PDF"></iframe>
        )}
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReportModal;

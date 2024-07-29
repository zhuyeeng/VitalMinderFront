import React, { useState, useEffect } from 'react';
import { setAuthToken } from '../../lib/axios';

const DoctorProgressNoteModal = ({ isOpen, onClose, appointmentId, patientId, patient_name, doctorId, onSave }) => {
  const [reportTitle, setReportTitle] = useState('');
  const [physicalExaminationNote, setPhysicalExaminationNote] = useState('');
  const [treatmentPlanInstruction, setTreatmentPlanInstruction] = useState('');
  const [diagnosticTestsResults, setDiagnosticTestsResults] = useState('');
  const [doctorNote, setDoctorNote] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reportData = {
        patient_id: patientId,
        patient_name: patient_name,
        appointment_id: appointmentId,
        created_by: doctorId,
        paramedic_staff_id: null,
        report_title: reportTitle,
        report_created_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        physical_examination_note: physicalExaminationNote,
        diagnostic_tests_results: diagnosticTestsResults,
        treatment_plan_instruction: treatmentPlanInstruction,
        doctor_note: doctorNote,
        report_status: 'pending'
      };
      await onSave(reportData);
      alert('Save Successfully.');
      onClose();
    } catch (error) {
      setError('Error creating medication report. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl mb-4 text-black">Write Progress Note</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Report Title</label>
            <input
              type="text"
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Physical Examination Note</label>
            <textarea
              value={physicalExaminationNote}
              onChange={(e) => setPhysicalExaminationNote(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Diagnostic Tests Results</label>
            <textarea
              value={diagnosticTestsResults}
              onChange={(e) => setDiagnosticTestsResults(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Treatment Plan Instruction</label>
            <textarea
              value={treatmentPlanInstruction}
              onChange={(e) => setTreatmentPlanInstruction(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Doctor Note</label>
            <textarea
              value={doctorNote}
              onChange={(e) => setDoctorNote(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
            ></textarea>
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorProgressNoteModal;

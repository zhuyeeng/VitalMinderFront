import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import axiosInstance, { fetchPatients, uploadReport, fetchParamedicIdByUserId } from '../../lib/axios'; // Adjust the import path as necessary

const ReleaseReport = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [reportFile, setReportFile] = useState(null);
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    fetchAllPatients();
  }, []);

  const fetchAllPatients = async () => {
    try {
      const data = await fetchPatients();
      setPatients(data);
      setFilteredPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = patients.filter(patient => 
      (patient.username && patient.username.toLowerCase().includes(term)) || 
      (patient.identity_card_number && patient.identity_card_number.includes(term))
    );
    setFilteredPatients(filtered);
  };

  const handleShowModal = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
    setReportFile(null);
  };

  const handleFileChange = (e) => {
    setReportFile(e.target.files[0]);
  };

  const handleUploadReport = async () => {
    if (!reportFile || !selectedPatient) return;

    const paramedicUser = JSON.parse(localStorage.getItem('user'));
    const paramedicUserId = paramedicUser.id;
    
    try {
      // Fetch the paramedic staff ID based on the user ID from local storage
      const paramedicStaffId = await fetchParamedicIdByUserId(paramedicUserId);

      const formData = new FormData();
      formData.append('patient_id', selectedPatient.id);
      formData.append('report', reportFile);
      formData.append('paramedic_staff_id', paramedicStaffId);

      await uploadReport(formData);
      handleCloseModal();
      // Optionally, refresh the patient list or show a success message
    } catch (error) {
      console.error('Error uploading report:', error.response?.data || error.message);
    }
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={`${isToggled ? 'w-1/6' : 'w-20'} transition-all duration-500`}>
        <Sidebar onToggle={handleToggle} />
      </div>
      <div className={`flex-1 flex flex-col gap-10 p-4 transition-all duration-500 ${isToggled ? '' : 'items-center justify-center'}`}>
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-2xl font-bold">Release Report</h1>
            <input 
              type="text" 
              className="text-black form-control block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
              placeholder="Search Patient" 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-4 border-b font-semibold text-gray-700">Patient Name</th>
                <th className="py-2 px-4 border-b font-semibold text-gray-700">Identity Card Number</th>
                <th className="py-2 px-4 border-b font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(patient => (
                <tr key={patient.id} className="hover:bg-gray-100 bg-gray-200">
                  <td className="py-2 px-4 border-b text-black text-center">{patient.username}</td>
                  <td className="py-2 px-4 border-b text-black text-center">{patient.identity_card_number}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => handleShowModal(patient)}>
                      Release Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-96">
              <div className="flex justify-end">
                <button className="text-gray-500 hover:text-gray-700" onClick={handleCloseModal}>&times;</button>
              </div>
              <h2 className="text-xl font-semibold mb-4 text-black">Upload Report for {selectedPatient?.name}</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="report" className="block text-sm font-medium text-black">Upload PDF</label>
                  <input 
                    type="file" 
                    className="mt-1 text-black block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                    id="report" 
                    accept=".pdf" 
                    onChange={handleFileChange} 
                  />
                </div>
                <button 
                  type="button" 
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" 
                  onClick={handleUploadReport}>
                  Upload Report
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReleaseReport;

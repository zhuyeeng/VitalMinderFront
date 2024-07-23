import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import { getPatientReportsByPatientId, fetchPatientIdByUserId } from '../../lib/axios'; // Import fetchUserById

const PatientReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [patientId, setPatientId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isPasswordValidated, setIsPasswordValidated] = useState(false);

  useEffect(() => {
    const fetchPatientId = async () => {
      const user = JSON.parse(localStorage.getItem('user')); // Parse the user object
      const userId = user?.id; // Extract the user ID
      setUser(user); // Set the user state
      console.log('Fetching patient ID for user ID:', userId); // Debugging output

      if (userId) {
        try {
          const patientId = await fetchPatientIdByUserId(userId);
          setPatientId(patientId);
        } catch (error) {
          console.error('Error fetching patient ID:', error);
        }
      } else {
        console.error('No user found in localStorage');
      }
    };

    fetchPatientId();
  }, []);

  useEffect(() => {
    if (patientId !== null) {
      const fetchReports = async () => {
        try {
          const data = await getPatientReportsByPatientId(patientId);
          console.log("in:", patientId)
          setReports(data);
        } catch (error) {
          console.error('Error fetching reports:', error);
        }
      };

      fetchReports();
    }
  }, [patientId]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredReports = reports.filter(report =>
    report.report_title.toLowerCase().includes(searchTerm)
  );

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
    setIsPasswordValidated(false); // Reset password validation
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === user?.identity_card_number + "@vm") { // Replace with actual user identity card number
      setIsPasswordValidated(true);
      setIsModalOpen(false);
    } else {
      alert('Incorrect password');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null); // Clear the selected report
  };

  return (
    <div className='flex flex-col h-screen'>
      {/* Navigation Bar */}
      <div className='w-full fixed top-0 z-50'>
        <NavBar />
      </div>

      {/* Main Body part */}
      <div className='flex flex-col md:flex-row h-full mt-16'>
        {/* Report Sidebar */}
        <div className='w-full md:w-1/3 p-4 border-r-2 border-black bg-gray-200 h-full flex flex-col'>
          <div className='static top-16 bg-gray-200 p-4'>
            <div className='mb-4'>
              <input
                type="text"
                placeholder="Search Report..."
                className='p-2 border rounded-md text-black w-full md:w-56'
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className='overflow-y-auto flex-grow flex flex-col gap-3'>
            {filteredReports.map(report => (
              <div key={report.id} className='mb-2 report-card bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg w-full'
                onClick={() => handleViewReport(report)}
              >
                <div className='flex justify-between'>
                  <div>
                    <h3 className='text-lg font-semibold text-black'>{report.report_title}</h3>
                  </div>
                  <div className='text-right'>
                    <p className='text-gray-600'>{new Date(report.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Detail Section */}
        <div className='flex flex-col w-full md:w-2/3 mt-4 md:mt-0 p-4 md:p-8 items-center justify-center'>
          {selectedReport && isPasswordValidated && (
            <div className='bg-white p-8 rounded shadow-lg w-full text-black'>
              <h2 className='text-xl font-bold mb-4'>{selectedReport.report_title}</h2>
              <p className='mb-4'><strong>Release Date:</strong> {new Date(selectedReport.created_at).toLocaleDateString()}</p>
              <div className='border p-4 rounded shadow mb-4'>
                <iframe src={`${process.env.REACT_APP_API_BASE_URL}/storage/${selectedReport.report.replace('public/', '')}`} width="100%" height="500px" title="Report PDF"></iframe>
              </div>
            </div>
          )}
          {(!selectedReport || !isPasswordValidated) && (
            <p className='text-center text-gray-500'>Select a report to view details</p>
          )}
        </div>
      </div>

      {/* Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-black">Enter Password</h2>
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Enter Identity Card Number"
                  className="p-2 border rounded-md w-full text-black"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-4 bg-gray-200 p-2 rounded-md text-black"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientReports;

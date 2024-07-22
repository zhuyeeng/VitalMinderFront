import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import { getPatientReportsByPatientId, fetchPatientIdByUserId } from '../../lib/axios';

const PatientReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    const fetchPatientId = async () => {
      const user = JSON.parse(localStorage.getItem('user')); // Parse the user object
      const userId = user.id; // Extract the user ID
      console.log('Fetching patient ID for user ID:', userId); // Debugging output

      try {
        const patientId = await fetchPatientIdByUserId(userId);
        setPatientId(patientId);
      } catch (error) {
        console.error('Error fetching patient ID:', error);
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
  };

  return (
    <div className='flex flex-col h-screen'>
      {/* Navigation Bar */}
      <div className='w-full fixed top-0'>
        <NavBar />
      </div>

      {/* Main Body part */}
      <div className='flex flex-col md:flex-row h-full pt-16'>
        {/* Report Sidebar */}
        <div className='w-full md:w-[30%] p-4 border-r-2 border-black bg-[#F1F1F1] h-full flex flex-col'>
          <div className='sticky top-16 bg-[#F1F1F1] p-4'>
            <div className='flex flex-col md:flex-row justify-between mb-4 gap-1'>
              <input
                type="text"
                placeholder="Search Report..."
                className='p-2 border rounded-md text-black w-full md:w-40'
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
        <div className='w-full md:w-3/4 p-4 flex justify-center items-center'>
          {selectedReport ? (
            <div className='bg-white p-4 rounded shadow w-full'>
              <h2 className='text-xl font-bold mb-4'>{selectedReport.report_title}</h2>
              <p className='mb-4'><strong>Release Date:</strong> {new Date(selectedReport.created_at).toLocaleDateString()}</p>
              <div className='border p-4 rounded shadow mb-4'>
                <iframe src={`${process.env.REACT_APP_API_BASE_URL}/storage/${selectedReport.report.replace('public/', '')}`} width="100%" height="500px" title="Report PDF"></iframe>
              </div>
            </div>
          ) : (
            <p className='text-center text-gray-500'>Select a report to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientReports;

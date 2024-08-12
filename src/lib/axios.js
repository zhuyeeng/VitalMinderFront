import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Adjust the base URL to match your Laravel server

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Function to set the Authorization header
export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// Function to register a user
export const registerUser = async (userData) => {
  try {
      const response = await axiosInstance.post('/registeruser', userData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      throw error.response?.data || error.message;
  }
};

// Function to log in a user
export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/login', userData);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to fetch doctors and paramedic staff
export const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get('/fetchStaff');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// export const fetchUserById = async (userId) => {
//   try {
//     const response = await axios.get(`/user/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user by ID:', error);
//     throw error;
//   }
// };

// Function to fetch doctors
export const fetchDoctors = async () => {
  try {
    const response = await axiosInstance.get('/doctors');
    return response.data;
  } catch (error) {
    console.error('Error fetching doctors:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to fetch appointment summary
export const fetchAppointmentsSummary = async () => {
  try {
    const response = await axiosInstance.get('/appointments-summary');
    return response.data;
  } catch (error) {
    console.error('Error fetching appointment summary:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const fetchPatientIdByUserId = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get(`/appointments/patient-id/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const patientId = response.data.patient_id;
    return patientId;
  } catch (error) {
    console.error('Error fetching patient ID:', error.response?.data || error.message);
    throw error;
  }
};

// Function to fetch staff information by user ID
export const fetchStaffByUserId = async (userId) => {
  try {
    const response = await axiosInstance.get(`/staff/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching staff information:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

//fetching all the medical staff along with some additional details
export const fetchMedicalStaff = async () => {
  try {
      const response = await axiosInstance.get('/medical-staff');
      return response.data;
  } catch (error) {
      throw error;
  }
};

// Fetch all patients
export const fetchPatients = async () => {
  try {
    const response = await axiosInstance.get('/patients');
    return response.data;
  } catch (error) {
    console.error('Error fetching patients:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to ban a user
export const banUser = async (staffId, role) => {
  try {
    const response = await axiosInstance.post('/ban-user', { staffId, role });
    return response.data;
  } catch (error) {
    console.error('Error banning user:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to unban a user
export const unbanUser = async (staffId, role) => {
  try {
    const response = await axiosInstance.post('/unban-user', { staffId, role });
    return response.data;
  } catch (error) {
    console.error('Error unbanning user:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to update staff information
export const updateStaff = async (id, staffData) => {
  try {
    const response = await axiosInstance.put(`/update-staff/${id}`, staffData);
    return response.data;
  } catch (error) {
    console.error('Error updating staff:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to fetch all reminders
export const fetchReminders = async () => {
  try {
    const response = await axiosInstance.get('/fetch-reminder');
    return response.data;
  } catch (error) {
    console.error('Error fetching reminders:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to create a new reminder
export const createReminder = async (reminderData) => {
  try {
    const response = await axiosInstance.post('/add-reminder', reminderData);
    return response.data;
  } catch (error) {
    console.error('Error creating reminder:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to get a specific reminder by ID
export const getReminder = async (id) => {
  try {
    const response = await axiosInstance.get(`/fetch-reminder/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reminder:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to update a specific reminder
export const updateReminder = async (id, reminderData) => {
  try {
    const response = await axiosInstance.put(`/update-reminder/${id}`, reminderData);
    return response.data;
  } catch (error) {
    console.error('Error updating reminder:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to delete a specific reminder
export const deleteReminder = async (id) => {
  try {
    const response = await axiosInstance.delete(`/delete-reminder/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting reminder:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to create an appointment
export const createAppointment = async (appointmentData) => {
  try {
    const response = await axiosInstance.post('/appointments', appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to get appointments by patient ID
export const getAppointmentsByPatientId = async (patientId) => {
  try {
    const response = await axiosInstance.get(`/appointments/${patientId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to update an appointment
export const updateAppointment = async (id, appointmentData) => {
  try {
    const response = await axiosInstance.put(`/appointments/${id}`, appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error updating appointment:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to delete an appointment
export const deleteAppointment = async (id) => {
  try {
    const response = await axiosInstance.delete(`/appointments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting appointment:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to fetch pending appointments
export const fetchPendingAppointments = async () => {
  try {
    const response = await axiosInstance.get('/appointments', {
      params: { status: 'pending' },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pending appointments:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to accept an appointment
export const acceptAppointment = async (id, doctorId, paramedicId) => {
  try {
    const response = await axiosInstance.put(`/appointments/status/${id}`, {
      status: 'accepted',
      doctor_id: doctorId,
      paramedic_id: paramedicId,
    });
    return response.data;
  } catch (error) {
    console.error('Error accepting appointment:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to reject an appointment with a reason
export const rejectAppointment = async (id, reason) => {
  try {
    const response = await axiosInstance.put(`/appointments/status/${id}`, {
      status: 'rejected',
      reason: reason,
    });
    return response.data;
  } catch (error) {
    console.error('Error rejecting appointment:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Add the addToWaitingList function
export const addToWaitingList = async (data) => {
  try {
    const response = await axiosInstance.post('/waiting-list', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchWaitingList = async () => {
  try {
    const response = await axiosInstance.get('/waiting-list');
    return response.data;
  } catch (error) {
    console.error('Error fetching waiting list:', error);
    throw error; // Re-throw the error to handle it in the component
  }
};

export const fetchMedicationReport = async (appointmentId) => {
  try {
    const response = await axiosInstance.get(`/medication-reports/${appointmentId}`);
    return response.data.data; // Assuming the API response has the report data in `data`
  } catch (error) {
    console.error('Error fetching medication report:', error);
    throw error; // Re-throw the error to handle it in the component
  }
};

// Function to fetch pending and accepted appointments
export const fetchPendingAndAcceptedAppointments = async () => {
  try {
    const response = await axiosInstance.get('/appointments/pending-and-accepted');
    return response.data;
  } catch (error) {
    console.error('Error fetching pending and accepted appointments:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to fetch a medication report by appointment ID
export const fetchMedicationReportByAppointmentId = async (appointmentId) => {
  try {
    const response = await axiosInstance.get(`/medication-reports/appointment/${appointmentId}`);
    console.log('Fetched medication report data:', response.data.data); // Debug log
    return response.data.data;
  } catch (error) {
    console.error('Error fetching medication report:', error);
    throw error; // Re-throw the error to handle it in the component
  }
};

// Function to update profile
export const updateProfile = async (profileData) => {
  try {
    const response = await axiosInstance.post('/update-profile', profileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to insert the health information
export const updateHealthInfo = async (healthData) => {
  try {
    const response = await axiosInstance.post('/update-health-info', healthData);
    return response.data;
  } catch (error) {
    console.error('Error updating health information:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to update password
export const updatePassword = async (passwordData) => {
  try {
    const response = await axiosInstance.post('/update-password', passwordData);
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const fetchDoctorWaitingList = async (doctorId) => {
  try {
    const response = await axiosInstance.get(`/waiting-list/doctor/${doctorId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching doctor waiting list:', error);
    throw error;
  }
};

// Function to upload a report
export const uploadReport = async (formData) => {
  try {
    const response = await axiosInstance.post('/patient-reports', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading report:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to store a new medication report
export const storeMedicationReport = async (reportData) => {
  try {
    const response = await axiosInstance.post('/medication-reports', reportData);
    return response.data;
  } catch (error) {
    console.error('Error creating medication report:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to update the waiting list status
export const updateWaitingListStatus = async (appointmentId, status) => {
  try {
    const response = await axiosInstance.put(`/waiting-lists/${appointmentId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating waiting list status:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to update the report status to ended
export const updateReportStatus = async (reportId, status) => {
  try {
    const response = await axiosInstance.put(`/medication-reports/${reportId}/status`, { report_status: status });
    return response.data;
  } catch (error) {
    console.error('Error updating report status:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to send a chat message
export const sendChatMessage = async ({ message, user_id }) => {
  try {
    const response = await axiosInstance.post('/chat', { message, user_id });
    return response.data;
  } catch (error) {
    console.error('Error during chat:', error.response?.data || error.message);
    throw new Error('Sorry, there was an error processing your request.');
  }
};

// Function to search patient by name
export const searchPatientByName = async (patientName) => {
  const response = await axiosInstance.get(`/patients/search/${patientName}`);
  return response.data;
};

// Function to get patient ID by user ID
export const getPatientIdByUserId = async (userId) => {
  const response = await axiosInstance.get(`/patient-id/${userId}`);
  return response.data.patient_id;
};

// Function to get patient reports by patient ID
export const getPatientReportsByPatientId = async (patientId) => {
  const response = await axiosInstance.get(`/patient-reports/${patientId}`);
  return response.data;
};

// Function to get medication reports by patient ID
export const getMedicationReportsByPatientId = async (patientId) => {
  try {
    const response = await axiosInstance.get(`/medication-reports/${patientId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching medication reports:', error);
    throw error;
  }
};

export const fetchStaffSchedule = async (staffId, role) => {
  try {
    const response = await axiosInstance.get(`/schedule/latest/${staffId}/${role}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching staff schedule:', error);
    throw error;
  }
};

// Function to fetch all staff schedules
export const fetchAllStaffSchedules = async () => {
  try {
    const response = await axiosInstance.get('/schedules');
    return response.data;
  } catch (error) {
    console.error('Error fetching all schedules:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const saveSchedule = async (role, staffId, schedule) => {
  try {
    const response = await axiosInstance.post('/save-schedule', {
      role: role,
      staff_id: staffId,
      ...schedule,
    });

    if (response.status === 201) {
      console.log('Schedule saved successfully:', response.data);
      return response.data;
    } else {
      console.error('Failed to save schedule');
    }
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const fetchDoctorNameById = async (doctorId) => {
  try {
    const response = await axiosInstance.get(`/doctors/${doctorId}`);
    return response.data.name;
  } catch (error) {
    console.error('Error fetching doctor name:', error);
    throw error;
  }
};

export default axiosInstance;
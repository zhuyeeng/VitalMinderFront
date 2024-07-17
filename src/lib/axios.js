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
    const response = await axiosInstance.post('/registeruser', userData);
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

// Function to send password reset email
export const sendPasswordResetEmail = async (email) => {
  try {
    const response = await axiosInstance.post('/password-reset-request', { email });
    return response.data;
  } catch (error) {
    console.error('Error sending password reset email:', error.response?.data || error.message);
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

// Function to fetch all the patients
export const fetchPatients = async () => {
  try {
    const response = await axiosInstance.get('/fetchPatient');
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

export default axiosInstance;

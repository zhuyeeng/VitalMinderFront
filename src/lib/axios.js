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

export default axiosInstance;

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Register user
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

// Login user
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  return response.data;
};

// Get messages
export const getMessages = async (token) => {
  const response = await axios.get(`${API_URL}/messages`, {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};

// Send message
export const sendMessage = async (message, token) => {
  const response = await axios.post(
    `${API_URL}/messages`,
    { content: message },
    { headers: { 'x-auth-token': token } }
  );
  return response.data;
};

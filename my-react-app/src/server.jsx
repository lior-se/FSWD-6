import axios from 'axios';

const API_URL = 'http://localhost:5000';

const postRequest = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error in ${endpoint}:`, error);
    throw error;
  }
};

export const loginUser = async (username, password) => {
  return postRequest('/api/login', { username, password });
};

export const createUser = async (user) => {
  return postRequest('/api/register-user', user);
};

export const createShop = async (shop) => {
  return postRequest('/api/register-shop', shop);
};


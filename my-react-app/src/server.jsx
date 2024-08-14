import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const loginUser = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/login`, { username, password });
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  export const createUser = async (user) => {
    try {
      const response = await axios.post(`${API_URL}/api/register-user`, user);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };
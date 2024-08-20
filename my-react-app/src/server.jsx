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

export const getLatestGames = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/games/latest`);
    return response.data;
  } catch (error) {
    console.error('Error fetching latest games:', error);
    throw error;
  }
};export const createGame = async (game) => {
  return postRequest('/api/games', game);
};

const getRequest = async (endpoint) => {
  try {
    const response = await axios.get(`${API_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error in ${endpoint}:`, error);
    throw error;
  }
};

export const gamedataretriever = async (gameId) => {
  return getRequest(`/api/games/${gameId}`);
};


export const getGameById = async (id) => {
  console.log(id);
  try {
      const response = await axios.get(`${API_URL}/api/games/${id}`);
      return response.data;
  } catch (error) {
      console.error('Error fetching game by ID:', error);
      throw error;
  }
};

const putRequest = async (endpoint, data) => {
  try {
    const response = await axios.put(`${API_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error in ${endpoint}:`, error);
    throw error;
  }
};

export const updateGame = async (id, gameData) => {
  return putRequest(`/api/games/${id}`, gameData);
};

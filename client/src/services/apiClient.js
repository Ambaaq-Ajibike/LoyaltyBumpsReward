import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export const clearAuthToken = () => {
  delete apiClient.defaults.headers.common.Authorization;
};

const tokenFromStorage = typeof window !== 'undefined'
  ? window.localStorage?.getItem('auth_token')
  : null;

if (tokenFromStorage) {
  setAuthToken(tokenFromStorage);
}

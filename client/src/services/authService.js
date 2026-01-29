import { apiClient, setAuthToken, clearAuthToken } from './apiClient';

export const authService = {
  register: async (payload) => {
    const response = await apiClient.post('/auth/register', payload);
    return response.data;
  },
  login: async (payload) => {
    const response = await apiClient.post('/auth/login', payload);
    return response.data;
  },
  me: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
  logout: async () => {
    await apiClient.post('/auth/logout');
  },
  setAuthToken,
  clearAuthToken,
};

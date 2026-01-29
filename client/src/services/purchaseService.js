import { apiClient } from './apiClient';

export const purchaseService = {
  create: async (payload) => {
    const response = await apiClient.post('/purchases', payload);
    return response.data;
  },
  listByUser: async (userId) => {
    const response = await apiClient.get(`/users/${userId}/purchases`);
    return response.data;
  },
};

import api from './api';

export const getCosts = async () => {
  const response = await api.get('costs/');
  return response.data;
};

export const addCost = async (data) => {
  const response = await api.post('costs/', data);
  return response.data;
};

export const getTotalCost = async (doctorId, year) => {
  const response = await api.get(`costs/total/${doctorId}/${year}/`);
  return response.data;
};
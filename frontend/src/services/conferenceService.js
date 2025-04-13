import api from './api';

export const getConferences = async () => {
  const response = await api.get('conferences/');
  return response.data;
};

export const addConference = async (data) => {
  const response = await api.post('conferences/', data);
  return response.data;
};

export const updateConference = async (id, data) => {
  const response = await api.put(`conferences/${id}/`, data);
  return response.data;
};

export const archiveConference = async (id) => {
  const response = await api.post(`conferences/${id}/archive/`);
  return response.data;
};
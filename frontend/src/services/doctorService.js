import api from './api';

export const getDoctors = async () => {
  const response = await api.get('doctors/');
  return response.data;
};

export const addDoctor = async (data) => {
  const response = await api.post('doctors/', data);
  return response.data;
};

export const updateDoctor = async (id, data) => {
  const response = await api.put(`doctors/${id}/`, data);
  return response.data;
};

export const archiveDoctor = async (id) => {
  const response = await api.post(`doctors/${id}/archive/`);
  return response.data;
};

export const deleteDoctor = async (id) => {
  const response = await api.delete(`doctors/${id}/`);
  return response.data;
} // not used as we won't delete doctors but only archive them; deletion will be handled by admins
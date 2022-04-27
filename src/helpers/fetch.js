import {axiosClient}  from '../config/axios';

export const fetchWithoutToken = async (endpoint, data, method = 'GET') => {
  if (method === 'GET') return await axiosClient(endpoint);
  else {
    return await axiosClient.post(endpoint, data);
  }
};

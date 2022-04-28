/* import { axiosClient } from '../config/axios';

export const fetchWithoutToken = async (endpoint, data, method = 'GET') => {
  if (method === 'GET') return await axiosClient(endpoint);
  else {
    return await axiosClient(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
  }
};

export const fetchWithToken = async (endpoint, data, method = 'GET') => {
  if (method === 'GET')
    return await axiosClient(endpoint, {
      method,
      headers: {
        token: localStorage.getItem('token') || '',
      },
    });
  else {
    return await axiosClient(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-token': localStorage.getItem('token') || '',
      },
      data,
    });
  }
}; */

/* 
import { axiosClient } from '../config/axios';

const setConfig = (method, data) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
    ...(localStorage.getItem('token') && {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    }),
  },
  data,
});

export const fetchWithoutToken = async (endpoint, data, method = 'GET') => {
  if (method === 'GET') return await axiosClient(endpoint);
  else {
    return await axiosClient(endpoint, setConfig(method, data));
  }
};

export const fetchWithToken = async (endpoint, data, method = 'GET') => {
  if (method === 'GET')
    return await axiosClient(endpoint, {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    });
  else {
    return await axiosClient(endpoint, setConfig(method, data));
  }
};
 */

import { axiosClient } from '../config/axios';

const setConfig = (method, data, token) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  },

  data,
});

export const fetchWithoutToken = async (endpoint, data, method = 'GET') => {
  if (method === 'GET') return await axiosClient(endpoint);
  else {
    return await axiosClient(endpoint, setConfig(method, data));
  }
};

export const fetchWithToken = async (endpoint, method = 'GET', token, data) => {
  if (method === 'GET')
    return await axiosClient(endpoint, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  else {
    console.log(`Bearer ${token}`);
    return await axiosClient(endpoint, setConfig(method, data, token));
  }
};

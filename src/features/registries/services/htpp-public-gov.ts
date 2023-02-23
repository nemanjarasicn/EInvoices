import axios from 'axios';

const AXIOS = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_GATEWAY + '/api/v1/'
      : '/api/v1/',
  withCredentials: false,
});

AXIOS.interceptors.request.use(
  (config) => {
    const token: string = JSON.parse(String(sessionStorage.getItem('token')));
    config.headers = {
      ContentType: 'application/json',
      Authorization: `Bearer ${token}`,
      apiKey: config?.headers?.apiKey ? config?.headers?.apiKey : '',
    };
    return config;
  },
  (error) => Promise.reject(error)
);

export default AXIOS;

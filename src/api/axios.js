import axios from 'axios';

const api = axios.create({
  baseURL: 'https://task-api-eight-flax.vercel.app',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('task_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
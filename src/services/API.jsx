
import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;


export async function getFunctionHistorico() {
  try {
    const response = await api.get('/visualizarHistorico/');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
    throw error;
  }
}

import axios from 'axios';

// Certifique-se que no seu .env está:
// VITE_API_URL=http://127.0.0.1:8000
const API_URL = import.meta.env.VITE_API_URL;

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
    const response = await api.get(`http://127.0.0.1:8000/visualizarHistorico/`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
    throw error;
  }
}

export async function getSensoresPorTipo(tipo){
  try {
    const response = await api.get(`http://127.0.0.1:8000/visualizarSensoresTipo/${tipo}/`);
    return response.data
  }catch(error) {
    console.error('Erro ao buscar sensores pelo tipo' , error)
  }
}

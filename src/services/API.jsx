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

export async function getHistorico() {
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

export async function getAmbientes() {
  try {
    const response = await api.get(`http://127.0.0.1:8000/visualizarAmbiente/`);
    return response.data
  } catch(error) {
    console.error('Erro ao buscar dados: ' , error)
  }
}

export async function deleteSensor(id) {
  try{
    const response = await api.delete(`http://127.0.0.1:8000/deleteSensor/${id}`) ;
    return response.data
  }
  catch(error) {
    console.error('Erro ao deletar objeto: ', error)
  }
  
}


export async function criarSensor(dados) {
  try{
  const response = await api.post('http://127.0.0.1:8000/criarSensor/', dados);
  return response.data;
}
  catch(error) {
    console.error('Erro ao criar sensor', error)
  }
}
export async function cadastrarAmbiente(dados) {
  try{
    const response = await api.post('http://127.0.0.1:8000/criarAmbiente/', dados)
    return response.data ;
  }
  catch(error) {
    console.error('Error ao criar ambiente', error)
  }
}
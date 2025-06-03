import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';

export async function login(username, password) {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/login/`, { username, password });
    const { access, refresh } = response.data;
    localStorage.setItem('token', access);
    localStorage.setItem('refresh_token', refresh);
    return response.data;
  } catch (error) {
    console.error('Erro no login:', error.response?.data || error.message);
    throw error;
  } }
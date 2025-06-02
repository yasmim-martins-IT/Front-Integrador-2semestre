import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
});


export async function getFunctionHistorico() {
  try {
    const response = await api.get('/visualizarHistorico/');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
    throw error;
  }
}

import {useState , useEffect} from "react";
import axios from "axios" 
const API_URL = process.env.REACT_APP_API_URL

export async function  getFunctionHistorico() {
try{
    const response = axios.get(`${API_URL}/visualizarHistorico/`);
    
    return response.data ; 

} catch(error) {
    console.error("erro ao buscar os dados") ;
    throw error ;
}
}
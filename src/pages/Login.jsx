
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import logo from '../assets/Logo.png'

const API_URL = import.meta.env.VITE_API_URL;

export function Login() {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/token/`, {
        username,
        password: senha,
      });

      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);

      alert('✅ Login bem-sucedido!');
      navigate('/home');
    } catch (error) {
      console.error('Erro no login:', error);
      alert('❌ Usuario ou senha inválidos.');
    }
  };

  return (
    <div className={styles.container}>
        <img className={styles.logo} src={logo} alt="logo" />
    <form className={styles.formulario} onSubmit={handleSubmit}>
      <input
        type="username"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />
      <button className={styles.button} type="submit">Entrar</button>
    </form> </div>
  );
}

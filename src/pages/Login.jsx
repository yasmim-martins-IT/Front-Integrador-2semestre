import { useState } from 'react';
import { login } from '../services/auth'; // coloquei numa pasta services para a função login
import styles from './Login.module.css';
import logo from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

     try {
      await login(username, senha);
      navigate('/initial');  // redireciona para /initial após login
    } catch (err) {
      setError('Usuário ou senha inválidos');
      console.error(err);
    }
  }
  

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="logo" />
      <form className={styles.formulario} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
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
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );

}
export default Login;

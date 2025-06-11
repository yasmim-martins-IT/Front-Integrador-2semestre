import { useState } from 'react';
import { login } from '../services/auth';
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
      navigate('/initial');
    } catch (err) {
      setError('Usuário ou senha inválidos');
      console.error(err);
    }
  }

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="logo" />
      <form className={styles.formulario} onSubmit={handleSubmit}>
        
        <label className={styles.label}>
          Nome de usuário:
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Senha:
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </label>

        <button className={styles.button} type="submit">Entrar</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default Login;

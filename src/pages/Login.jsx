// Importa o hook useState para controlar estado local
import { useState } from 'react';
// Importa a função de autenticação que faz o login
import { login } from '../services/auth';
// Importa o CSS module para estilização
import styles from './Login.module.css';
// Importa o logo que vai aparecer no topo da tela
import logo from '../assets/Logo.png';
// Importa o hook para navegação entre rotas
import { useNavigate } from 'react-router-dom';

export function Login() {
  // Estado para armazenar o nome de usuário digitado
  const [username, setUsername] = useState('');
  // Estado para armazenar a senha digitada
  const [senha, setSenha] = useState('');
  // Estado para armazenar mensagens de erro
  const [error, setError] = useState('');
  // Hook para redirecionar o usuário quando o login for bem-sucedido
  const navigate = useNavigate();

  /**
   * handleSubmit:
   * - Dispara quando o usuário submete o formulário
   * - Chama a função login da API
   * - Redireciona para a tela inicial quando dá certo
   * - Exibe mensagem de erro quando dá errado
   */
  async function handleSubmit(e) {
    e.preventDefault(); // Impede o recarregamento da página
    setError(''); // Limpa mensagens anteriores

    try {
      await login(username, senha); // Realiza o login
      navigate('/initial'); // Redireciona para a tela inicial
    } catch (err) {
      setError('Usuário ou senha inválidos'); // Exibe erro
      console.error(err); // Loga o erro no console
    }
  }

  return (
    <div className={styles.container}> {/* Container principal da tela */}
      {/* Logo da aplicação */}
      <img className={styles.logo} src={logo} alt="logo" />

      {/* Formulário de login */}
      <form className={styles.formulario} onSubmit={handleSubmit}>

        {/* Campo para o nome de usuário */}
        <label className={styles.label}>
          Nome de usuário:
          <input
            type="text"
            placeholder="Digite seu nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        {/* Campo para a senha */}
        <label className={styles.label}>
          Senha:
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </label>

        {/* Botão para enviar o formulário */}
        <button className={styles.button} type="submit">Entrar</button>
      </form>

      {/* Exibe erro quando existe */}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

// Exporta o componente por padrão
export default Login;

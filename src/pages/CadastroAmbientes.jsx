// Importa o hook useState para gerenciar estados
import { useState } from 'react';
// Importa o CSS module para estilização
import styles from './Ambientes.module.css';
// Importa a função que faz a chamada para a API de cadastro
import { cadastrarAmbiente } from '../services/API';
// Importa o hook useNavigate para redirecionar o usuário
import { useNavigate } from 'react-router-dom';

export function CadastroAmbiente() {
  // Estados que armazenam os campos do formulário
  const [sig, setSig] = useState('');                // Código único do ambiente
  const [descricao, setDescricao] = useState('');    // Descrição do ambiente
  const [ni, setNi] = useState('');                  // Número de identificação
  const [responsavel, setResponsavel] = useState(''); // Nome do responsável
  const [mensagem, setMensagem] = useState('');      // Mensagem para o usuário
  const navigate = useNavigate();                    // Para redirecionamento

  // Função que será chamada quando o formulário for enviado
  async function handleSubmit(e) {
    e.preventDefault();  // Previne o recarregamento da página
    setMensagem('');     // Limpa a mensagem anterior

    // Validação simples: verifica se todos os campos foram preenchidos
    if (!sig || !descricao || !ni || !responsavel) {
      setMensagem('Todos os campos são obrigatórios.');
      return;
    }

    try {
      // Chama a API para cadastrar o ambiente
      await cadastrarAmbiente({ sig, descricao, ni, responsavel });
      // Redireciona o usuário para a listagem de ambientes
      navigate('/initial/ambiente');
    } catch (error) {
      // Exibe erro no console e mostra mensagem de erro para o usuário
      console.error('Erro ao cadastrar ambiente:', error);
      setMensagem('Erro ao cadastrar ambiente. Verifique os dados.');
    }
  }

  return (
    <main className={styles.container}>  {/* Container principal */}
      <h1 className={styles.title}>Cadastro de Ambiente</h1>

      {/* Formulário que dispara handleSubmit no submit */}
      <form onSubmit={handleSubmit} className={styles.form}>

        <label>
          Sig (código único):
          <input
            placeholder='Digite o sig'
            type="number"
            value={sig}
            onChange={(e) => setSig(e.target.value)}
            required
          />
        </label>

        <label>
          Descrição:
          <input
            placeholder='Insira a descrição'
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </label>

        <label>
          NI:
          <input
            placeholder='Insira o NI do ambiente'
            type="text"
            value={ni}
            onChange={(e) => setNi(e.target.value)}
            required
          />
        </label>

        <label>
          Responsável:
          <input
            placeholder='Insira o responsável pelo ambiente'
            type="text"
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
            required
          />
        </label>

        {/* Botão para enviar o formulário */}
        <div className={styles.botaoContainer}>
          <button className={styles.button} type="submit">Cadastrar</button>
        </div>

        {/* Área para exibir mensagens de erro ou sucesso */}
        {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
      </form>
    </main>
  );
}

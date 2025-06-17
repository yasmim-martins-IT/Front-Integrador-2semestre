import { useState } from 'react';
import styles from './Ambientes.module.css';
import { cadastrarAmbiente } from '../services/API';
import { useNavigate } from 'react-router-dom';

export function CadastroAmbiente() {
  const [sig, setSig] = useState('');
  const [descricao, setDescricao] = useState('');
  const [ni, setNi] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem('');

    if (!sig || !descricao || !ni || !responsavel) {
      setMensagem('Todos os campos são obrigatórios.');
      return;
    }

    try {
      await cadastrarAmbiente({ sig, descricao, ni, responsavel });
      navigate('/initial/ambiente');
    } catch (error) {
      console.error('Erro ao cadastrar ambiente:', error);
      setMensagem('Erro ao cadastrar ambiente. Verifique os dados.');
    }
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Cadastro de Ambiente</h1>

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
          placeholder='Insira o responsavel pelo o ambiente'
            type="text"
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
            required
          />
        </label>

        <button type="submit" >Cadastrar</button>

        {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
      </form>
    </main>
  );
}

import { useState } from 'react';
import { getHistoricoPorID, getHistoricoPorData } from '../services/API'; //pega as funções que consomem a API
import styles from './Historico.module.css';

export function HistoricoFiltro() {
  //componente de filtro para a página de histórico
  const [id, setId] = useState('');
  const [data, setData] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  async function buscarPorID() {
    setError('');
    try {
      const res = await getHistoricoPorID(id); //busca o historico pelo id utilizando a função pre-definida em '../services/API.jsx'
      setResult(res);
    } catch {
      setError('Erro ao buscar histórico por ID');
    }
  }

  async function buscarPorData() {
    setError('');
    try {
      const res = await getHistoricoPorData(data); //busca histório pela data utlizando a função pré-definida em '../services/API.jsx'
      setResult(res);
    } catch {
      setError('Erro ao buscar histórico por data');
    }
  }

  return (
    // elemento de filtro
    <div className={styles.container}>
      <h2>Buscar Histórico</h2>
      
      <div>
        <label>ID do Histórico:</label>
        {/* Input para colocar o id */}
        <input
          type="number"
          value={id}
          onChange={e => setId(e.target.value)}
          placeholder="Digite o ID"
        />
        <button onClick={buscarPorID}>Buscar por ID</button>
      </div>

      <div>
        {/* Input para colocar a data */}
        <label>Data (YYYY-MM-DD):</label>
        <input
          type="date"
          value={data}
          onChange={e => setData(e.target.value)}
        />
        <button onClick={buscarPorData}>Buscar por Data</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div>
          <h3>Resultado:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

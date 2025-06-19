// Importa os hooks useEffect e useState do React
import { useEffect, useState } from 'react';
// Importa a função que busca o histórico da API
import { getHistorico } from '../services/API';
// Importa o CSS module para estilização
import styles from './Historico.module.css';


// Função auxiliar para formatar timestamp em data e horário legíveis
function formatDateTime(timestamp) {
  const dt = new Date(timestamp);
  const data = dt.toLocaleDateString();   // Data no formato local
  const horario = dt.toLocaleTimeString(); // Horário no formato local
  return { data, horario };
}

// Componente principal do Histórico
export function Historico() {
  // Estados que armazenam o histórico, status de loading e erro
  const [historicos, setHistoricos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  // Estados que armazenam os filtros de data e id
  const [dataFiltro, setDataFiltro] = useState('');
  const [idFiltro, setIdFiltro] = useState('');

  // Efeito para buscar os dados da API quando o componente monta
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getHistorico();
        setHistoricos(response || []); // Atualiza o estado com os dados
      } catch (error) {
        console.error('Erro ao buscar histórico', error);
        setErro(error); // Salva o erro para exibir ao usuário
      } finally {
        setLoading(false); // Para o estado de carregando
      }
    }
    fetchData();
  }, []);

  // Mensagem enquanto carrega
  if (loading) return <p>Carregando histórico...</p>;
  // Mensagem em caso de erro
  if (erro) return <p>Erro ao carregar histórico.</p>;

  // Aplica filtros de data e id nos dados
  const historicosFiltrados = historicos.filter(item => {
    let dataOk = true;
    if (dataFiltro) {
      const itemData = new Date(item.timestamp).toISOString().split('T')[0];
      dataOk = itemData === dataFiltro;
    }

    let idOk = true;
    if (idFiltro) {
      idOk = item.id === Number(idFiltro);
    }

    return dataOk && idOk;
  });

  return (
    <main className={styles.container}>
      <h1>HISTÓRICO</h1>

      {/* Seção de filtros */}
      <section className={styles.filtros}>
        <label>
          Filtrar por data:
          <input
            type="date"
            value={dataFiltro}
            onChange={e => setDataFiltro(e.target.value)}
          />
        </label>

        <label>
          Filtrar por ID:
          <input
            type="number"
            min="1"
            value={idFiltro}
            onChange={e => setIdFiltro(e.target.value)}
            placeholder="ID do histórico"
          />
        </label>
      </section>

      {/* Seção que lista os históricos filtrados */}
      {historicosFiltrados.length === 0 ? (
        <p>Nenhum dado encontrado para o filtro selecionado.</p>
      ) : (
        <div className={styles.grid}>
          {historicosFiltrados.map((item) => {
            const { data, horario } = formatDateTime(item.timestamp); // Formata a data/hora

            return (
              <div key={item.id} className={styles.card}>
                {/* Dados do histórico */}
                <h2>id sensor: {item.sensor}</h2>
                <p><strong>Data:</strong> {data}</p>
                <p><strong>Horário:</strong> {horario}</p>
                <p><strong>Valor:</strong> {item.valor}</p>
                <p><strong>Status:</strong> {item.sensor.status ? 'Ativo' : 'Inativo'}</p>
              </div>
            );
          })}
        </div>
      )}

    </main>
  );
}

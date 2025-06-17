import { useEffect, useState } from 'react';
import { getHistorico } from '../services/API';
import styles from './Historico.module.css';
import { ChartCard } from '../components/Cards';

function formatDateTime(timestamp) {
  const dt = new Date(timestamp);
  const data = dt.toLocaleDateString();
  const horario = dt.toLocaleTimeString();
  return { data, horario };
}

export function Historico() {
  const [historicos, setHistoricos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const [dataFiltro, setDataFiltro] = useState('');
  const [idFiltro, setIdFiltro] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getHistorico();
        setHistoricos(response || []);
      } catch (error) {
        console.error("Erro ao buscar histórico", error);
        setErro(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Carregando histórico...</p>;
  if (erro) return <p>Erro ao carregar histórico.</p>;

  const historicosFiltrados = historicos.filter(item => {
    // Filtro por data
    let dataOk = true;
    if (dataFiltro) {
      const itemData = new Date(item.timestamp).toISOString().split('T')[0];
      dataOk = itemData === dataFiltro;
    }

    // Filtro por id
    let idOk = true;
    if (idFiltro) {
      idOk = item.id === Number(idFiltro);
    }

    return dataOk && idOk;
  });

  return (
    <main className={styles.container}>
      <h1>HISTÓRICO</h1>

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

      {historicosFiltrados.length === 0 ? (
        <p>Nenhum dado encontrado para o filtro selecionado.</p>
      ) : (
        <div className={styles.grid}>
          {historicosFiltrados.map((item) => {
            const { data, horario } = formatDateTime(item.timestamp);

            return (
              <div key={item.id} className={styles.card}>
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

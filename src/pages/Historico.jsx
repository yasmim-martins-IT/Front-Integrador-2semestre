import { useEffect, useState } from 'react';
import { getHistorico } from '../services/API';
import styles from './Historico.module.css';
import { ChartCard } from '../components/Cards';

export function Historico() {
  const [historicos, setHistoricos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

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

  return (
    <main className={styles.container}>
      <h1>Visualizador de Histórico</h1>
     

      {historicos.length === 0 ? (
        <p>Nenhum dado encontrado.</p>
      ) : (
        <div className={styles.grid}>
          {historicos.map((item) => (
            <div key={item.id} className={styles.card}>
              <h2>{item.sensor}</h2>
              <p><strong>Tipo:</strong> {item.tipo}</p>
              <p><strong>Data:</strong> {item.data}</p>
              <p><strong>Horário:</strong> {item.horario}</p>
              <p><strong>Valor:</strong> {item.valor}</p>
              <p><strong>Status:</strong> {item.status ? 'Ativo' : 'Inativo'}</p>
            </div>
          ))}
        </div>
      )}

      <div className={styles.graficos}>
        <ChartCard title="Histórico por Tipo" type="pie" />
        <ChartCard title="Histórico por Sensor" type="bar" />
      </div>

      <div className={styles.graficoLine}>
        <ChartCard title="Histórico no Tempo" type="line" />
      </div>
    </main>
  );
}

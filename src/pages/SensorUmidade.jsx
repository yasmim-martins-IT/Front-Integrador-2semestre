import { useEffect, useState } from 'react';
import { getSensoresPorTipo } from '../services/API';
import styles from './Sensor.module.css';
import { ChartCard } from '../components/Cards';
import { deleteSensor } from '../services/API';

export function SensorUmidade() {
  const [sensores, setSensores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getSensoresPorTipo("umidade");
        setSensores(response || []);
      } catch (error) {
        console.error("Erro ao buscar sensores pelo tipo", error);
        setErro(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
async function deletarSensor(id) {
  try {
    await deleteSensor(id);
    setSensores((prevSensores) => prevSensores.filter(sensor => sensor.id !== id));
  } catch (error) {
    console.error("Erro ao deletar sensor", error);
    setErro(error);
  }
}

  if (loading) return <p>Carregando sensores...</p>;
  if (erro) return <p>Erro ao carregar sensores.</p>;

  return (
    <main className={styles.container}>
      <h1>Visualizador de Sensores de Umidade</h1>

      {sensores.length === 0 ? (
        <p>Nenhum dado encontrado.</p>
      ) : (
        <div className={styles.grid}>
          {sensores.map((item) => (
            <div key={item.id} className={styles.card}>
              <h2>{item.sensor}</h2>
              <p><strong>Tipo:</strong> {item.tipo}</p>
              <p><strong>Latitude:</strong> {item.latitude}</p>
              <p><strong>Longitude:</strong> {item.longitude}</p>
              <p><strong>MAC Address:</strong> {item.mac_address}</p>
              <p><strong>Status:</strong> {item.status ? 'Ativo' : 'Inativo'}</p>
               <button className={styles.botao} onClick={() => deletarSensor(item.id)}>Deletar</button>
            </div>
          ))}
        </div>
      )}

      <div className={styles.graficos}>
        <ChartCard title="Tempo ativo em horas" type="pie" />
        <ChartCard title="Tempo ativo em horas" type="bar" />
      </div>

      <div className={styles.graficoLine}>
        <ChartCard title="Tempo ativo em horas" type="line" />
      </div>
    </main>
  );
}

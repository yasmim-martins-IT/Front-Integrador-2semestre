import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Graficos.module.css';
import { getSensorPorId } from '../services/API';
import { ChartCard } from '../components/Cards';

export function PaginaGraficos() {
  const { id } = useParams(); // pega o :id da rota
  const [sensor, setSensor] = useState(null);
  const [erro, setErro] = useState(null);

  // Simula dados de gráfico
  const graficoData = [
    { name: '08:00', value: Math.floor(Math.random() * 100) },
    { name: '09:00', value: Math.floor(Math.random() * 100) },
    { name: '10:00', value: Math.floor(Math.random() * 100) },
    { name: '11:00', value: Math.floor(Math.random() * 100) },
    { name: '12:00', value: Math.floor(Math.random() * 100) },
  ];

  useEffect(() => {
    async function fetchSensor() {
      try {
        const response = await getSensorPorId(id);
        setSensor(response);
      } catch (err) {
        console.error("Erro ao buscar sensor:", err);
        setErro("Erro ao buscar sensor");
      }
    }

    fetchSensor();
  }, [id]);

  if (erro) return <p>{erro}</p>;
  if (!sensor) return <p>Carregando...</p>;

  return (
    <main className={styles.container}>
      <h1>Gráficos do Sensor: {sensor.sensor}</h1>
      <div className={styles.graficos}>
        <ChartCard title="Leituras do Sensor" type="line" data={graficoData} />
        <ChartCard title="Comparação por Horário" type="bar" data={graficoData} />
        <ChartCard title="Distribuição" type="pie" data={graficoData} />
      </div>
    </main>
  );
}
